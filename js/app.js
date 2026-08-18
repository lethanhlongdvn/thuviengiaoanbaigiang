/**
 * QUẢN LÝ GIAO DIỆN & TƯƠNG TÁC THƯ VIỆN GIÁO VIÊN
 */

const AppState = {
  currentFolderId: "",
  currentFolderName: "THU_VIEN",
  breadcrumbs: [],
  folders: [],
  files: [],
  folderMapByPath: {}, // Bản đồ đường dẫn chuẩn xác (Ví dụ: "03. KE_HOACH_BAI_DAY/KHOI_1/TIENG_VIET" -> Folder ID)
  folderMapByName: {}, // Cache dự phòng
  viewMode: "grid",   // 'grid' hoặc 'list'
  filterType: "all",  // 'all', 'docx', 'pptx', 'pdf', 'xlsx', 'image'
  isAdmin: false,
  adminPassword: "",
  selectedItemToDelete: null,
  selectedFileToUpload: null
};

// Helper lọc bỏ các tệp hệ thống, tệp ẩn hoặc tệp rỗng/trùng tên thư mục gốc như Thu_vien
function isIgnoredLibraryFile(fileOrName) {
  const name = (typeof fileOrName === "string" ? fileOrName : (fileOrName?.name || "")).trim().toLowerCase();
  if (!name) return true;
  if (name === "thu_vien" || name === "thuvien" || name === "thu vien" || name === "thu_vien." || name === "thu_vien.tmp" || name === "thu_vien.file") {
    return true;
  }
  if (name.startsWith(".") || name === "desktop.ini" || name === "thumbs.db" || name === "icon\r") {
    return true;
  }
  return false;
}

function filterValidLibraryFiles(files) {
  if (!Array.isArray(files)) return [];
  return files.filter(f => !isIgnoredLibraryFile(f));
}

// Helper hợp nhất tên người đóng góp giữa máy khách và Google Drive
function mergeLocalContributors(files) {
  const validFiles = filterValidLibraryFiles(files);
  const localContributors = JSON.parse(localStorage.getItem("thuvien_file_contributors") || "{}");
  let hasLocalUpdates = false;

  const result = validFiles.map(file => {
    if (file.contributor && file.contributor.trim() !== "") {
      if (localContributors[file.id] !== file.contributor.trim()) {
        localContributors[file.id] = file.contributor.trim();
        hasLocalUpdates = true;
      }
    } else if (localContributors[file.id]) {
      file.contributor = localContributors[file.id];
    }
    return file;
  });

  if (hasLocalUpdates) {
    try {
      localStorage.setItem("thuvien_file_contributors", JSON.stringify(localContributors));
    } catch (e) {}
  }

  return result;
}

// ==========================================
// KHỞI ĐỘNG ỨNG DỤNG (TỐC ĐỘ CAO & NẠP TOÀN BỘ NGẦM)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initAdminSession();
  setupEventListeners();
  renderFullSidebarTree();
  initAutoSync(); // Khởi động quét tự động mỗi 10 phút

  if (!DriveAPI.isConfigured()) {
    showSetupGuideOverlay();
  } else {
    // 1. Mở ngay lập tức thư mục gốc
    loadFolder(CONFIG.ROOT_FOLDER_ID);

    // 2. Nạp ngầm toàn bộ cây thư mục và tệp vào bộ nhớ RAM
    DriveAPI.preloadAllLibrary().then(res => {
      if (res) {
        if (res.pathToIdMap) {
          AppState.folderMapByPath = { ...res.pathToIdMap };
        }
        if (res.tree) {
          for (const fId in res.tree) {
            const item = res.tree[fId];
            if (item && item.files) {
              item.files = mergeLocalContributors(item.files);
            }
            DriveCache.set(fId, item);
            if (item && item.breadcrumbs) {
              const fullP = item.breadcrumbs.map(c => c.name).join("/");
              const relP = item.breadcrumbs.slice(1).map(c => c.name).join("/");
              AppState.folderMapByPath[fullP] = fId;
              AppState.folderMapByPath[relP] = fId;
            }
          }
        }
        console.log("⚡ Đã nạp xong 100% dữ liệu Thư viện và bản đồ đường dẫn vào RAM!");
      }
    }).catch(err => {
      console.warn("Lỗi nạp ngầm:", err);
    });
  }
});

// ==========================================
// TỰ ĐỘNG ĐỒNG BỘ NỀN MỖI 10 PHÚT
// ==========================================
function initAutoSync() {
  const intervalMinutes = CONFIG.AUTO_SYNC_INTERVAL_MINUTES || 10;
  const intervalMs = intervalMinutes * 60 * 1000;

  setInterval(async () => {
    // Chỉ đồng bộ ngầm khi đã cấu hình API và không đang tải lên tệp
    if (DriveAPI.isConfigured() && !AppState.selectedFileToUpload) {
      console.log(`[Auto-Sync] Đang tự động quét ngầm sau ${intervalMinutes} phút...`);
      try {
        const data = await DriveAPI.getFolderContents(AppState.currentFolderId || CONFIG.ROOT_FOLDER_ID);
        
        // Cập nhật dữ liệu
        AppState.folders = data.folders || [];
        AppState.files = mergeLocalContributors(data.files || []);
        AppState.breadcrumbs = data.breadcrumbs || [];

        renderFilesAndFolders();
        updateFolderStats();
        
        showToast(`🔄 Đã tự động đồng bộ cơ sở dữ liệu mới nhất (${intervalMinutes} phút/lần)`, "info");
      } catch (err) {
        console.warn("[Auto-Sync] Lỗi quét nền:", err);
      }
    }
  }, intervalMs);
}

// ==========================================
// THIẾT LẬP LẮNG NGHE SỰ KIỆN
// ==========================================
function setupEventListeners() {
  // 1. Chuyển đổi chế độ xem Grid / List
  document.getElementById("btn-view-grid")?.addEventListener("click", () => setViewMode("grid"));
  document.getElementById("btn-view-list")?.addEventListener("click", () => setViewMode("list"));

  // 2. Bộ lọc loại tệp
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      AppState.filterType = btn.dataset.filter || "all";
      renderFilesAndFolders();
    });
  });

  // 3. Tìm kiếm
  const searchInput = document.getElementById("search-input");
  searchInput?.addEventListener("input", (e) => {
    filterCurrentView(e.target.value);
  });
  searchInput?.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      performGlobalSearch(e.target.value);
    }
  });

  // 4. Modal Tải lên
  document.getElementById("btn-open-upload")?.addEventListener("click", openUploadModal);
  document.getElementById("upload-file-input")?.addEventListener("change", handleFileSelect);
  document.getElementById("btn-submit-upload")?.addEventListener("click", executeUpload);

  // Kéo thả tệp vào Dropzone
  const dropzone = document.getElementById("upload-dropzone");
  if (dropzone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-over');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
      }, false);
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        processSelectedFile(files[0]);
      }
    });
  }

  // 5. Modal Admin & Phân quyền
  document.getElementById("btn-admin-toggle")?.addEventListener("click", toggleAdminModal);
  document.getElementById("btn-admin-login")?.addEventListener("click", handleAdminLogin);
  document.getElementById("admin-password-input")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleAdminLogin();
  });

  // Bấm vào nút Quản trị viên -> Bật / Tắt menu xổ lên (Đổi mật khẩu & Đăng xuất)
  document.getElementById("btn-admin-menu-trigger")?.addEventListener("click", (e) => {
    e.stopPropagation();
    const menu = document.getElementById("admin-popup-menu");
    const trigger = document.getElementById("btn-admin-menu-trigger");
    if (!menu) return;

    const isCurrentlyOpen = menu.classList.contains("show");
    if (isCurrentlyOpen) {
      menu.classList.remove("show");
      trigger?.classList.remove("active");
    } else {
      menu.classList.add("show");
      trigger?.classList.add("active");
    }
  });

  // Đóng dropdown menu khi bấm ra ngoài
  document.addEventListener("click", (e) => {
    const roleAdminWrap = document.getElementById("role-admin-wrap");
    if (roleAdminWrap && !roleAdminWrap.contains(e.target)) {
      const menu = document.getElementById("admin-popup-menu");
      const trigger = document.getElementById("btn-admin-menu-trigger");
      if (menu) menu.classList.remove("show");
      trigger?.classList.remove("active");
    }
  });

  // Nút Đăng xuất trong popup menu
  document.getElementById("btn-admin-logout")?.addEventListener("click", (e) => {
    e.stopPropagation();
    const menu = document.getElementById("admin-popup-menu");
    if (menu) menu.classList.remove("show");
    document.getElementById("btn-admin-menu-trigger")?.classList.remove("active");
    AppState.isAdmin = false;
    AppState.adminPassword = "";
    sessionStorage.removeItem("thuvien_admin_pass");
    updateAdminUI();
    showToast("Đã đăng xuất khỏi tài khoản Quản trị viên.", "info");
    renderFilesAndFolders();
  });

  // Modal Đổi mật khẩu Admin
  document.getElementById("btn-change-password-open")?.addEventListener("click", (e) => {
    e.stopPropagation();
    const menu = document.getElementById("admin-popup-menu");
    if (menu) menu.classList.remove("show");
    document.getElementById("btn-admin-menu-trigger")?.classList.remove("active");
    openChangePasswordModal();
  });
  document.getElementById("btn-submit-change-password")?.addEventListener("click", handleChangePasswordSubmit);
  ["current-admin-password-input", "new-admin-password-input", "confirm-new-admin-password-input"].forEach(id => {
    document.getElementById(id)?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleChangePasswordSubmit();
    });
  });

  // Nút Hiện / Ẩn mật khẩu (Mắt) chung cho các ô mật khẩu
  document.querySelectorAll(".btn-pw-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetInput = document.getElementById(targetId);
      const eyeIcon = btn.querySelector("i");
      if (!targetInput) return;

      if (targetInput.type === "password") {
        targetInput.type = "text";
        if (eyeIcon) eyeIcon.className = "fa-solid fa-eye-slash";
      } else {
        targetInput.type = "password";
        if (eyeIcon) eyeIcon.className = "fa-solid fa-eye";
      }
    });
  });

  document.getElementById("btn-toggle-password-visibility")?.addEventListener("click", () => {
    const passInput = document.getElementById("admin-password-input");
    const eyeIcon = document.querySelector("#btn-toggle-password-visibility i");
    if (!passInput) return;

    if (passInput.type === "password") {
      passInput.type = "text";
      if (eyeIcon) {
        eyeIcon.className = "fa-solid fa-eye-slash";
      }
    } else {
      passInput.type = "password";
      if (eyeIcon) {
        eyeIcon.className = "fa-solid fa-eye";
      }
    }
  });

  // 6. Modal Xóa
  document.getElementById("btn-confirm-delete")?.addEventListener("click", executeDelete);

  // 7. Modal Tạo thư mục mới (Admin)
  document.getElementById("btn-create-folder")?.addEventListener("click", openCreateFolderModal);
  document.getElementById("btn-submit-create-folder")?.addEventListener("click", executeCreateFolder);

  // 8. Đóng các Modal
  document.querySelectorAll(".modal-close, .modal-backdrop").forEach(el => {
    el.addEventListener("click", () => closeModal());
  });

  // 9. Nút Làm mới -> Quét và nạp lại toàn bộ Drive
  document.getElementById("btn-refresh")?.addEventListener("click", async () => {
    DriveCache.invalidate(); // Xóa sạch bộ nhớ cũ
    showLoading(true);
    try {
      showToast("Đang kết nối và làm mới cơ sở dữ liệu....", "info");
      const allTree = await DriveAPI.preloadAllLibrary();
      if (allTree) {
        for (const fId in allTree) {
          DriveCache.set(fId, allTree[fId]);
        }
      }
      loadFolder(AppState.currentFolderId, true);
    } catch (e) {
      loadFolder(AppState.currentFolderId, true);
    } finally {
      showLoading(false);
    }
  });
}

