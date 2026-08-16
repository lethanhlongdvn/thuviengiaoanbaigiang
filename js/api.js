/**
 * MODULE GIAO TIẾP API VỚI GOOGLE APPS SCRIPT
 */
const DriveAPI = {
  /**
   * Kiểm tra cấu hình API
   */
  isConfigured() {
    return !!(CONFIG.API_URL && CONFIG.API_URL.trim() !== "");
  },

  /**
   * Nạp toàn bộ cây thư mục 1 lần duy nhất khi mở trang
   */
  async preloadAllLibrary() {
    if (!this.isConfigured()) {
      return null;
    }

    const url = `${CONFIG.API_URL}?action=preload_all&folderId=${encodeURIComponent(CONFIG.ROOT_FOLDER_ID)}&t=${Date.now()}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        redirect: "follow"
      });

      const data = await response.json();
      if (data && data.success) {
        return {
          tree: data.tree || {},
          pathToIdMap: data.pathToIdMap || {}
        };
      }
      return null;
    } catch (error) {
      console.warn("Preload all fallback sang nạp từng mục:", error);
      return null;
    }
  },

  /**
   * Lấy nội dung thư mục từ Google Drive
   */
  async getFolderContents(folderId) {
    if (!this.isConfigured()) {
      throw new Error("Chưa cấu hình API_URL trong file js/config.js!");
    }

    const targetId = folderId || CONFIG.ROOT_FOLDER_ID || "";
    const url = `${CONFIG.API_URL}?action=list&folderId=${encodeURIComponent(targetId)}&t=${Date.now()}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        redirect: "follow"
      });

      if (!response.ok) {
        throw new Error(`Lỗi kết nối máy chủ (${response.status})`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Không thể tải nội dung thư mục!");
      }

      return data;
    } catch (error) {
      console.error("Lỗi getFolderContents:", error);
      throw error;
    }
  },

  /**
   * Tải tệp tin lên Google Drive (Có ghi nhận Tên người đóng góp)
   */
  async uploadFile(file, folderId, uploaderName, onProgress) {
    if (!this.isConfigured()) {
      throw new Error("Chưa cấu hình API_URL trong file js/config.js!");
    }

    // 1. Đọc tệp thành Base64
    const base64Data = await this.fileToBase64(file, onProgress);

    const payload = {
      action: "upload",
      folderId: folderId || CONFIG.ROOT_FOLDER_ID,
      fileName: file.name,
      name: file.name,
      mimeType: file.type || "application/octet-stream",
      base64Data: base64Data,
      base64: base64Data,
      uploaderName: (uploaderName || "").trim()
    };

    try {
      const response = await fetch(CONFIG.API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow"
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Lỗi tải lên tệp!");
      }

      return data;
    } catch (error) {
      console.error("Lỗi uploadFile:", error);
      throw error;
    }
  },

  /**
   * Xóa tệp hoặc thư mục (Yêu cầu Mật khẩu Admin)
   */
  async deleteItem(id, type, adminPassword) {
    if (!this.isConfigured()) {
      throw new Error("Chưa cấu hình API_URL trong file js/config.js!");
    }

    const payload = {
      action: "delete",
      id: id,
      type: type || "file",
      adminPassword: adminPassword
    };

    try {
      const response = await fetch(CONFIG.API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow"
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Xóa thất bại!");
      }

      return data;
    } catch (error) {
      console.error("Lỗi deleteItem:", error);
      throw error;
    }
  },

  /**
   * Tạo thư mục mới (Chỉ Admin)
   */
  async createFolder(name, parentFolderId, adminPassword) {
    if (!this.isConfigured()) {
      throw new Error("Chưa cấu hình API_URL!");
    }

    const payload = {
      action: "create_folder",
      name: name,
      parentFolderId: parentFolderId || CONFIG.ROOT_FOLDER_ID,
      adminPassword: adminPassword
    };

    try {
      const response = await fetch(CONFIG.API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow"
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Tạo thư mục thất bại!");
      }

      return data;
    } catch (error) {
      console.error("Lỗi createFolder:", error);
      throw error;
    }
  },

  /**
   * Xác thực mật khẩu Admin
   */
  async verifyAdminPassword(password) {
    // Nếu chưa cấu hình link API Google Apps Script
    if (!this.isConfigured()) {
      // Hỗ trợ kiểm tra mật khẩu mặc định khi đang xem thử nghiệm offline
      if (password === "admin@thuvien123") {
        return { success: true, isOffline: true };
      }
      throw new Error("Chưa dán đường link Web App Google Apps Script vào file js/config.js!");
    }

    const url = `${CONFIG.API_URL}?action=verify_admin&password=${encodeURIComponent(password)}&t=${Date.now()}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        redirect: "follow"
      });

      const data = await response.json();
      return { success: !!data.success, message: data.message };
    } catch (error) {
      console.error("Lỗi verifyAdminPassword:", error);
      // Nếu có lỗi mạng/CORS nhưng đúng pass mặc định, vẫn cho phép
      if (password === "admin@thuvien123") {
        return { success: true, isOffline: true };
      }
      throw new Error("Không thể kết nối đến máy chủ Google Apps Script!");
    }
  },

  /**
   * Tìm kiếm tệp theo từ khóa
   */
  async searchFiles(query) {
    if (!this.isConfigured()) {
      throw new Error("Chưa cấu hình API_URL!");
    }

    const url = `${CONFIG.API_URL}?action=search&query=${encodeURIComponent(query)}&t=${Date.now()}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        redirect: "follow"
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Lỗi searchFiles:", error);
      throw error;
    }
  },

  /**
   * Chuyển đổi File sang Base64
   */
  fileToBase64(file, onProgress) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Tách chuỗi data:...;base64, ra lấy phần dữ liệu
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };

      reader.onerror = (error) => reject(error);

      if (reader.onprogress && onProgress) {
        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentLoaded = Math.round((event.loaded / event.total) * 100);
            onProgress(percentLoaded);
          }
        };
      }

      reader.readAsDataURL(file);
    });
  }
};
