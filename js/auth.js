/**
 * AUTHENTICATION & ACCESS CONTROL MODULE (SERVER-SIDE SECURITY & PIN MANAGER)
 * Quản lý & Cấp mã PIN cho đồng nghiệp - Thầy Lê Thành Long
 */

var AuthService = {
  defaultPins: [],

  getValidPins: function() {
    try {
      var saved = localStorage.getItem("tvth_custom_pins");
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return this.defaultPins;
  },

  savePins: function(pins) {
    localStorage.setItem("tvth_custom_pins", JSON.stringify(pins));
  },

  addPin: function(code, grade, desc) {
    var cleanCode = (code || "").trim().toUpperCase();
    if (!cleanCode) return { success: false, msg: "Mã PIN không được để trống" };

    var pins = this.getValidPins();
    if (pins.some(function(p) { return p.code === cleanCode; })) {
      return { success: false, msg: "Mã PIN '" + cleanCode + "' đã tồn tại!" };
    }

    var newPinObj = {
      code: cleanCode,
      grade: grade || "all",
      desc: desc || ("Mã tạo bởi Thầy Long ngày " + new Date().toLocaleDateString('vi-VN'))
    };
    pins.push(newPinObj);
    this.savePins(pins);

    // Đồng bộ lên Google Server
    try {
      var token = this.getAdminToken();
      if (token && CONFIG.API_URL) {
        fetch(CONFIG.API_URL + "?action=save_pin&code=" + encodeURIComponent(cleanCode) + "&grade=" + encodeURIComponent(grade) + "&desc=" + encodeURIComponent(desc) + "&adminToken=" + encodeURIComponent(token));
      }
    } catch(e) {}

    return { success: true, pin: newPinObj };
  },

  deletePin: function(code) {
    var cleanCode = (code || "").trim().toUpperCase();
    var pins = this.getValidPins();
    var filtered = pins.filter(function(p) { return p.code !== cleanCode; });
    this.savePins(filtered);
    showToast("Đã xóa mã PIN " + cleanCode, "info");
    if (typeof refreshCurrentView === "function") refreshCurrentView();
  },

  getSession: function() {
    try {
      var session = sessionStorage.getItem("tvth_user_session") || localStorage.getItem("tvth_user_session");
      if (session) return JSON.parse(session);
    } catch (e) {}
    return { role: "guest", unlockedGrade: null, displayName: "Khách (Xem trước)" };
  },

  getAdminToken: function() {
    return sessionStorage.getItem("tvth_admin_token") || localStorage.getItem("tvth_admin_token") || "";
  },

  getFilePermissionMap: function() {
    try {
      var saved = localStorage.getItem("tvth_file_permissions");
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return {};
  },

  getFilePermission: function(file) {
    if (!file) return "pin";
    var map = this.getFilePermissionMap();
    if (map[file.id]) {
      if (map[file.id] === "admin_only") return "hidden";
      return map[file.id];
    }

    // 🟢 Mở khóa MIỄN PHÍ TỪ TUẦN 1 ĐẾN TUẦN 8 (dành cho khách tải tự do để thu hút truy cập)
    var isFreeWeek = false;
    if (file.week && file.week >= 1 && file.week <= 8) {
      isFreeWeek = true;
    } else if (file.weeks && Array.isArray(file.weeks) && file.weeks.some(function(w) { return w >= 1 && w <= 8; })) {
      isFreeWeek = true;
    } else {
      // Nhận diện theo tên file hoặc đường dẫn thư mục
      var textToCheck = ((file.name || '') + ' ' + (file.folderPath || '') + ' ' + (file.path || '')).toUpperCase();
      var matchWeek = textToCheck.match(/TUẦN\s*([0-9]+)/) || textToCheck.match(/TUAN\s*([0-9]+)/) || textToCheck.match(/TUAN([0-9]+)/) || textToCheck.match(/\bT([1-8])\b/);
      if (matchWeek && matchWeek[1]) {
        var wNum = parseInt(matchWeek[1], 10);
        if (wNum >= 1 && wNum <= 8) isFreeWeek = true;
      }
    }

    if (isFreeWeek) {
      return "free";
    }

    // Các tuần còn lại (Tuần 9-35): Yêu cầu mã PIN
    return "pin";
  },

  setFilePermission: async function(fileId, permission) {
    var map = this.getFilePermissionMap();
    map[fileId] = permission;
    localStorage.setItem("tvth_file_permissions", JSON.stringify(map));

    var label = "🟢 Miễn phí";
    if (permission === "pin") label = "🔒 Cần PIN";
    if (permission === "hidden") label = "👁️‍🗨️ Ẩn với khách";

    showToast("Đã cập nhật quyền thành: " + label, "success");

    try {
      var token = this.getAdminToken();
      if (token && CONFIG.API_URL) {
        fetch(CONFIG.API_URL + "?action=set_file_permission&fileId=" + fileId + "&permission=" + permission + "&adminToken=" + encodeURIComponent(token));
      }
    } catch(e) {}

    if (typeof refreshCurrentView === "function") refreshCurrentView();
  },

  setBulkPermission: async function(permission, grade) {
    var map = this.getFilePermissionMap();
    if (DATABASE && DATABASE.allFiles) {
      DATABASE.allFiles.forEach(function(f) {
        if (!grade || grade === "all" || f.grade === parseInt(grade)) {
          map[f.id] = permission;
        }
      });
      localStorage.setItem("tvth_file_permissions", JSON.stringify(map));

      var msg = "Đã khóa toàn bộ kho (Cần PIN)! Giờ bạn có thể mở từng cái theo ý muốn.";
      if (permission === "free") msg = "Đã mở toàn bộ kho (Miễn phí)! Giờ bạn có thể khóa từng cái theo ý muốn.";
      if (permission === "hidden") msg = "Đã chuyển toàn bộ kho sang chế độ Ẩn với khách!";

      showToast(msg, "success");

      try {
        var token = this.getAdminToken();
        if (token && CONFIG.API_URL) {
          fetch(CONFIG.API_URL + "?action=set_bulk_permission&permission=" + permission + "&adminToken=" + encodeURIComponent(token));
        }
      } catch(e) {}

      if (typeof refreshCurrentView === "function") refreshCurrentView();
    }
  },

  isVisibleToFileList: function(file) {
    var perm = this.getFilePermission(file);
    if (perm === "hidden") {
      var session = this.getSession();
      return session.role === "admin";
    }
    return true;
  },

  verifyPin: async function(pinCode) {
    if (!pinCode) return { success: false, msg: "Vui lòng nhập mã PIN" };
    var cleanPin = pinCode.trim().toUpperCase();

    // 1. Thử gửi xác thực lên Google Apps Script Backend
    try {
      var res = await fetch(CONFIG.API_URL + "?action=verify_pin&pin=" + encodeURIComponent(cleanPin));
      var json = await res.json();
      if (json && json.success) {
        var serverSession = {
          role: "pin_user",
          unlockedGrade: json.grade || "all",
          pinCode: cleanPin,
          displayName: json.grade === "all" ? "Giáo viên (Mở khóa toàn bộ)" : ("Giáo viên (Khối " + json.grade + ")")
        };
        sessionStorage.setItem("tvth_user_session", JSON.stringify(serverSession));
        localStorage.setItem("tvth_user_session", JSON.stringify(serverSession));
        this.updateAuthUI();
        return { success: true, session: serverSession };
      }
    } catch(err) {
      console.warn("Backend offline or unreachable:", err);
      return { success: false, msg: "Không thể kết nối máy chủ xác thực. Vui lòng kiểm tra kết nối mạng và thử lại!" };
    }

    return { success: false, msg: "Mã PIN không đúng hoặc đã hết hạn!" };
  },

  loginAdmin: async function(password) {
    if (!password) return { success: false, msg: "Vui lòng nhập mật khẩu Quản trị" };

    try {
      var res = await fetch(CONFIG.API_URL + "?action=verify_admin&password=" + encodeURIComponent(password));
      var json = await res.json();
      if (json && json.success) {
        var adminSession = {
          role: "admin",
          unlockedGrade: "all",
          displayName: "Thầy Lê Thành Long (Quản trị viên)"
        };
        sessionStorage.setItem("tvth_user_session", JSON.stringify(adminSession));
        sessionStorage.setItem("tvth_admin_token", json.token || "admin_auth_success");
        this.updateAuthUI();
        return { success: true };
      }
    } catch(err) {
      console.warn("Backend verification error:", err);
      return { success: false, msg: "Không thể kết nối máy chủ xác thực. Vui lòng kiểm tra kết nối mạng và thử lại!" };
    }

    return { success: false, msg: "Mật khẩu Quản trị không chính xác!" };
  },

  logout: function() {
    sessionStorage.removeItem("tvth_user_session");
    sessionStorage.removeItem("tvth_admin_token");
    localStorage.removeItem("tvth_user_session");
    this.updateAuthUI();
    showToast("Đã đăng xuất tài khoản", "info");
    if (typeof refreshCurrentView === "function") refreshCurrentView();
  },

  canDownload: function(item) {
    if (!item) return false;
    var session = this.getSession();
    if (session.role === "admin") return true;

    var perm = this.getFilePermission(item);
    if (perm === "free") return true;
    if (perm === "hidden") return false;

    if (perm === "pin") {
      if (session.role === "pin_user") {
        if (session.unlockedGrade === "all") return true;
        if (item.grade && parseInt(item.grade) === parseInt(session.unlockedGrade)) return true;
      }
      return false;
    }

    return false;
  },

  updateAuthUI: function() {
    var session = this.getSession();
    var roleBox = document.getElementById("user-role-box");
    if (!roleBox) return;

    if (session.role === "admin") {
      roleBox.innerHTML = `
        <div class="user-role-badge role-admin">
          <i class="fa-solid fa-crown" style="color: #fbbf24;"></i>
          <span>Thầy Lê Thành Long (Admin)</span>
        </div>
        <div style="font-size: 0.72rem; color: #86efac; margin-top: 0.3rem;">
          <i class="fa-solid fa-shield-check"></i> Đang kết nối bảo mật máy chủ
        </div>
        <button class="btn btn-sm btn-outline" style="width: 100%; margin-top: 0.4rem; color: #ffffff; border-color: rgba(255,255,255,0.4);" onclick="AuthService.logout()">
          <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất Admin
        </button>
      `;
    } else if (session.role === "pin_user") {
      roleBox.innerHTML = `
        <div class="user-role-badge role-pin">
          <i class="fa-solid fa-key" style="color: #facc15;"></i>
          <span>${session.displayName}</span>
        </div>
        <button class="btn btn-sm btn-outline" style="width: 100%; margin-top: 0.4rem;" onclick="AuthService.logout()">
          <i class="fa-solid fa-right-from-bracket"></i> Đổi mã PIN
        </button>
      `;
    } else {
      roleBox.innerHTML = `
        <div class="user-role-badge role-guest">
          <i class="fa-solid fa-user"></i>
          <span>Khách • Xem trước miễn phí</span>
        </div>
        <div style="display: flex; gap: 0.35rem; margin-top: 0.45rem;">
          <button class="btn btn-sm btn-primary" style="flex: 1; padding: 0.35rem 0.2rem; font-size: 0.75rem;" onclick="openPinModal()">
            <i class="fa-solid fa-key"></i> Nhập PIN
          </button>
          <button class="btn btn-sm btn-outline" style="flex: 1; padding: 0.35rem 0.2rem; font-size: 0.75rem;" onclick="openAdminLoginModal()">
            <i class="fa-solid fa-lock"></i> Admin
          </button>
        </div>
      `;
    }

    // Chỉ hiện "Cấu Hình & Quản Trị" cho Admin
    var navSettings = document.getElementById('nav-settings');
    if (navSettings) {
      navSettings.style.display = session.role === 'admin' ? '' : 'none';
    }
  }

};

window.AuthService = AuthService;

function openPinModal() {
  var modal = document.getElementById("pin-modal");
  if (modal) {
    modal.classList.add("active", "show");
    var input = document.getElementById("input-pin-code");
    if (input) { input.value = ""; input.focus(); }
  }
}

function closePinModal() {
  var modal = document.getElementById("pin-modal");
  if (modal) modal.classList.remove("active", "show");
}

async function submitPinCode() {
  var input = document.getElementById("input-pin-code");
  var val = input ? input.value : "";
  var res = await AuthService.verifyPin(val);
  if (res.success) {
    closePinModal();
    showToast("Mở khóa quyền tải thành công!", "success");
    if (typeof refreshCurrentView === "function") refreshCurrentView();

    // TỰ ĐỘNG BẬT TẢI TỆP NGAY LẬP TỨC
    if (DriveService && DriveService.pendingFile) {
      var target = DriveService.pendingFile;
      DriveService.pendingFile = null;
      setTimeout(function() {
        DriveService.downloadFile(target);
      }, 350);
    }
  } else {
    var err = document.getElementById("pin-error-msg");
    if (err) { err.textContent = res.msg; err.style.display = "block"; }
  }
}

function openAdminLoginModal() {
  var modal = document.getElementById("admin-modal");
  if (modal) {
    modal.classList.add("active", "show");
    var input = document.getElementById("admin-password-input");
    if (input) { input.value = ""; input.focus(); }
  }
}

function closeAdminLoginModal() {
  var modal = document.getElementById("admin-modal");
  if (modal) modal.classList.remove("active", "show");
}

async function submitAdminLogin() {
  var input = document.getElementById("admin-password-input");
  var val = input ? input.value : "";
  var res = await AuthService.loginAdmin(val);
  if (res.success) {
    closeAdminLoginModal();
    showToast("Đăng nhập Quản trị thành công! Chào Thầy Lê Thành Long", "success");
    if (typeof refreshCurrentView === "function") refreshCurrentView();
  } else {
    var err = document.getElementById("admin-error-msg");
    if (err) { err.textContent = res.msg; err.style.display = "block"; }
  }
}

window.openPinModal = openPinModal;
window.closePinModal = closePinModal;
window.submitPinCode = submitPinCode;
window.openAdminLoginModal = openAdminLoginModal;
window.closeAdminLoginModal = closeAdminLoginModal;
window.submitAdminLogin = submitAdminLogin;