// BỘ NHỚ ĐỆM (CACHE) DỮ LIỆU GOOGLE DRIVE ĐỂ MỞ TỨC THÌ 0 GIÂY
const DriveCache = {
  data: {},
  get(folderId) {
    return this.data[folderId] || null;
  },
  set(folderId, content) {
    this.data[folderId] = {
      content: content,
      timestamp: Date.now()
    };
  },
  invalidate(folderId) {
    if (folderId) {
      delete this.data[folderId];
    } else {
      this.data = {};
    }
  }
};

// ==========================================
// TẢI DỮ LIỆU THƯ MỤC (CÓ BỘ NHỚ ĐỆM TỨC THÌ 0 GIÂY)
// ==========================================
async function loadFolder(folderId, forceRefresh = false) {
  const targetId = folderId || CONFIG.ROOT_FOLDER_ID;

  // 1. KIỂM TRA BỘ NHỚ ĐỆM: Nếu đã có dữ liệu -> Hiển thị ngay tức thì 0ms!
  if (!forceRefresh) {
    const cached = DriveCache.get(targetId);
    if (cached) {
      applyFolderData(cached.content);
      return;
    }
  }

  // 2. Nếu chưa có -> Hiển thị tải và gọi API
  showLoading(true);
  try {
    const data = await DriveAPI.getFolderContents(targetId);

    // Lưu vào bộ nhớ đệm để lần sau bấm là mở ngay
    DriveCache.set(targetId, data);
    applyFolderData(data);
  } catch (error) {
    showToast(error.message || "Không thể tải thư mục!", "error");
  } finally {
    showLoading(false);
  }
}

// Cập nhật dữ liệu vào giao diện
function applyFolderData(data) {
  AppState.currentFolderId = data.folder.id;
  AppState.currentFolderName = data.folder.name;
  AppState.breadcrumbs = data.breadcrumbs || [];
  AppState.folders = data.folders || [];
  
  // Nạp danh sách tệp và kết hợp dữ liệu người đóng góp
  AppState.files = mergeLocalContributors(data.files || []);

  // Lưu đường dẫn hiện tại vào bản đồ
  if (data.breadcrumbs && data.breadcrumbs.length > 0) {
    const fullP = data.breadcrumbs.map(c => c.name).join("/");
    const relP = data.breadcrumbs.slice(1).map(c => c.name).join("/");
    AppState.folderMapByPath[fullP] = data.folder.id;
    if (relP) AppState.folderMapByPath[relP] = data.folder.id;
    
    // Lưu các thư mục con
    AppState.folders.forEach(f => {
      const childFull = fullP + "/" + f.name;
      const childRel = relP ? (relP + "/" + f.name) : f.name;
      AppState.folderMapByPath[childFull] = f.id;
      AppState.folderMapByPath[childRel] = f.id;
    });

    highlightActiveSidebarItemByPath(relP || fullP);
  }

  renderBreadcrumbs();
  renderFilesAndFolders();
  updateFolderStats();
}

// ==========================================
// HIỂN THỊ BREADCRUMBS
// ==========================================
function renderBreadcrumbs() {
  const container = document.getElementById("breadcrumbs-container");
  if (!container) return;

  container.innerHTML = "";

  // Nút gốc
  const rootItem = document.createElement("li");
  rootItem.className = "breadcrumb-item";
  rootItem.innerHTML = `<a href="javascript:void(0)" onclick="loadFolder('${CONFIG.ROOT_FOLDER_ID}')"><i class="fa-solid fa-house"></i> Gốc THƯ VIỆN</a>`;
  container.appendChild(rootItem);

  AppState.breadcrumbs.forEach((crumb, index) => {
    if (crumb.id === CONFIG.ROOT_FOLDER_ID) return;

    const li = document.createElement("li");
    li.className = "breadcrumb-item";
    const isLast = index === AppState.breadcrumbs.length - 1;

    // Chuyển đổi tên hiển thị có dấu lịch sự
    const prettyName = getVietnameseDisplayName(crumb.name);

    if (isLast) {
      li.classList.add("active");
      li.textContent = prettyName;
    } else {
      li.innerHTML = `<a href="javascript:void(0)" onclick="loadFolder('${crumb.id}')">${prettyName}</a>`;
    }
    container.appendChild(li);
  });
}

// ==========================================
// HIỂN THỊ DANH SÁCH TỆP VÀ THƯ MỤC
// ==========================================
function renderFilesAndFolders() {
  const container = document.getElementById("content-container");
  if (!container) return;

  container.innerHTML = "";

  // 1. Lọc tệp theo FilterType và loại bỏ các tệp hệ thống / trùng tên thư mục
  let filteredFiles = filterValidLibraryFiles(AppState.files);
  if (AppState.filterType !== "all") {
    filteredFiles = filteredFiles.filter(f => {
      const ext = (f.extension || "").toLowerCase();
      if (AppState.filterType === "docx") return ["doc", "docx"].includes(ext);
      if (AppState.filterType === "pdf") return ext === "pdf";
      if (AppState.filterType === "xlsx") return ["xls", "xlsx"].includes(ext);
      if (AppState.filterType === "image") return ["png", "jpg", "jpeg", "gif", "webp"].includes(ext);
      if (AppState.filterType === "other") return !["doc", "docx", "pdf", "xls", "xlsx", "png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext);
      return true;
    });
  }

  // Nếu rỗng
  if (AppState.folders.length === 0 && filteredFiles.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-regular fa-folder-open empty-icon"></i>
        <h3>Thư mục này hiện chưa có tài liệu</h3>
        <p>Bạn có thể bấm nút "Tải lên tài liệu" phía trên để bổ sung tệp vào thư mục này.</p>
        <button class="btn btn-primary" onclick="openUploadModal()">
          <i class="fa-solid fa-cloud-arrow-up"></i> Tải lên tài liệu ngay
        </button>
      </div>
    `;
    return;
  }

  const isGrid = AppState.viewMode === "grid";
  container.className = isGrid ? "grid-view" : "list-view";

  // Hiển thị Thư mục
  if (AppState.folders.length > 0) {
    const sectionTitle = document.createElement("div");
    sectionTitle.className = "section-divider";
    sectionTitle.innerHTML = `<span><i class="fa-solid fa-folder"></i> Thư mục con (${AppState.folders.length})</span>`;
    container.appendChild(sectionTitle);

    const folderWrap = document.createElement("div");
    folderWrap.className = isGrid ? "items-grid" : "items-list";

    AppState.folders.forEach(folder => {
      folderWrap.appendChild(createFolderElement(folder, isGrid));
    });
    container.appendChild(folderWrap);
  }

  // Hiển thị Tệp tin
  if (filteredFiles.length > 0) {
    const sectionTitle = document.createElement("div");
    sectionTitle.className = "section-divider";
    sectionTitle.innerHTML = `<span><i class="fa-solid fa-file"></i> Danh sách tài liệu (${filteredFiles.length})</span>`;
    container.appendChild(sectionTitle);

    const fileWrap = document.createElement("div");
    fileWrap.className = isGrid ? "items-grid" : "items-list";

    filteredFiles.forEach(file => {
      fileWrap.appendChild(createFileElement(file, isGrid));
    });
    container.appendChild(fileWrap);
  }
}

// ==========================================
// TẠO GIAO DIỆN PHẦN TỬ THƯ MỤC
// ==========================================
function createFolderElement(folder, isGrid) {
  const el = document.createElement("div");
  el.className = `item-card folder-card ${isGrid ? 'grid-card' : 'list-card'}`;

  const prettyName = getVietnameseDisplayName(folder.name);

  // Nút xóa chỉ hiện khi là Admin
  const deleteBtnHtml = AppState.isAdmin ? `
    <button class="btn-action btn-delete" title="Xóa thư mục (Admin)" onclick="confirmDelete('${folder.id}', '${folder.name}', 'folder', event)">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  ` : "";

  el.innerHTML = `
    <div class="card-icon folder-icon">
      <i class="fa-solid fa-folder"></i>
    </div>
    <div class="card-info">
      <div class="item-name" title="${prettyName}">${prettyName}</div>
      <div class="item-meta">
        <span><i class="fa-solid fa-layer-group"></i> ${folder.childCount || 0} mục</span>
        <span><i class="fa-regular fa-clock"></i> ${folder.updatedAt || ''}</span>
      </div>
    </div>
    <div class="card-actions">
      ${deleteBtnHtml}
      <button class="btn-action btn-open" title="Mở thư mục">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  `;

  el.addEventListener("click", (e) => {
    if (!e.target.closest(".btn-delete")) {
      loadFolder(folder.id);
    }
  });

  return el;
}

// ==========================================
// TẠO GIAO DIỆN PHẦN TỬ TỆP TIN
// ==========================================
function createFileElement(file, isGrid) {
  const el = document.createElement("div");
  el.className = `item-card file-card ${isGrid ? 'grid-card' : 'list-card'}`;

  const iconInfo = getFileIcon(file.extension);

  // Nút xóa chỉ hiện khi là Admin
  const deleteBtnHtml = AppState.isAdmin ? `
    <button class="btn-action btn-delete" title="Xóa vĩnh viễn trên Drive (Admin)" onclick="confirmDelete('${file.id}', '${file.name}', 'file', event)">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  ` : "";

  // Nhãn người đóng góp (luôn hiển thị rõ ràng & cho phép click để chỉnh sửa/gán tên)
  const contributorText = (file.contributor && file.contributor.trim() !== "") ? file.contributor : "Chưa cập nhật người gửi";
  const isHasContributor = (file.contributor && file.contributor.trim() !== "");
  const contributorHtml = `
    <div class="file-contributor-badge" onclick="promptEditContributor('${file.id}', '${file.name}', event)" style="${!isHasContributor ? 'background:#f8fafc; color:#64748b; border-color:#e2e8f0;' : ''}; cursor: pointer;" title="Bấm để đổi hoặc gán tên người đóng góp: ${contributorText}">
      <i class="${isHasContributor ? 'fa-solid fa-user-pen' : 'fa-regular fa-user'}"></i> 
      <span>${isHasContributor ? contributorText : 'Chưa cập nhật người gửi (Bấm để gán tên)'}</span>
    </div>
  `;

  el.innerHTML = `
    <div class="card-icon ${iconInfo.class}">
      <i class="${iconInfo.icon}"></i>
    </div>
    <div class="card-info">
      <div class="item-name" title="${file.name}">
        ${file.name}
      </div>
      <div class="item-meta">
        <span class="badge ${iconInfo.badgeClass}">${(file.extension || 'FILE').toUpperCase()}</span>
        <span class="file-size"><i class="fa-solid fa-hard-drive"></i> ${file.size}</span>
        <span class="file-date"><i class="fa-regular fa-clock"></i> ${file.updatedAt || ''}</span>
      </div>
      ${contributorHtml}
    </div>
    <div class="card-actions">
      <button class="btn-action btn-preview" title="Xem trước tài liệu" onclick="previewFile('${file.id}', '${file.name}', '${file.previewUrl}', '${file.contributor || ''}', event)">
        <i class="fa-solid fa-eye"></i>
      </button>
      <a href="${file.downloadUrl}" target="_blank" class="btn-action btn-download" title="Tải xuống trực tiếp" onclick="event.stopPropagation()">
        <i class="fa-solid fa-download"></i>
      </a>
      ${deleteBtnHtml}
    </div>
  `;

  el.addEventListener("click", (e) => {
    if (!e.target.closest(".card-actions") && !e.target.closest(".file-contributor-badge")) {
      previewFile(file.id, file.name, file.previewUrl, file.contributor || "");
    }
  });

  return el;
}

// Bấm trực tiếp vào nhãn để gán/sửa tên người đóng góp
async function promptEditContributor(fileId, fileName, event) {
  if (event) event.stopPropagation();
  const current = (AppState.files.find(f => f.id === fileId)?.contributor) || "";
  const newName = prompt(`Nhập tên người đóng góp cho tài liệu "${fileName}":`, current);
  if (newName !== null) {
    const trimmed = newName.trim();

    // 1. Lưu ngay vào bộ nhớ máy (LocalStorage)
    const localContributors = JSON.parse(localStorage.getItem("thuvien_file_contributors") || "{}");
    if (trimmed) {
      localContributors[fileId] = trimmed;
    } else {
      delete localContributors[fileId];
    }
    try {
      localStorage.setItem("thuvien_file_contributors", JSON.stringify(localContributors));
    } catch (e) {}

    // 2. Cập nhật ngay trên biến AppState và màn hình
    const targetFile = AppState.files.find(f => f.id === fileId);
    if (targetFile) targetFile.contributor = trimmed;

    // 3. Cập nhật bộ nhớ đệm DriveCache
    for (const fId in DriveCache.data) {
      const item = DriveCache.data[fId]?.content;
      if (item && item.files) {
        const cf = item.files.find(f => f.id === fileId);
        if (cf) cf.contributor = trimmed;
      }
    }

    renderFilesAndFolders();
    showToast(`Đang lưu tên người đóng góp: "${trimmed || 'Chưa cập nhật'}"...`, "info");

    // 4. Đồng bộ lưu vĩnh viễn lên Google Drive
    try {
      const res = await DriveAPI.updateContributor(fileId, trimmed);
      if (res && res.success) {
        showToast(`Đã lưu "${trimmed || 'Chưa cập nhật'}" lên Google Drive!`, "success");
      } else {
        console.warn("Lưu Google Drive:", res?.error);
      }
    } catch (err) {
      console.warn("Lỗi lưu lên Google Drive:", err);
    }
  }
}

// ==========================================
// XỬ LÝ ICON VÀ MÀU SẮC THEO ĐỊNH DẠNG TỆP
// ==========================================
function getFileIcon(extension) {
  const ext = (extension || "").toLowerCase();

  if (["doc", "docx"].includes(ext)) {
    return { icon: "fa-solid fa-file-word", class: "icon-word", badgeClass: "badge-word" };
  }
  if (["ppt", "pptx"].includes(ext)) {
    return { icon: "fa-solid fa-file-powerpoint", class: "icon-powerpoint", badgeClass: "badge-powerpoint" };
  }
  if (["xls", "xlsx"].includes(ext)) {
    return { icon: "fa-solid fa-file-excel", class: "icon-excel", badgeClass: "badge-excel" };
  }
  if (ext === "pdf") {
    return { icon: "fa-solid fa-file-pdf", class: "icon-pdf", badgeClass: "badge-pdf" };
  }
  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) {
    return { icon: "fa-solid fa-file-image", class: "icon-image", badgeClass: "badge-image" };
  }
  if (["zip", "rar", "7z"].includes(ext)) {
    return { icon: "fa-solid fa-file-zipper", class: "icon-zip", badgeClass: "badge-zip" };
  }
  return { icon: "fa-solid fa-file-lines", class: "icon-generic", badgeClass: "badge-generic" };
}

// ==========================================
// XEM TRƯỚC TỆP TIN (PREVIEW MODAL)
// ==========================================
function previewFile(id, name, previewUrl, contributor, event) {
  if (event) event.stopPropagation();

  const modal = document.getElementById("preview-modal");
  const title = document.getElementById("preview-modal-title");
  const iframe = document.getElementById("preview-iframe");
  const downloadLink = document.getElementById("preview-download-btn");
  const contribBox = document.getElementById("preview-contributor-info");
  const contribName = document.getElementById("preview-contributor-name");

  if (!modal || !iframe) return;

  title.textContent = name;
  iframe.src = previewUrl || `https://drive.google.com/file/d/${id}/preview`;
  downloadLink.href = `https://drive.google.com/uc?export=download&id=${id}`;

  if (contribBox && contribName) {
    contribBox.style.display = "flex";
    if (contributor && contributor.trim() !== "") {
      contribName.textContent = contributor;
      contribName.style.color = "#1e3a8a";
      contribName.style.background = "#eff6ff";
    } else {
      contribName.textContent = "Chưa cập nhật";
      contribName.style.color = "#64748b";
      contribName.style.background = "#f1f5f9";
    }
  }

  modal.classList.add("show");
}

// ==========================================
// TẢI LÊN TÀI LIỆU & CẢNH BÁO PPTX
// ==========================================
function openUploadModal() {
  const modal = document.getElementById("upload-modal");
  const targetName = document.getElementById("upload-target-folder-name");
  const fileInput = document.getElementById("upload-file-input");
  const selectedInfo = document.getElementById("selected-file-info");
  const pptsWarning = document.getElementById("pptx-warning-box");
  const progressWrap = document.getElementById("upload-progress-wrap");
  const submitBtn = document.getElementById("btn-submit-upload");
  const directDriveBtn = document.getElementById("btn-open-drive-direct-upload");
  const contribInput = document.getElementById("upload-contributor-input");

  const targetFolderId = AppState.currentFolderId || CONFIG.ROOT_FOLDER_ID;

  if (targetName) targetName.textContent = getVietnameseDisplayName(AppState.currentFolderName);
  if (directDriveBtn) directDriveBtn.href = `https://drive.google.com/drive/folders/${targetFolderId}`;
  if (fileInput) fileInput.value = "";
  if (selectedInfo) selectedInfo.style.display = "none";
  if (pptsWarning) pptsWarning.style.display = "none";
  if (progressWrap) progressWrap.style.display = "none";
  if (submitBtn) submitBtn.disabled = true;

  // Tự động điền lại tên người đóng góp đã nhập lần trước
  if (contribInput) {
    contribInput.value = localStorage.getItem("thuvien_contributor_name") || "";
  }

  AppState.selectedFileToUpload = null;
  modal?.classList.add("show");
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) {
    processSelectedFile(file);
  }
}

function processSelectedFile(file) {
  AppState.selectedFileToUpload = file;

  const selectedInfo = document.getElementById("selected-file-info");
  const fileNameEl = document.getElementById("upload-filename");
  const fileSizeEl = document.getElementById("upload-filesize");
  const pptsWarning = document.getElementById("pptx-warning-box");
  const submitBtn = document.getElementById("btn-submit-upload");

  const sizeMb = file.size / (1024 * 1024);
  const ext = file.name.split(".").pop().toLowerCase();

  if (fileNameEl) fileNameEl.textContent = file.name;
  if (fileSizeEl) fileSizeEl.textContent = formatBytes(file.size);
  if (selectedInfo) selectedInfo.style.display = "flex";

  if (sizeMb > CONFIG.MAX_FILE_SIZE_MB) {
    showToast(`Tệp vượt quá ${CONFIG.MAX_FILE_SIZE_MB}MB! Vui lòng nén bớt dung lượng.`, "error");
    if (submitBtn) submitBtn.disabled = true;
    return;
  }

  // Cảnh báo dung lượng với PPTX hoặc tệp nặng
  if (["ppt", "pptx"].includes(ext) || sizeMb >= CONFIG.PPTX_WARN_SIZE_MB) {
    if (pptsWarning) {
      pptsWarning.style.display = "block";
      pptsWarning.innerHTML = `
        <div class="warning-alert">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <div>
            <strong>Lưu ý dung lượng Drive miễn phí (15GB):</strong><br>
            Tệp <code>.${ext.toUpperCase()}</code> (${sizeMb.toFixed(1)} MB) có dung lượng khá lớn.<br>
            💡 <em>Khuyến nghị:</em> Hãy nén hình ảnh bên trong bài giảng hoặc xuất sang <strong>.PDF</strong> trước khi tải lên nếu không cần chỉnh sửa hiệu ứng trình chiếu.
          </div>
        </div>
      `;
    }
  } else {
    if (pptsWarning) pptsWarning.style.display = "none";
  }

  if (submitBtn) submitBtn.disabled = false;
}

async function executeUpload() {
  if (!AppState.selectedFileToUpload) return;

  const file = AppState.selectedFileToUpload;
  const progressWrap = document.getElementById("upload-progress-wrap");
  const progressBar = document.getElementById("upload-progress-bar");
  const progressText = document.getElementById("upload-progress-text");
  const submitBtn = document.getElementById("btn-submit-upload");
  const contribInput = document.getElementById("upload-contributor-input");

  // Lưu tên người đóng góp
  const contributorName = contribInput?.value?.trim() || "";
  if (contributorName) {
    localStorage.setItem("thuvien_contributor_name", contributorName);
  }

  if (progressWrap) progressWrap.style.display = "block";
  if (submitBtn) submitBtn.disabled = true;

  try {
    if (progressText) progressText.textContent = "Đang xử lý & lưu trữ vào cơ sở dữ liệu...";

    const res = await DriveAPI.uploadFile(file, AppState.currentFolderId, contributorName, (percent) => {
      if (progressBar) progressBar.style.width = `${percent}%`;
      if (progressText) progressText.textContent = `Đang tải: ${percent}%`;
    });

    // Lưu vào bộ nhớ cục bộ để hiển thị ngay tức thì
    if (res && res.file && res.file.id && contributorName) {
      const localContributors = JSON.parse(localStorage.getItem("thuvien_file_contributors") || "{}");
      localContributors[res.file.id] = contributorName;
      localStorage.setItem("thuvien_file_contributors", JSON.stringify(localContributors));
    }

    showToast("Tải lên tài liệu thành công!", "success");
    closeModal();
    DriveCache.invalidate(AppState.currentFolderId); // Xóa cache để nạp file mới
    loadFolder(AppState.currentFolderId, true);
  } catch (error) {
    showToast(error.message || "Lỗi khi tải lên!", "error");
    if (submitBtn) submitBtn.disabled = false;
  }
}

// ==========================================
// PHÂN QUYỀN & ĐĂNG NHẬP ADMIN
// ==========================================
function initAdminSession() {
  const savedPass = sessionStorage.getItem("thuvien_admin_pass");
  if (savedPass) {
    AppState.isAdmin = true;
    AppState.adminPassword = savedPass;
    updateAdminUI();
  }
}

function toggleAdminModal() {
  if (AppState.isAdmin) {
    AppState.isAdmin = false;
    AppState.adminPassword = "";
    sessionStorage.removeItem("thuvien_admin_pass");
    updateAdminUI();
    showToast("Đã đăng xuất khỏi tài khoản Quản trị viên.", "info");
    renderFilesAndFolders();
  } else {
    const modal = document.getElementById("admin-modal");
    const passInput = document.getElementById("admin-password-input");
    if (passInput) passInput.value = "";
    modal?.classList.add("show");
  }
}

async function handleAdminLogin() {
  const passInput = document.getElementById("admin-password-input");
  const password = passInput?.value?.trim() || "";

  if (!password) {
    showToast("Vui lòng nhập mật khẩu Quản trị viên!", "warning");
    return;
  }

  showLoading(true);
  try {
    const res = await DriveAPI.verifyAdminPassword(password);
    if (res && res.success) {
      AppState.isAdmin = true;
      AppState.adminPassword = password;
      sessionStorage.setItem("thuvien_admin_pass", password);
      updateAdminUI();
      closeModal();
      showToast("Đăng nhập Quản trị viên thành công! Bạn có quyền XÓA tài liệu.", "success");
      renderFilesAndFolders();
    } else {
      showToast(res.message || "Mật khẩu Quản trị viên không chính xác!", "error");
    }
  } catch (error) {
    showToast(error.message || "Không thể kết nối xác thực Admin!", "error");
  } finally {
    showLoading(false);
  }
}

function updateAdminUI() {
  const roleGuestWrap = document.getElementById("role-guest-wrap");
  const roleAdminWrap = document.getElementById("role-admin-wrap");
  const adminMenu = document.getElementById("admin-popup-menu");
  const adminTrigger = document.getElementById("btn-admin-menu-trigger");
  const createFolderBtn = document.getElementById("btn-create-folder");

  if (AppState.isAdmin) {
    if (roleGuestWrap) roleGuestWrap.style.display = "none";
    if (roleAdminWrap) roleAdminWrap.style.display = "flex";
    if (adminMenu) adminMenu.style.display = "none";
    if (adminTrigger) adminTrigger.classList.remove("active");
    if (createFolderBtn) createFolderBtn.style.display = "inline-flex";
  } else {
    if (roleGuestWrap) roleGuestWrap.style.display = "flex";
    if (roleAdminWrap) roleAdminWrap.style.display = "none";
    if (adminMenu) adminMenu.style.display = "none";
    if (adminTrigger) adminTrigger.classList.remove("active");
    if (createFolderBtn) createFolderBtn.style.display = "none";
  }
}

// ==========================================
// ĐỔI MẬT KHẨU QUẢN TRỊ VIÊN (ADMIN ONLY)
// ==========================================
function openChangePasswordModal() {
  if (!AppState.isAdmin) {
    showToast("Bạn cần đăng nhập quyền Quản trị viên trước khi đổi mật khẩu!", "warning");
    return;
  }

  const modal = document.getElementById("change-password-modal");
  const curPassInput = document.getElementById("current-admin-password-input");
  const newPassInput = document.getElementById("new-admin-password-input");
  const confirmPassInput = document.getElementById("confirm-new-admin-password-input");

  if (curPassInput) curPassInput.value = AppState.adminPassword || "";
  if (newPassInput) newPassInput.value = "";
  if (confirmPassInput) confirmPassInput.value = "";

  // Đặt lại kiểu input là password cho các ô
  [curPassInput, newPassInput, confirmPassInput].forEach(inp => {
    if (inp) inp.type = "password";
  });
  document.querySelectorAll("#change-password-modal .btn-pw-toggle i").forEach(icon => {
    icon.className = "fa-solid fa-eye";
  });

  modal?.classList.add("show");
  setTimeout(() => {
    if (newPassInput) newPassInput.focus();
  }, 150);
}

async function handleChangePasswordSubmit() {
  if (!AppState.isAdmin) return;

  const curPass = document.getElementById("current-admin-password-input")?.value?.trim() || "";
  const newPass = document.getElementById("new-admin-password-input")?.value?.trim() || "";
  const confirmPass = document.getElementById("confirm-new-admin-password-input")?.value?.trim() || "";

  if (!curPass) {
    showToast("Vui lòng nhập mật khẩu hiện tại!", "warning");
    document.getElementById("current-admin-password-input")?.focus();
    return;
  }

  if (!newPass) {
    showToast("Vui lòng nhập mật khẩu mới!", "warning");
    document.getElementById("new-admin-password-input")?.focus();
    return;
  }

  if (newPass.length < 4) {
    showToast("Mật khẩu mới phải có tối thiểu 4 ký tự!", "warning");
    document.getElementById("new-admin-password-input")?.focus();
    return;
  }

  if (newPass !== confirmPass) {
    showToast("Mật khẩu mới và mật khẩu xác nhận không khớp nhau!", "error");
    document.getElementById("confirm-new-admin-password-input")?.focus();
    return;
  }

  showLoading(true);
  try {
    const res = await DriveAPI.changeAdminPassword(curPass, newPass);
    if (res && res.success) {
      AppState.adminPassword = newPass;
      sessionStorage.setItem("thuvien_admin_pass", newPass);
      closeModal();
      showToast("Đổi mật khẩu Quản trị viên thành công!", "success");
    } else {
      showToast(res.error || res.message || "Đổi mật khẩu thất bại!", "error");
    }
  } catch (error) {
    showToast(error.message || "Lỗi kết nối khi đổi mật khẩu!", "error");
  } finally {
    showLoading(false);
  }
}

// ==========================================
// CHỨC NĂNG XÓA TỆP / THƯ MỤC (CHỈ ADMIN)
// ==========================================
function confirmDelete(id, name, type, event) {
  if (event) event.stopPropagation();

  if (!AppState.isAdmin) {
    showToast("Bạn cần đăng nhập quyền Quản trị viên để xóa tài liệu!", "warning");
    return;
  }

  AppState.selectedItemToDelete = { id, name, type };

  const modal = document.getElementById("delete-modal");
  const itemNameEl = document.getElementById("delete-item-name");
  const itemTypeEl = document.getElementById("delete-item-type");

  if (itemNameEl) itemNameEl.textContent = name;
  if (itemTypeEl) itemTypeEl.textContent = type === "folder" ? "Thư mục" : "Tài liệu";

  modal?.classList.add("show");
}

async function executeDelete() {
  if (!AppState.selectedItemToDelete || !AppState.isAdmin) return;

  const { id, name, type } = AppState.selectedItemToDelete;
  showLoading(true);

  try {
    await DriveAPI.deleteItem(id, type, AppState.adminPassword);
    showToast(`Đã xóa triệt để "${name}" khỏi Google Drive!`, "success");
    closeModal();
    DriveCache.invalidate(AppState.currentFolderId);
    loadFolder(AppState.currentFolderId, true);
  } catch (error) {
    showToast(error.message || "Xóa thất bại!", "error");
  } finally {
    showLoading(false);
  }
}

// ==========================================
// TẠO THƯ MỤC MỚI (CHỈ ADMIN)
// ==========================================
function openCreateFolderModal() {
  if (!AppState.isAdmin) return;
  const modal = document.getElementById("create-folder-modal");
  const input = document.getElementById("new-folder-name");
  if (input) input.value = "";
  modal?.classList.add("show");
}

async function executeCreateFolder() {
  const input = document.getElementById("new-folder-name");
  const name = input?.value?.trim();

  if (!name) {
    showToast("Vui lòng nhập tên thư mục!", "warning");
    return;
  }

  showLoading(true);
  try {
    await DriveAPI.createFolder(name, AppState.currentFolderId, AppState.adminPassword);
    showToast(`Đã tạo thư mục "${name}" thành công!`, "success");
    closeModal();
    DriveCache.invalidate(AppState.currentFolderId);
    loadFolder(AppState.currentFolderId, true);
  } catch (error) {
    showToast(error.message || "Không thể tạo thư mục!", "error");
  } finally {
    showLoading(false);
  }
}

// ==========================================
// TÌM KIẾM
// ==========================================
function filterCurrentView(keyword) {
  const query = (keyword || "").toLowerCase().trim();
  if (!query) {
    renderFilesAndFolders();
    return;
  }

  const container = document.getElementById("content-container");
  if (!container) return;

  const matchedFolders = AppState.folders.filter(f => f.name.toLowerCase().includes(query) || getVietnameseDisplayName(f.name).toLowerCase().includes(query));
  const matchedFiles = AppState.files.filter(f => f.name.toLowerCase().includes(query));

  const isGrid = AppState.viewMode === "grid";
  container.innerHTML = "";

  if (matchedFolders.length === 0 && matchedFiles.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-magnifying-glass empty-icon"></i>
        <h3>Không tìm thấy kết quả phù hợp với "${keyword}"</h3>
        <p>Nhấn phím <strong>Enter</strong> để tìm kiếm trên toàn bộ Google Drive.</p>
      </div>
    `;
    return;
  }

  if (matchedFolders.length > 0) {
    const wrap = document.createElement("div");
    wrap.className = isGrid ? "items-grid" : "items-list";
    matchedFolders.forEach(f => wrap.appendChild(createFolderElement(f, isGrid)));
    container.appendChild(wrap);
  }

  if (matchedFiles.length > 0) {
    const wrap = document.createElement("div");
    wrap.className = isGrid ? "items-grid" : "items-list";
    matchedFiles.forEach(f => wrap.appendChild(createFileElement(f, isGrid)));
    container.appendChild(wrap);
  }
}

async function performGlobalSearch(query) {
  if (!query || query.trim() === "") return;

  showLoading(true);
  try {
    const result = await DriveAPI.searchFiles(query);
    AppState.breadcrumbs = [{ id: "search", name: `Kết quả tìm: "${query}"` }];
    AppState.folders = [];
    AppState.files = mergeLocalContributors(result.files || []);
    renderBreadcrumbs();
    renderFilesAndFolders();
    showToast(`Tìm thấy ${result.total || 0} tài liệu phù hợp.`, "info");
  } catch (error) {
    showToast(error.message || "Tìm kiếm thất bại!", "error");
  } finally {
    showLoading(false);
  }
}

// ==========================================
// CÂY THƯ MỤC SIDEBAR TOÀN DIỆN (ĐỊNH DANH CHÍNH XÁC THEO ĐƯỜNG DẪN PATH)
// ==========================================
function renderFullSidebarTree() {
  const treeRoot = document.getElementById("sidebar-quick-tree");
  if (!treeRoot) return;

  const categories = [
    { 
      rawName: "01. VAN_BAN", 
      path: "01. VAN_BAN",
      displayName: "Văn bản chỉ đạo", 
      icon: "fa-file-lines" 
    },
    { 
      rawName: "02. KE_HOACH_GIAO_DUC", 
      path: "02. KE_HOACH_GIAO_DUC",
      displayName: "Kế hoạch giáo dục", 
      icon: "fa-calendar-check",
      children: [
        { rawName: "KHOI_1", path: "02. KE_HOACH_GIAO_DUC/KHOI_1", displayName: "Khối 1" },
        { rawName: "KHOI_2", path: "02. KE_HOACH_GIAO_DUC/KHOI_2", displayName: "Khối 2" },
        { rawName: "KHOI_3", path: "02. KE_HOACH_GIAO_DUC/KHOI_3", displayName: "Khối 3" },
        { rawName: "KHOI_4", path: "02. KE_HOACH_GIAO_DUC/KHOI_4", displayName: "Khối 4" },
        { rawName: "KHOI_5", path: "02. KE_HOACH_GIAO_DUC/KHOI_5", displayName: "Khối 5" },
        { rawName: "TRUONG", path: "02. KE_HOACH_GIAO_DUC/TRUONG", displayName: "Cấp trường" }
      ]
    },
    { 
      rawName: "03. KE_HOACH_BAI_DAY", 
      path: "03. KE_HOACH_BAI_DAY",
      displayName: "Kế hoạch bài dạy (Giáo án)", 
      icon: "fa-book-open",
      children: [
        { 
          rawName: "KHOI_1", 
          path: "03. KE_HOACH_BAI_DAY/KHOI_1",
          displayName: "Khối 1", 
          sub: [
            { rawName: "TOAN", path: "03. KE_HOACH_BAI_DAY/KHOI_1/TOAN", displayName: "Toán" },
            { rawName: "TIENG_VIET", path: "03. KE_HOACH_BAI_DAY/KHOI_1/TIENG_VIET", displayName: "Tiếng Việt" },
            { rawName: "TIENG_ANH", path: "03. KE_HOACH_BAI_DAY/KHOI_1/TIENG_ANH", displayName: "Tiếng Anh" },
            { rawName: "TNXH", path: "03. KE_HOACH_BAI_DAY/KHOI_1/TNXH", displayName: "Tự nhiên & Xã hội" },
            { rawName: "DAO_DUC", path: "03. KE_HOACH_BAI_DAY/KHOI_1/DAO_DUC", displayName: "Đạo đức" },
            { rawName: "GDTC", path: "03. KE_HOACH_BAI_DAY/KHOI_1/GDTC", displayName: "Giáo dục thể chất" },
            { rawName: "HAT_NHAC", path: "03. KE_HOACH_BAI_DAY/KHOI_1/HAT_NHAC", displayName: "Âm nhạc" },
            { rawName: "MI_THUAT", path: "03. KE_HOACH_BAI_DAY/KHOI_1/MI_THUAT", displayName: "Mĩ thuật" },
            { rawName: "HDTN", path: "03. KE_HOACH_BAI_DAY/KHOI_1/HDTN", displayName: "Hoạt động trải nghiệm" },
            { rawName: "KHAC", path: "03. KE_HOACH_BAI_DAY/KHOI_1/KHAC", displayName: "Khác" }
          ] 
        },
        { 
          rawName: "KHOI_2", 
          path: "03. KE_HOACH_BAI_DAY/KHOI_2",
          displayName: "Khối 2", 
          sub: [
            { rawName: "TOAN", path: "03. KE_HOACH_BAI_DAY/KHOI_2/TOAN", displayName: "Toán" },
            { rawName: "TIENG_VIET", path: "03. KE_HOACH_BAI_DAY/KHOI_2/TIENG_VIET", displayName: "Tiếng Việt" },
            { rawName: "TIENG_ANH", path: "03. KE_HOACH_BAI_DAY/KHOI_2/TIENG_ANH", displayName: "Tiếng Anh" },
            { rawName: "TNXH", path: "03. KE_HOACH_BAI_DAY/KHOI_2/TNXH", displayName: "Tự nhiên & Xã hội" },
            { rawName: "DAO_DUC", path: "03. KE_HOACH_BAI_DAY/KHOI_2/DAO_DUC", displayName: "Đạo đức" },
            { rawName: "GDTC", path: "03. KE_HOACH_BAI_DAY/KHOI_2/GDTC", displayName: "Giáo dục thể chất" },
            { rawName: "HAT_NHAC", path: "03. KE_HOACH_BAI_DAY/KHOI_2/HAT_NHAC", displayName: "Âm nhạc" },
            { rawName: "MI_THUAT", path: "03. KE_HOACH_BAI_DAY/KHOI_2/MI_THUAT", displayName: "Mĩ thuật" },
            { rawName: "HDTN", path: "03. KE_HOACH_BAI_DAY/KHOI_2/HDTN", displayName: "Hoạt động trải nghiệm" },
            { rawName: "KHAC", path: "03. KE_HOACH_BAI_DAY/KHOI_2/KHAC", displayName: "Khác" }
          ] 
        },
        { 
          rawName: "KHOI_3", 
          path: "03. KE_HOACH_BAI_DAY/KHOI_3",
          displayName: "Khối 3", 
          sub: [
            { rawName: "TOAN", path: "03. KE_HOACH_BAI_DAY/KHOI_3/TOAN", displayName: "Toán" },
            { rawName: "TIENG_VIET", path: "03. KE_HOACH_BAI_DAY/KHOI_3/TIENG_VIET", displayName: "Tiếng Việt" },
            { rawName: "TIENG_ANH", path: "03. KE_HOACH_BAI_DAY/KHOI_3/TIENG_ANH", displayName: "Tiếng Anh" },
            { rawName: "TNXH", path: "03. KE_HOACH_BAI_DAY/KHOI_3/TNXH", displayName: "Tự nhiên & Xã hội" },
            { rawName: "TIN_HOC", path: "03. KE_HOACH_BAI_DAY/KHOI_3/TIN_HOC", displayName: "Tin học" },
            { rawName: "CONG_NGHE", path: "03. KE_HOACH_BAI_DAY/KHOI_3/CONG_NGHE", displayName: "Công nghệ" },
            { rawName: "DAO_DUC", path: "03. KE_HOACH_BAI_DAY/KHOI_3/DAO_DUC", displayName: "Đạo đức" },
            { rawName: "GDTC", path: "03. KE_HOACH_BAI_DAY/KHOI_3/GDTC", displayName: "Giáo dục thể chất" },
            { rawName: "HAT_NHAC", path: "03. KE_HOACH_BAI_DAY/KHOI_3/HAT_NHAC", displayName: "Âm nhạc" },
            { rawName: "MI_THUAT", path: "03. KE_HOACH_BAI_DAY/KHOI_3/MI_THUAT", displayName: "Mĩ thuật" },
            { rawName: "HDTN", path: "03. KE_HOACH_BAI_DAY/KHOI_3/HDTN", displayName: "Hoạt động trải nghiệm" },
            { rawName: "KHAC", path: "03. KE_HOACH_BAI_DAY/KHOI_3/KHAC", displayName: "Khác" }
          ] 
        },
        { 
          rawName: "KHOI_4", 
          path: "03. KE_HOACH_BAI_DAY/KHOI_4",
          displayName: "Khối 4", 
          sub: [
            { rawName: "TOAN", path: "03. KE_HOACH_BAI_DAY/KHOI_4/TOAN", displayName: "Toán" },
            { rawName: "TIENG_VIET", path: "03. KE_HOACH_BAI_DAY/KHOI_4/TIENG_VIET", displayName: "Tiếng Việt" },
            { rawName: "TIENG_ANH", path: "03. KE_HOACH_BAI_DAY/KHOI_4/TIENG_ANH", displayName: "Tiếng Anh" },
            { rawName: "KHOA_HOC", path: "03. KE_HOACH_BAI_DAY/KHOI_4/KHOA_HOC", displayName: "Khoa học" },
            { rawName: "LICH_SU_&_DIA_LY", path: "03. KE_HOACH_BAI_DAY/KHOI_4/LICH_SU_&_DIA_LY", displayName: "Lịch sử & Địa lí" },
            { rawName: "TIN_HOC", path: "03. KE_HOACH_BAI_DAY/KHOI_4/TIN_HOC", displayName: "Tin học" },
            { rawName: "CONG_NGHE", path: "03. KE_HOACH_BAI_DAY/KHOI_4/CONG_NGHE", displayName: "Công nghệ" },
            { rawName: "DAO_DUC", path: "03. KE_HOACH_BAI_DAY/KHOI_4/DAO_DUC", displayName: "Đạo đức" },
            { rawName: "GDTC", path: "03. KE_HOACH_BAI_DAY/KHOI_4/GDTC", displayName: "Giáo dục thể chất" },
            { rawName: "HAT_NHAC", path: "03. KE_HOACH_BAI_DAY/KHOI_4/HAT_NHAC", displayName: "Âm nhạc" },
            { rawName: "MI_THUAT", path: "03. KE_HOACH_BAI_DAY/KHOI_4/MI_THUAT", displayName: "Mĩ thuật" },
            { rawName: "HDTN", path: "03. KE_HOACH_BAI_DAY/KHOI_4/HDTN", displayName: "Hoạt động trải nghiệm" },
            { rawName: "KHAC", path: "03. KE_HOACH_BAI_DAY/KHOI_4/KHAC", displayName: "Khác" }
          ] 
        },
        { 
          rawName: "KHOI_5", 
          path: "03. KE_HOACH_BAI_DAY/KHOI_5",
          displayName: "Khối 5", 
          sub: [
            { rawName: "TOAN", path: "03. KE_HOACH_BAI_DAY/KHOI_5/TOAN", displayName: "Toán" },
            { rawName: "TIENG_VIET", path: "03. KE_HOACH_BAI_DAY/KHOI_5/TIENG_VIET", displayName: "Tiếng Việt" },
            { rawName: "TIENG_ANH", path: "03. KE_HOACH_BAI_DAY/KHOI_5/TIENG_ANH", displayName: "Tiếng Anh" },
            { rawName: "KHOA_HOC", path: "03. KE_HOACH_BAI_DAY/KHOI_5/KHOA_HOC", displayName: "Khoa học" },
            { rawName: "LICH_SU_&_DIA_LY", path: "03. KE_HOACH_BAI_DAY/KHOI_5/LICH_SU_&_DIA_LY", displayName: "Lịch sử & Địa lí" },
            { rawName: "TIN_HOC", path: "03. KE_HOACH_BAI_DAY/KHOI_5/TIN_HOC", displayName: "Tin học" },
            { rawName: "CONG_NGHE", path: "03. KE_HOACH_BAI_DAY/KHOI_5/CONG_NGHE", displayName: "Công nghệ" },
            { rawName: "DAO_DUC", path: "03. KE_HOACH_BAI_DAY/KHOI_5/DAO_DUC", displayName: "Đạo đức" },
            { rawName: "GDTC", path: "03. KE_HOACH_BAI_DAY/KHOI_5/GDTC", displayName: "Giáo dục thể chất" },
            { rawName: "HAT_NHAC", path: "03. KE_HOACH_BAI_DAY/KHOI_5/HAT_NHAC", displayName: "Âm nhạc" },
            { rawName: "MI_THUAT", path: "03. KE_HOACH_BAI_DAY/KHOI_5/MI_THUAT", displayName: "Mĩ thuật" },
            { rawName: "HDTN", path: "03. KE_HOACH_BAI_DAY/KHOI_5/HDTN", displayName: "Hoạt động trải nghiệm" },
            { rawName: "KHAC", path: "03. KE_HOACH_BAI_DAY/KHOI_5/KHAC", displayName: "Khác" }
          ] 
        }
      ]
    },
    { 
      rawName: "04. DE_KIEM_TRA", 
      path: "04. DE_KIEM_TRA",
      displayName: "Đề kiểm tra & Đánh giá", 
      icon: "fa-graduation-cap",
      children: [
        { 
          rawName: "KHOI_1", 
          path: "04. DE_KIEM_TRA/KHOI_1",
          displayName: "Khối 1", 
          sub: [
            { rawName: "HOC_KI_1", path: "04. DE_KIEM_TRA/KHOI_1/HOC_KI_1", displayName: "Cuối Học kì 1" },
            { rawName: "HOC_KI_2", path: "04. DE_KIEM_TRA/KHOI_1/HOC_KI_2", displayName: "Cuối Học kì 2" }
          ] 
        },
        { 
          rawName: "KHOI_2", 
          path: "04. DE_KIEM_TRA/KHOI_2",
          displayName: "Khối 2", 
          sub: [
            { rawName: "HOC_KI_1", path: "04. DE_KIEM_TRA/KHOI_2/HOC_KI_1", displayName: "Cuối Học kì 1" },
            { rawName: "HOC_KI_2", path: "04. DE_KIEM_TRA/KHOI_2/HOC_KI_2", displayName: "Cuối Học kì 2" }
          ] 
        },
        { 
          rawName: "KHOI_3", 
          path: "04. DE_KIEM_TRA/KHOI_3",
          displayName: "Khối 3", 
          sub: [
            { rawName: "HOC_KI_1", path: "04. DE_KIEM_TRA/KHOI_3/HOC_KI_1", displayName: "Cuối Học kì 1" },
            { rawName: "HOC_KI_2", path: "04. DE_KIEM_TRA/KHOI_3/HOC_KI_2", displayName: "Cuối Học kì 2" }
          ] 
        },
        { 
          rawName: "KHOI_4", 
          path: "04. DE_KIEM_TRA/KHOI_4",
          displayName: "Khối 4", 
          sub: [
            { rawName: "GIUA_KI_1", path: "04. DE_KIEM_TRA/KHOI_4/GIUA_KI_1", displayName: "Giữa Học kì 1" },
            { rawName: "HOC_KI_1", path: "04. DE_KIEM_TRA/KHOI_4/HOC_KI_1", displayName: "Cuối Học kì 1" },
            { rawName: "GIUA_KI_2", path: "04. DE_KIEM_TRA/KHOI_4/GIUA_KI_2", displayName: "Giữa Học kì 2" },
            { rawName: "HOC_KI_2", path: "04. DE_KIEM_TRA/KHOI_4/HOC_KI_2", displayName: "Cuối Học kì 2" }
          ] 
        },
        { 
          rawName: "KHOI_5", 
          path: "04. DE_KIEM_TRA/KHOI_5",
          displayName: "Khối 5", 
          sub: [
            { rawName: "GIUA_KI_1", path: "04. DE_KIEM_TRA/KHOI_5/GIUA_KI_1", displayName: "Giữa Học kì 1" },
            { rawName: "HOC_KI_1", path: "04. DE_KIEM_TRA/KHOI_5/HOC_KI_1", displayName: "Cuối Học kì 1" },
            { rawName: "GIUA_KI_2", path: "04. DE_KIEM_TRA/KHOI_5/GIUA_KI_2", displayName: "Giữa Học kì 2" },
            { rawName: "HOC_KI_2", path: "04. DE_KIEM_TRA/KHOI_5/HOC_KI_2", displayName: "Cuối Học kì 2" }
          ] 
        }
      ]
    },
    { 
      rawName: "05. CHUYEN_DE_SKKN", 
      path: "05. CHUYEN_DE_SKKN",
      displayName: "Chuyên đề & SKKN", 
      icon: "fa-lightbulb",
      children: [
        { rawName: "KHOI_1", path: "05. CHUYEN_DE_SKKN/KHOI_1", displayName: "Khối 1" },
        { rawName: "KHOI_2", path: "05. CHUYEN_DE_SKKN/KHOI_2", displayName: "Khối 2" },
        { rawName: "KHOI_3", path: "05. CHUYEN_DE_SKKN/KHOI_3", displayName: "Khối 3" },
        { rawName: "KHOI_4", path: "05. CHUYEN_DE_SKKN/KHOI_4", displayName: "Khối 4" },
        { rawName: "KHOI_5", path: "05. CHUYEN_DE_SKKN/KHOI_5", displayName: "Khối 5" },
        { rawName: "TRUONG", path: "05. CHUYEN_DE_SKKN/TRUONG", displayName: "Cấp trường" }
      ]
    },
    { 
      rawName: "06. HINH_ANH", 
      path: "06. HINH_ANH",
      displayName: "Tư liệu ảnh & Video", 
      icon: "fa-images" 
    },
    { 
      rawName: "07. KHAC", 
      path: "07. KHAC",
      displayName: "Tài liệu khác", 
      icon: "fa-boxes-stacked" 
    }
  ];

  let html = `<ul class="tree-menu">`;

  categories.forEach(cat => {
    const hasChildren = cat.children && cat.children.length > 0;
    html += `
      <li class="tree-item" data-folder-path="${cat.path}">
        <div class="tree-row" onclick="handleTreeRowClick('${cat.path}', this, ${hasChildren})">
          <a href="javascript:void(0)">
            <i class="fa-solid ${cat.icon}"></i>
            <span>${cat.displayName}</span>
          </a>
          ${hasChildren ? `<button class="tree-toggle" type="button"><i class="fa-solid fa-chevron-right"></i></button>` : ''}
        </div>
    `;

    if (hasChildren) {
      html += `<ul class="sub-tree" style="display:none;">`;
      cat.children.forEach(sub => {
        const hasSubItems = sub.sub && sub.sub.length > 0;
        html += `
          <li class="sub-tree-item" data-folder-path="${sub.path}">
            <div class="tree-row" onclick="handleTreeRowClick('${sub.path}', this, ${hasSubItems})">
              <a href="javascript:void(0)">
                <i class="fa-solid fa-folder"></i>
                <span>${sub.displayName}</span>
              </a>
              ${hasSubItems ? `<button class="tree-toggle" type="button"><i class="fa-solid fa-chevron-right"></i></button>` : ''}
            </div>
        `;
        if (hasSubItems) {
          html += `<ul class="sub-tree nested-sub-tree" style="display:none;">`;
          sub.sub.forEach(m => {
            html += `
              <li class="nested-tree-item" data-folder-path="${m.path}">
                <div class="tree-row" onclick="handleTreeRowClick('${m.path}', this, false)">
                  <a href="javascript:void(0)">
                    <i class="fa-regular fa-folder"></i>
                    <span>${m.displayName}</span>
                  </a>
                </div>
              </li>
            `;
          });
          html += `</ul>`;
        }
        html += `</li>`;
      });
      html += `</ul>`;
    }

    html += `</li>`;
  });

  html += `</ul>`;
  treeRoot.innerHTML = html;
}

// Bấm vào hàng cây: Tự động mở menu mới, ĐÓNG MENU CŨ (Accordion) + Mở thư mục theo PATH CHÍNH XÁC
function handleTreeRowClick(targetPath, rowElement, hasChildren) {
  const currentLi = rowElement.closest("li");
  const parentUl = currentLi ? currentLi.parentElement : null;

  if (hasChildren) {
    const subTree = rowElement.nextElementSibling;
    const toggleBtn = rowElement.querySelector(".tree-toggle");
    if (subTree && subTree.tagName === "UL") {
      const isCurrentlyHidden = subTree.style.display === "none";

      // 1. ĐÓNG TẤT CẢ CÁC MENU CÙNG CẤP (Cơ chế Accordion)
      if (parentUl) {
        parentUl.querySelectorAll(":scope > li").forEach(siblingLi => {
          if (siblingLi !== currentLi) {
            const sibSubTree = siblingLi.querySelector(":scope > .sub-tree");
            const sibToggle = siblingLi.querySelector(":scope > .tree-row .tree-toggle");
            if (sibSubTree) {
              sibSubTree.style.display = "none";
            }
            if (sibToggle) {
              sibToggle.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
            }
          }
        });
      }

      // 2. Mở menu được chọn hoặc đóng lại nếu bấm lần 2
      subTree.style.display = isCurrentlyHidden ? "block" : "none";
      if (toggleBtn) {
        toggleBtn.innerHTML = `<i class="fa-solid fa-chevron-${isCurrentlyHidden ? 'down' : 'right'}"></i>`;
      }
    }
  }

  // 3. Đánh dấu mục active & Điều hướng tải thư mục CHÍNH XÁC TUYỆT ĐỐI THEO PATH
  highlightActiveSidebarItemByPath(targetPath);
  navigateBySidebarPath(targetPath);
}

// Điều hướng theo Đường dẫn đầy đủ
function navigateBySidebarPath(targetPath) {
  // 1. Tra cứu trong Bản đồ đường dẫn
  const cachedId = AppState.folderMapByPath[targetPath] || AppState.folderMapByPath["THU_VIEN/" + targetPath];
  if (cachedId) {
    loadFolder(cachedId);
    return;
  }

  // 2. Tra cứu trong bộ nhớ Cache DriveCache
  for (const fId in DriveCache.data) {
    const item = DriveCache.data[fId]?.content;
    if (item && item.breadcrumbs) {
      const p1 = item.breadcrumbs.map(c => c.name).join("/");
      const p2 = item.breadcrumbs.slice(1).map(c => c.name).join("/");
      if (p1 === targetPath || p2 === targetPath || p1.endsWith("/" + targetPath)) {
        loadFolder(fId);
        return;
      }
    }
  }

  // 3. Fallback: Lọc từ khóa theo tên thư mục cuối cùng trong path
  const parts = targetPath.split("/");
  const leafName = parts[parts.length - 1];
  const target = AppState.folders.find(f => f.name === leafName);
  if (target) {
    loadFolder(target.id);
  } else {
    filterCurrentView(leafName);
  }
}

// Highlight chính xác tuyệt đối mục đang chọn theo Đường dẫn đầy đủ
function highlightActiveSidebarItemByPath(targetPath) {
  document.querySelectorAll(".tree-menu li").forEach(li => li.classList.remove("active"));
  if (!targetPath) return;

  // Tìm li có data-folder-path khớp chính xác
  let activeLi = document.querySelector(`.tree-menu li[data-folder-path="${targetPath}"]`);
  
  if (!activeLi) {
    // Thử cắt bỏ THU_VIEN/ ở đầu nếu có
    const cleanPath = targetPath.replace(/^THU_VIEN\//, "");
    activeLi = document.querySelector(`.tree-menu li[data-folder-path="${cleanPath}"]`);
  }

  if (activeLi) {
    activeLi.classList.add("active");
    
    // Mở tất cả cây cha của mục active và đóng các nhánh anh em
    let parentUl = activeLi.closest(".sub-tree");
    while (parentUl) {
      parentUl.style.display = "block";
      const toggleBtn = parentUl.previousElementSibling?.querySelector(".tree-toggle");
      if (toggleBtn) toggleBtn.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;

      const parentLi = parentUl.parentElement;
      const grandParentUl = parentLi?.parentElement;
      if (grandParentUl) {
        grandParentUl.querySelectorAll(":scope > li").forEach(sib => {
          if (sib !== parentLi) {
            const sibSub = sib.querySelector(":scope > .sub-tree");
            const sibTog = sib.querySelector(":scope > .tree-row .tree-toggle");
            if (sibSub) sibSub.style.display = "none";
            if (sibTog) sibTog.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
          }
        });
      }

      parentUl = parentLi?.closest(".sub-tree");
    }
  }
}

// Chuyển đổi tên thư mục raw trên Drive sang tiếng Việt có dấu (đã loại bỏ số 01, 02...)
function getVietnameseDisplayName(rawName) {
  if (!rawName) return "";

  const nameMap = {
    "01. VAN_BAN": "Văn bản chỉ đạo",
    "02. KE_HOACH_GIAO_DUC": "Kế hoạch giáo dục",
    "03. KE_HOACH_BAI_DAY": "Kế hoạch bài dạy (Giáo án)",
    "04. DE_KIEM_TRA": "Đề kiểm tra & Đánh giá",
    "05. CHUYEN_DE_SKKN": "Chuyên đề & SKKN",
    "06. HINH_ANH": "Tư liệu ảnh & Video",
    "07. KHAC": "Tài liệu khác",
    "KHOI_1": "Khối 1",
    "KHOI_2": "Khối 2",
    "KHOI_3": "Khối 3",
    "KHOI_4": "Khối 4",
    "KHOI_5": "Khối 5",
    "TRUONG": "Cấp trường",
    "TOAN": "Toán",
    "TIENG_VIET": "Tiếng Việt",
    "TIENG_ANH": "Tiếng Anh",
    "TNXH": "Tự nhiên và Xã hội",
    "KHOA_HOC": "Khoa học",
    "LICH_SU_&_DIA_LY": "Lịch sử và Địa lí",
    "TIN_HOC": "Tin học",
    "CONG_NGHE": "Công nghệ",
    "DAO_DUC": "Đạo đức",
    "GDTC": "Giáo dục thể chất",
    "HAT_NHAC": "Âm nhạc",
    "MI_THUAT": "Mĩ thuật",
    "HDTN": "Hoạt động trải nghiệm",
    "KHAC": "Khác",
    "HOC_KI_1": "Cuối Học kì 1",
    "HOC_KI_2": "Cuối Học kì 2",
    "GIUA_KI_1": "Giữa Học kì 1",
    "GIUA_KI_2": "Giữa Học kì 2"
  };

  if (nameMap[rawName]) return nameMap[rawName];

  // Xóa tiền tố dạng "01. ", "02. " nếu có
  let cleaned = rawName.replace(/^\d+[\._\s\-]+\s*/, "");
  return cleaned.replace(/_/g, " ");
}

// ==========================================
// CÁC HÀM TIỆN ÍCH
// ==========================================
function setViewMode(mode) {
  AppState.viewMode = mode;
  document.getElementById("btn-view-grid")?.classList.toggle("active", mode === "grid");
  document.getElementById("btn-view-list")?.classList.toggle("active", mode === "list");
  renderFilesAndFolders();
}

function updateFolderStats() {
  const statEl = document.getElementById("folder-stats-text");
  if (statEl) {
    const validFiles = filterValidLibraryFiles(AppState.files);
    statEl.textContent = `${AppState.folders.length} thư mục • ${validFiles.length} tài liệu`;
  }
}

function closeModal() {
  document.querySelectorAll(".modal").forEach(m => m.classList.remove("show"));
  const iframe = document.getElementById("preview-iframe");
  if (iframe) iframe.src = "";
}

function showLoading(show) {
  const loader = document.getElementById("global-loader");
  if (loader) loader.style.display = show ? "flex" : "none";
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-message toast-${type}`;

  let icon = "fa-circle-info";
  if (type === "success") icon = "fa-circle-check";
  if (type === "error") icon = "fa-circle-exclamation";
  if (type === "warning") icon = "fa-triangle-exclamation";

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return "0 KB";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function showSetupGuideOverlay() {
  const overlay = document.getElementById("setup-overlay");
  if (overlay) overlay.style.display = "flex";
}
