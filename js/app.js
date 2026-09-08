/**
 * MAIN APPLICATION LOGIC & ROUTER (CHUẨN 100% 7 PHÂN HỆ MENU)
 * Hỗ trợ Khóa/Mở toàn bộ kho và Chế độ "Ẩn với khách" cho từng tài liệu
 * Thư viện Bài giảng & Kế hoạch bài dạy Tiểu học - Lê Thành Long
 */

var currentView = "home";
var selectedGrade = "all";
var selectedWeek = 1;
var selectedSubject = "all";
var currentExamData = null;

// ==========================================
// DỮ LIỆU SIDEBAR: KHỐI & MÔN HỌC
// ==========================================
var GRADE_COLORS = {
  1: { bg: '#0ea5e9', gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)', light: 'rgba(14,165,233,0.15)', text: '#fff' },
  2: { bg: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #059669)', light: 'rgba(16,185,129,0.15)', text: '#fff' },
  3: { bg: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', light: 'rgba(245,158,11,0.15)', text: '#fff' },
  4: { bg: '#a855f7', gradient: 'linear-gradient(135deg, #a855f7, #9333ea)', light: 'rgba(168,85,247,0.15)', text: '#fff' },
  5: { bg: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444, #dc2626)', light: 'rgba(239,68,68,0.15)', text: '#fff' }
};

var SIDEBAR_SUBJECTS = {
  1: [
    { id: 'TOAN',       name: 'Toán',        icon: 'fa-calculator',      color: '#3b82f6' },
    { id: 'TIENG_VIET', name: 'T. Việt',     icon: 'fa-book-open',       color: '#f97316' },
    { id: 'TIENG_ANH',  name: 'T. Anh',      icon: 'fa-globe',           color: '#0284c7' },
    { id: 'TNXH',       name: 'TNXH',        icon: 'fa-seedling',        color: '#16a34a' },
    { id: 'DAO_DUC',    name: 'Đạo đức',     icon: 'fa-heart',           color: '#db2777' },
    { id: 'HAT_NHAC',   name: 'Âm nhạc',     icon: 'fa-music',           color: '#9333ea' },
    { id: 'MI_THUAT',   name: 'Mĩ thuật',    icon: 'fa-palette',         color: '#06b6d4' },
    { id: 'GDTC',       name: 'GDTC',        icon: 'fa-volleyball',      color: '#65a30d' },
    { id: 'HDTN',       name: 'HĐTN',        icon: 'fa-compass',         color: '#f59e0b' },
    { id: 'KHAC',       name: 'Khác',        icon: 'fa-folder-plus',     color: '#64748b' }
  ],
  2: [
    { id: 'TOAN',       name: 'Toán',        icon: 'fa-calculator',      color: '#3b82f6' },
    { id: 'TIENG_VIET', name: 'T. Việt',     icon: 'fa-book-open',       color: '#f97316' },
    { id: 'TIENG_ANH',  name: 'T. Anh',      icon: 'fa-globe',           color: '#0284c7' },
    { id: 'TNXH',       name: 'TNXH',        icon: 'fa-seedling',        color: '#16a34a' },
    { id: 'DAO_DUC',    name: 'Đạo đức',     icon: 'fa-heart',           color: '#db2777' },
    { id: 'HAT_NHAC',   name: 'Âm nhạc',     icon: 'fa-music',           color: '#9333ea' },
    { id: 'MI_THUAT',   name: 'Mĩ thuật',    icon: 'fa-palette',         color: '#06b6d4' },
    { id: 'GDTC',       name: 'GDTC',        icon: 'fa-volleyball',      color: '#65a30d' },
    { id: 'HDTN',       name: 'HĐTN',        icon: 'fa-compass',         color: '#f59e0b' },
    { id: 'KHAC',       name: 'Khác',        icon: 'fa-folder-plus',     color: '#64748b' }
  ],
  3: [
    { id: 'TOAN',       name: 'Toán',        icon: 'fa-calculator',      color: '#3b82f6' },
    { id: 'TIENG_VIET', name: 'T. Việt',     icon: 'fa-book-open',       color: '#f97316' },
    { id: 'TIENG_ANH',  name: 'T. Anh',      icon: 'fa-globe',           color: '#0284c7' },
    { id: 'TNXH',       name: 'TNXH',        icon: 'fa-seedling',        color: '#16a34a' },
    { id: 'TIN_HOC',    name: 'Tin học',     icon: 'fa-laptop-code',     color: '#0d9488' },
    { id: 'CONG_NGHE',  name: 'C. Nghệ',    icon: 'fa-gears',           color: '#475569' },
    { id: 'DAO_DUC',    name: 'Đạo đức',     icon: 'fa-heart',           color: '#db2777' },
    { id: 'HDTN',       name: 'HĐTN',        icon: 'fa-compass',         color: '#f59e0b' },
    { id: 'KHAC',       name: 'Khác',        icon: 'fa-folder-plus',     color: '#64748b' }
  ],
  4: [
    { id: 'TOAN',          name: 'Toán',      icon: 'fa-calculator',      color: '#3b82f6' },
    { id: 'TIENG_VIET',    name: 'T. Việt',   icon: 'fa-book-open',       color: '#f97316' },
    { id: 'TIENG_ANH',     name: 'T. Anh',    icon: 'fa-globe',           color: '#0284c7' },
    { id: 'KHOA_HOC',      name: 'Khoa học',  icon: 'fa-flask-vial',      color: '#7c3aed' },
    { id: 'LICH_SU_DIA_LY',name: 'LS & ĐL',  icon: 'fa-map-location-dot',color: '#b45309' },
    { id: 'TIN_HOC',       name: 'Tin học',   icon: 'fa-laptop-code',     color: '#0d9488' },
    { id: 'CONG_NGHE',     name: 'C. Nghệ',  icon: 'fa-gears',           color: '#475569' },
    { id: 'DAO_DUC',       name: 'Đạo đức',   icon: 'fa-heart',           color: '#db2777' },
    { id: 'HDTN',          name: 'HĐTN',      icon: 'fa-compass',         color: '#f59e0b' },
    { id: 'KHAC',          name: 'Khác',      icon: 'fa-folder-plus',     color: '#64748b' }
  ],
  5: [
    { id: 'TOAN',          name: 'Toán',      icon: 'fa-calculator',      color: '#3b82f6' },
    { id: 'TIENG_VIET',    name: 'T. Việt',   icon: 'fa-book-open',       color: '#f97316' },
    { id: 'TIENG_ANH',     name: 'T. Anh',    icon: 'fa-globe',           color: '#0284c7' },
    { id: 'KHOA_HOC',      name: 'Khoa học',  icon: 'fa-flask-vial',      color: '#7c3aed' },
    { id: 'LICH_SU_DIA_LY',name: 'LS & ĐL',  icon: 'fa-map-location-dot',color: '#b45309' },
    { id: 'TIN_HOC',       name: 'Tin học',   icon: 'fa-laptop-code',     color: '#0d9488' },
    { id: 'CONG_NGHE',     name: 'C. Nghệ',  icon: 'fa-gears',           color: '#475569' },
    { id: 'DAO_DUC',       name: 'Đạo đức',   icon: 'fa-heart',           color: '#db2777' },
    { id: 'HDTN',          name: 'HĐTN',      icon: 'fa-compass',         color: '#f59e0b' },
    { id: 'KHAC',          name: 'Khác',      icon: 'fa-folder-plus',     color: '#64748b' }
  ]
};

var sidebarActiveGrade = 1;

// Khởi chạy khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", function() {
  AuthService.updateAuthUI();
  setupNavigationEvents();
  setupSearchEvents();
  renderSidebarDocsNav();

  // Xác định view ban đầu
  var hash = window.location.hash.replace("#", "") || "home";
  navigateTo(hash);

  // Cập nhật số liệu footer động
  updateFooterCount();

  window.addEventListener("hashchange", function() {
    var newHash = window.location.hash.replace("#", "") || "home";
    if (newHash !== currentView) {
      navigateTo(newHash);
    }
  });
});

// ==========================================
// SIDEBAR DOCS NAV – 3 CẤP (SECTION → KHỐI → MÔN/TUẦN)
// ==========================================
var SDOC_SECTIONS = [
  {
    id: 'sdoc-khbd',
    view: 'khbd',
    icon: 'fa-file-word',
    iconColor: 'var(--color-word)',
    label: 'Kế Hoạch Bài Dạy',
    level3: 'subjects'
  },
  {
    id: 'sdoc-pptx',
    view: 'pptx',
    icon: 'fa-file-powerpoint',
    iconColor: 'var(--color-powerpoint)',
    label: 'Bài Giảng Điện Tử',
    level3: 'weeks'
  }
];

var GRADE_DOT_COLORS = ['#0ea5e9','#10b981','#f59e0b','#a855f7','#ef4444'];

function renderSidebarDocsNav() {
  var container = document.getElementById('sidebar-docs-nav');
  if (!container) return;

  var html = SDOC_SECTIONS.map(function(sec) {
    var gradesHtml = [1,2,3,4,5].map(function(g) {
      var color = GRADE_DOT_COLORS[g-1];
      var level3Html = '';

      if (sec.level3 === 'subjects') {
        // Cấp 3: Môn học (dành cho KHBD)
        var subjects = SIDEBAR_SUBJECTS[g] || [];
        level3Html = subjects.map(function(s) {
          return '<li class="sdoc-subject-item"' +
            ' onclick="selectSubjectAndNavigateTo(' + g + ',\'' + s.id + '\',\'' + sec.view + '\')">' +
            '<i class="fa-solid ' + s.icon + '" style="color:' + s.color + ';"></i>' +
            '<span>' + s.name + '</span>' +
          '</li>';
        }).join('');
      } else {
        // Cấp 3: Tuần (dành cho Bài giảng PPTX)
        var weekColors = ['#38bdf8','#34d399','#fbbf24','#a78bfa','#f87171',
                          '#fb923c','#4ade80','#60a5fa','#e879f9','#2dd4bf'];
        for (var w = 1; w <= 35; w++) {
          var wc = weekColors[(w-1) % weekColors.length];
          level3Html += '<li class="sdoc-subject-item"' +
            ' onclick="selectWeekAndNavigateTo(' + g + ',' + w + ',\'' + sec.view + '\')">' +
            '<i class="fa-solid fa-calendar-week" style="color:' + wc + ';"></i>' +
            '<span>Tuần ' + w + '</span>' +
          '</li>';
        }
      }

      return '<div class="sdoc-grade" id="' + sec.id + '-g' + g + '">' +
        '<div class="sdoc-grade-header" onclick="toggleSidebarGrade(\'' + sec.id + '-g' + g + '\')">' +
          '<div class="sdoc-grade-title">' +
            '<span class="sdoc-grade-dot" style="background:' + color + ';">' + g + '</span>' +
            '<span class="sdoc-grade-label">Khối Lớp ' + g + '</span>' +
          '</div>' +
          '<i class="fa-solid fa-chevron-right sdoc-chevron"></i>' +
        '</div>' +
        '<ul class="sdoc-subjects">' + level3Html + '</ul>' +
      '</div>';
    }).join('');

    return '<div class="sdoc-section" id="' + sec.id + '">' +
      '<div class="sdoc-section-header" onclick="toggleSidebarSection(\'' + sec.id + '\')">' +
        '<div class="sdoc-section-title">' +
          '<i class="fa-solid ' + sec.icon + '" style="color:' + sec.iconColor + ';font-size:1rem;"></i>' +
          '<span>' + sec.label + '</span>' +
        '</div>' +
        '<i class="fa-solid fa-chevron-right sdoc-section-chevron"></i>' +
      '</div>' +
      '<div class="sdoc-grades-wrap">' + gradesHtml + '</div>' +
    '</div>';
  }).join('');

  container.innerHTML = html;
}

function toggleSidebarSection(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var isOpen = el.classList.contains('open');

  // Đóng tất cả section khác
  document.querySelectorAll('.sdoc-section.open').forEach(function(s) {
    if (s.id !== id) s.classList.remove('open');
  });

  el.classList.toggle('open', !isOpen);
}

function toggleSidebarGrade(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var isOpen = el.classList.contains('open');

  // Đóng các khối anh em trong cùng section
  var wrap = el.closest('.sdoc-grades-wrap');
  if (wrap) {
    wrap.querySelectorAll('.sdoc-grade.open').forEach(function(g) {
      if (g.id !== id) g.classList.remove('open');
    });
  }

  el.classList.toggle('open', !isOpen);
}

function selectSubjectAndNavigateTo(grade, subjectId, view) {
  selectedGrade = String(grade);
  selectedSubject = subjectId;
  navigateTo(view);
}

function selectWeekAndNavigateTo(grade, week, view) {
  selectedGrade = String(grade);
  selectedWeek = week;
  selectedSubject = 'all';
  navigateTo(view);
}



// Toast notification helper
function showToast(message, type) {
  if (!type) type = "info";
  var container = document.getElementById("toast-container");
  if (!container) return;

  var toast = document.createElement("div");
  toast.className = "toast toast-" + type;
  
  var icon = "fa-circle-info";
  if (type === "success") icon = "fa-circle-check";
  if (type === "error") icon = "fa-triangle-exclamation";

  toast.innerHTML = '<i class="fa-solid ' + icon + '"></i> <span>' + message + '</span>';
  container.appendChild(toast);

  setTimeout(function() {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(function() { toast.remove(); }, 300);
  }, 3500);
}

// Router điều hướng chính xác 100%
function navigateTo(viewName) {
  if (!viewName) viewName = "home";

  // Bảo vệ view Quản trị khi chưa đăng nhập Admin
  var session = AuthService.getSession();
  if (viewName === "settings" && session.role !== "admin") {
    showToast("Khu vực Cấu hình & Quản trị chỉ dành cho Quản trị viên!", "warning");
    viewName = "home";
  }

  currentView = viewName;

  // Cập nhật hash trên URL
  if (window.location.hash !== "#" + viewName) {
    window.location.hash = "#" + viewName;
  }

  // Cập nhật highlight active trên Sidebar
  document.querySelectorAll(".tree-menu .tree-item").forEach(function(item) {
    if (item.getAttribute("data-view") === currentView) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Cập nhật Breadcrumbs
  updateBreadcrumb();

  // Render trang con tương ứng
  renderCurrentView();

  // Cuộn lên đầu
  var mainViewport = document.getElementById("content-container");
  if (mainViewport) mainViewport.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Đóng sidebar trên mobile
  var sidebar = document.getElementById("app-sidebar");
  if (sidebar) sidebar.classList.remove("show");
}

function refreshCurrentView() {
  renderCurrentView();
}

// Điều hướng nhanh khi chọn môn học từ Cây danh mục Sidebar
function toggleGradeTree(grade) {
  var item = document.getElementById("grade-tree-" + grade);
  if (!item) return;
  var isCurrentlyOpen = item.classList.contains("open");

  // Đóng tất cả các khối khác trước (accordion exclusive)
  for (var i = 1; i <= 5; i++) {
    var other = document.getElementById("grade-tree-" + i);
    if (other) other.classList.remove("open");
  }

  // Toggle khối hiện tại
  if (!isCurrentlyOpen) {
    item.classList.add("open");
  }
}

function navigateToSubject(grade, subjectKey) {
  selectedGrade = grade;
  selectedSubject = subjectKey;
  updateTopGradeFilterUI();

  // Mở accordion của khối đó nếu chưa mở
  var item = document.getElementById("grade-tree-" + grade);
  if (item && !item.classList.contains("open")) {
    item.classList.add("open");
  }

  // Điều hướng tới View KHBD
  navigateTo("khbd");
  showToast("Đang hiển thị môn " + (SUBJECTS_CONFIG[subjectKey] ? SUBJECTS_CONFIG[subjectKey].name : subjectKey) + " - Khối " + grade, "info");
}


function updateBreadcrumb() {
  var container = document.getElementById("breadcrumbs-container");
  if (!container) return;

  var viewTitles = {
    home: '<li><a href="javascript:void(0)" onclick="navigateTo(\'home\')"><i class="fa-solid fa-house"></i> Trang Chủ</a></li>',
    pptx: '<li><a href="javascript:void(0)" onclick="navigateTo(\'home\')"><i class="fa-solid fa-house"></i> Trang Chủ</a></li> <li><i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i></li> <li class="active">Bài Giảng PPTX (35 Tuần)</li>',
    khbd: '<li><a href="javascript:void(0)" onclick="navigateTo(\'home\')"><i class="fa-solid fa-house"></i> Trang Chủ</a></li> <li><i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i></li> <li class="active">Kế Hoạch Bài Dạy (KHBD)</li>',
    weekly: '<li><a href="javascript:void(0)" onclick="navigateTo(\'home\')"><i class="fa-solid fa-house"></i> Trang Chủ</a></li> <li><i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i></li> <li class="active">Tổng Hợp Theo Tuần</li>',
    "ai-exam": '<li><a href="javascript:void(0)" onclick="navigateTo(\'home\')"><i class="fa-solid fa-house"></i> Trang Chủ</a></li> <li><i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i></li> <li class="active">Trợ Lý AI Ra Đề</li>',
    "ai-integration": '<li><a href="javascript:void(0)" onclick="navigateTo(\'home\')"><i class="fa-solid fa-house"></i> Trang Chủ</a></li> <li><i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i></li> <li class="active">AI Tích Hợp Giáo Án (CV 2345)</li>',
    toolkit: '<li><a href="javascript:void(0)" onclick="navigateTo(\'home\')"><i class="fa-solid fa-house"></i> Trang Chủ</a></li> <li><i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i></li> <li class="active">Tiện Ích Giảng Dạy</li>',
    settings: '<li><a href="javascript:void(0)" onclick="navigateTo(\'home\')"><i class="fa-solid fa-house"></i> Trang Chủ</a></li> <li><i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i></li> <li class="active">Cấu Hình & Quản Trị</li>',
    search: '<li><a href="javascript:void(0)" onclick="navigateTo(\'home\')"><i class="fa-solid fa-house"></i> Trang Chủ</a></li> <li><i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i></li> <li class="active">Kết Quả Tìm Kiếm</li>'
  };

  container.innerHTML = viewTitles[currentView] || viewTitles.home;
}

// Render View tương ứng
function renderCurrentView() {
  var container = document.getElementById("content-container");
  if (!container) return;

  switch (currentView) {
    case "home":
      renderHomeView(container);
      break;
    case "pptx":
      renderPptxView(container);
      break;
    case "khbd":
      renderKhbdView(container);
      break;
    case "weekly":
      renderWeeklyView(container);
      break;
    case "ai-exam":
      renderAiExamView(container);
      break;
    case "ai-integration":
      renderAiIntegrationView(container);
      break;
    case "toolkit":
      renderToolkitView(container);
      break;
    case "settings":
      renderSettingsView(container);
      break;
    case "search":
      renderSearchView(container);
      break;
    default:
      renderHomeView(container);
  }
}

// Thanh công cụ thao tác nhanh hàng loạt dành riêng cho Admin
function renderAdminBulkToolbarHtml() {
  var session = AuthService.getSession();
  if (session.role !== "admin") return "";

  return `
    <div style="background: linear-gradient(135deg, #f0fdf4, #eff6ff); border: 1px solid #93c5fd; border-radius: var(--radius-sm); padding: 0.75rem 1rem; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.65rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; font-weight: 700; color: #1e3a8a;">
        <i class="fa-solid fa-crown" style="color: #f59e0b;"></i>
        <span>Công cụ Quản trị viên (Thầy Long):</span>
      </div>
      <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
        <button class="btn btn-sm btn-outline" style="font-size: 0.72rem; padding: 0.25rem 0.6rem; background: #ffffff;" onclick="AuthService.setBulkPermission('pin')" title="Khóa toàn bộ kho, sau đó bấm ⚙️ mở từng bài">
          <i class="fa-solid fa-lock" style="color: #d97706;"></i> Khóa toàn bộ (Cần PIN)
        </button>
        <button class="btn btn-sm btn-outline" style="font-size: 0.72rem; padding: 0.25rem 0.6rem; background: #ffffff;" onclick="AuthService.setBulkPermission('free')" title="Mở toàn bộ kho, sau đó bấm ⚙️ khóa từng bài">
          <i class="fa-solid fa-unlock" style="color: #16a34a;"></i> Mở toàn bộ (Miễn phí)
        </button>
        <button class="btn btn-sm btn-outline" style="font-size: 0.72rem; padding: 0.25rem 0.6rem; background: #ffffff;" onclick="AuthService.setBulkPermission('hidden')" title="Ẩn toàn bộ kho với khách, sau đó bấm ⚙️ hiện từng bài">
          <i class="fa-solid fa-eye-slash" style="color: #dc2626;"></i> Ẩn toàn bộ với khách
        </button>
      </div>
    </div>
  `;
}

/* ==========================================================================
   VIEW 1: TRANG CHỦ (HOME DASHBOARD)
   ========================================================================== */
function renderHomeView(container) {
  var visibleFiles = (DATABASE.allFiles || []).filter(function(f) { return AuthService.isVisibleToFileList(f); });
  var totalKhbd = visibleFiles.filter(function(f) { return f.type === 'KHBD'; }).length;
  var totalPptx = visibleFiles.filter(function(f) { return f.type === 'PPTX'; }).length;
  var totalFiles = visibleFiles.length;

  container.innerHTML = `
    ${renderAdminBulkToolbarHtml()}

    <!-- Formal Hero Banner -->
    <div class="formal-hero-card">
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.85rem;">
        <div class="formal-hero-pill">
          <i class="fa-solid fa-award" style="color: #facc15;"></i> Chuẩn GDPT 2018
        </div>
        <div class="formal-hero-pill" style="background: rgba(34, 197, 94, 0.25); border-color: rgba(74, 222, 128, 0.6); color: #86efac;">
          <i class="fa-solid fa-gift" style="color: #4ade80;"></i> MỞ KHÓA MIỄN PHÍ TUẦN 1 - 8 (Tải không cần PIN)
        </div>
      </div>
      <h1 class="formal-hero-title">Thư Viện Bài Giảng & Kế Hoạch Bài Dạy Tiểu Học</h1>
      <p class="formal-hero-desc">
        Hệ thống học liệu số giáo viên Tiểu học chuẩn chương trình GDPT 2018. Mở khóa tải <strong>Hoàn Toàn Miễn Phí Tuần 1 đến Tuần 8</strong> (cả Bài giảng PPTX & Kế hoạch bài dạy) cho tất cả giáo viên toàn quốc!
      </p>
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="navigateTo('pptx')" style="background: #ffffff; color: var(--primary); box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <i class="fa-solid fa-file-powerpoint" style="color: var(--color-powerpoint);"></i> Duyệt Bài Giảng PPTX
        </button>
        <button class="btn btn-outline" style="color: #ffffff; border-color: rgba(255,255,255,0.4);" onclick="navigateTo('khbd')">
          <i class="fa-solid fa-file-word" style="color: #38bdf8;"></i> Kế Hoạch Bài Dạy (${totalKhbd} tệp)
        </button>
        <button class="btn btn-outline" style="color: #ffffff; border-color: rgba(255,255,255,0.4);" onclick="navigateTo('weekly')">
          <i class="fa-solid fa-table-columns" style="color: #fb923c;"></i> Xem Theo Tuần Học
        </button>
        <button class="btn btn-ai-header" onclick="navigateTo('ai-integration')" style="background: linear-gradient(135deg, #db2777, #ec4899); border: none; box-shadow: 0 4px 12px rgba(219, 39, 119, 0.35);">
          <i class="fa-solid fa-layer-group"></i> AI Tích Hợp Giáo Án
          <span style="background: #ef4444; color: white; font-size: 0.62rem; padding: 2px 6px; border-radius: 9999px; margin-left: 4px; font-weight: 800;">MỚI</span>
        </button>
        <button class="btn btn-ai-header" onclick="navigateTo('ai-integration')" style="background: linear-gradient(135deg, #db2777, #ec4899); border: none; box-shadow: 0 4px 12px rgba(219, 39, 119, 0.35);">
          <i class="fa-solid fa-layer-group"></i> AI Tích Hợp Giáo Án
          <span style="background: #ef4444; color: white; font-size: 0.62rem; padding: 2px 6px; border-radius: 9999px; margin-left: 4px; font-weight: 800;">MỚI</span>
        </button>
        <button class="btn btn-ai-header" onclick="navigateTo('ai-exam')">
          <i class="fa-solid fa-wand-magic-sparkles"></i> Trợ Lý AI Ra Đề
        </button>
      </div>
    </div>


    <!-- Quick Stats -->
    <div class="stats-row">
      <div class="stat-box" onclick="navigateTo('pptx')" style="cursor: pointer;">
        <div class="stat-icon-wrap" style="background-color: #eff6ff; color: #2563eb;">
          <i class="fa-solid fa-file-powerpoint"></i>
        </div>
        <div class="stat-data">
          <h4>${totalPptx} Bài Giảng</h4>
          <p>PowerPoint Tuần 1 - 35</p>
        </div>
      </div>
      <div class="stat-box" onclick="navigateTo('khbd')" style="cursor: pointer;">
        <div class="stat-icon-wrap" style="background-color: #ecfdf5; color: #059669;">
          <i class="fa-solid fa-file-word"></i>
        </div>
        <div class="stat-data">
          <h4>${totalKhbd} Kế Hoạch</h4>
          <p>Giáo Án Word 5 Khối Lớp</p>
        </div>
      </div>
      <div class="stat-box" onclick="navigateTo('weekly')" style="cursor: pointer;">
        <div class="stat-icon-wrap" style="background-color: #fff7ed; color: #ea580c;">
          <i class="fa-solid fa-table-columns"></i>
        </div>
        <div class="stat-data">
          <h4>Tổng Hợp 35 Tuần</h4>
          <p>Xem Song Song Word & PPTX</p>
        </div>
      </div>
      <div class="stat-box" style="cursor: pointer;" title="Số lượt giáo viên truy cập và tra cứu học liệu">
        <div class="stat-icon-wrap" style="background-color: #fdf2f8; color: #db2777;">
          <i class="fa-solid fa-chart-line"></i>
        </div>
        <div class="stat-data">
          <h4>${(typeof StatsService !== "undefined" ? StatsService.getVisitCount() : 15680).toLocaleString('vi-VN')} Lượt</h4>
          <p>Lượt Truy Cập Website</p>
        </div>
      </div>
    </div>

    <!-- 5 Grade Quick Selection Cards -->
    <div class="section-header">
      <div>
        <h2 class="section-title"><i class="fa-solid fa-shapes"></i> Danh Mục Theo Khối Lớp</h2>
        <p class="section-subtitle">Chọn khối lớp để xem ngay bài giảng PPTX và giáo án Word</p>
      </div>
    </div>

    <div class="grades-deck">
      ${GRADES_CONFIG.map(function(g) {
        return `
          <div class="grade-banner-card" onclick="selectGradeAndNavigate(${g.grade})">
            <div class="grade-badge-circle" style="background-color: ${g.color};">
              ${g.grade}
            </div>
            <h3>${g.name}</h3>
            <p>Trọn bộ KHBD Word tất cả các môn & Bài giảng PowerPoint</p>
            <div style="margin-top: 0.75rem;">
              <span class="btn btn-sm btn-outline">Truy cập Khối ${g.grade} <i class="fa-solid fa-arrow-right"></i></span>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Real Files Showcase -->
    <div class="section-header" style="margin-top: 2rem;">
      <div>
        <h2 class="section-title"><i class="fa-solid fa-clock-rotate-left" style="color: #38bdf8;"></i> Tài Liệu Trực Tiếp Từ Google Drive</h2>
        <p class="section-subtitle">Xem trước trực tuyến và tải về theo phân quyền</p>
      </div>
      ${renderViewToggleHtml()}
    </div>

    ${renderFilesHtml(visibleFiles.slice(0, 8))}
  `;
}

function selectGradeAndNavigate(grade) {
  selectedGrade = grade;
  updateTopGradeFilterUI();
  navigateTo("khbd");
}

/* ==========================================================================
   VIEW 2: KHO BÀI GIẢNG PPTX (35 TUẦN)
   ========================================================================== */
function renderPptxView(container) {
  var allWeekFiles = (DATABASE.pptxList || []).filter(function(item) {
    return AuthService.isVisibleToFileList(item);
  });

  if (selectedGrade !== "all") {
    allWeekFiles = allWeekFiles.filter(function(item) { return item.grade === parseInt(selectedGrade); });
  }

  allWeekFiles = allWeekFiles.filter(function(item) {
    return item.week === selectedWeek || (item.weeks && item.weeks.includes(selectedWeek));
  });

  var filtered = allWeekFiles;
  if (selectedSubject !== "all") {
    filtered = filtered.filter(function(item) { return item.subjectId === selectedSubject; });
  }

  // Lấy danh sách môn học phù hợp theo Khối lớp hiện tại
  var currentG = parseInt(selectedGrade) || 1;
  var availableSubjects = SIDEBAR_SUBJECTS[currentG] || SIDEBAR_SUBJECTS[1];

  var subjectChipsHtml = '<button class="subject-chip ' + (selectedSubject === 'all' ? 'active' : '') + '" onclick="selectSubjectFilter(\'all\')">' +
    'Tất cả môn (' + allWeekFiles.length + ')' +
    '</button>';

  availableSubjects.forEach(function(subj) {
    var count = allWeekFiles.filter(function(f) { return f.subjectId === subj.id; }).length;
    if (count > 0 || ['TOAN', 'TIENG_VIET', 'TNXH', 'KHOA_HOC', 'LICH_SU_DIA_LY', 'DAO_DUC', 'HDTN', 'CONG_NGHE'].includes(subj.id)) {
      subjectChipsHtml += '<button class="subject-chip ' + (selectedSubject === subj.id ? 'active' : '') + '" onclick="selectSubjectFilter(\'' + subj.id + '\')">' +
        '<i class="fa-solid ' + (subj.icon || 'fa-book') + '" style="color: ' + (subj.color || '#2563eb') + ';"></i> ' +
        subj.name + (count > 0 ? ' (' + count + ')' : '') +
        '</button>';
    }
  });

  container.innerHTML = `
    ${renderAdminBulkToolbarHtml()}

    <div class="section-header">
      <div>
        <h2 class="section-title">
          <i class="fa-solid fa-file-powerpoint" style="color: var(--color-powerpoint);"></i> 
          Kho Bài Giảng Điện Tử PowerPoint (PPTX)
        </h2>
        <p class="section-subtitle">
          ${selectedGrade === "all" ? "Tất cả các khối" : ("Khối " + selectedGrade)} • Tuần ${selectedWeek} • Chuẩn Chương trình GDPT 2018
        </p>
      </div>
      <div style="display:flex; align-items:center; gap:0.65rem;">
        ${renderViewToggleHtml()}
        <button class="btn btn-outline" onclick="navigateTo('weekly')">
          <i class="fa-solid fa-table-columns"></i> Chế độ xem theo tuần
        </button>
      </div>
    </div>

    <!-- 35 Weeks Strip -->
    <div class="week-strip-box">
      <div style="font-size: 0.78rem; font-weight: 700; color: var(--primary); margin-bottom: 0.45rem;">
        CHỌN TUẦN HỌC (TỪ TUẦN 1 ĐẾN TUẦN 35):
      </div>
      <div class="week-pills-flow">
        ${Array.from({ length: 35 }, function(_, i) { return i + 1; }).map(function(w) {
          return `
            <button class="week-pill-chip ${w === selectedWeek ? 'active' : ''}" onclick="selectWeekFilter(${w})">
              Tuần ${w} ${w === 1 ? '🟢' : ''}
            </button>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Subject Chips -->
    <div class="subject-chips-wrap">
      ${subjectChipsHtml}
    </div>

    <!-- Cards / List -->
    ${filtered.length > 0 ? renderFilesHtml(filtered) : `
      <div style="text-align: center; padding: 3rem; background: #ffffff; border-radius: 10px; border: 1px solid var(--border-color);">
        <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; color: var(--text-light); margin-bottom: 0.75rem;"></i>
        <h3>Chưa có bài giảng PPTX hiển thị trong tuần ${selectedWeek}</h3>
        <p style="color: var(--text-muted);">Hãy chọn tuần khác hoặc đăng nhập quyền Admin nếu tài liệu đang ở chế độ Ẩn với khách.</p>
      </div>
    `}
  `;
}

function selectWeekFilter(w) {
  selectedWeek = w;
  renderCurrentView();
}

function selectSubjectFilter(sKey) {
  selectedSubject = sKey;
  renderCurrentView();
}

/* ==========================================================================
   VIEW 3: KHO KẾ HOẠCH BÀI DẠY (KHBD)
   ========================================================================== */
function renderKhbdView(container) {
  var filtered = (DATABASE.khbdList || []).filter(function(item) {
    return AuthService.isVisibleToFileList(item);
  });

  if (selectedGrade !== "all") {
    filtered = filtered.filter(function(item) { return item.grade === parseInt(selectedGrade); });
  }

  if (selectedSubject !== "all") {
    if (selectedSubject === "KHAC") {
      var knownSubjects = ['TOAN', 'TIENG_VIET', 'TIENG_ANH', 'TNXH', 'KHOA_HOC', 'LICH_SU_DIA_LY', 'TIN_HOC', 'CONG_NGHE', 'DAO_DUC', 'HAT_NHAC', 'MI_THUAT', 'GDTC', 'HDTN'];
      filtered = filtered.filter(function(item) {
        return item.subjectId === 'KHAC' || !item.subjectId || !knownSubjects.includes(item.subjectId);
      });
    } else {
      filtered = filtered.filter(function(item) { return item.subjectId === selectedSubject; });
    }
  }

  container.innerHTML = `
    ${renderAdminBulkToolbarHtml()}

    <div class="section-header">
      <div>
        <h2 class="section-title">
          <i class="fa-solid fa-file-word" style="color: var(--color-word);"></i>
          Kế Hoạch Bài Dạy (KHBD - Giáo Án Word)
        </h2>
        <p class="section-subtitle">
          ${selectedGrade === "all" ? "Tất cả các khối (" + filtered.length + " giáo án)" : ("Khối " + selectedGrade + " (" + filtered.length + " giáo án)")} • Soạn chuẩn Công văn 2345/BGDĐT
        </p>
      </div>
      <div style="display:flex; align-items:center; gap:0.65rem;">
        ${renderViewToggleHtml()}
        <button class="btn btn-outline" onclick="navigateTo('weekly')">
          <i class="fa-solid fa-table-columns"></i> Xem song song
        </button>
      </div>
    </div>


    <!-- Cards / List -->
    ${filtered.length > 0 ? renderFilesHtml(filtered) : `
      <div style="text-align:center; padding:3rem; background:#ffffff; border-radius:10px; border:1px solid var(--border-color);">
        <i class="fa-solid fa-folder-open" style="font-size:2.5rem; color:var(--text-light); margin-bottom:0.75rem;"></i>
        <h3>Không tìm thấy giáo án phù hợp</h3>
        <p style="color:var(--text-muted);">Thử chọn khối khác hoặc môn học khác.</p>
      </div>
    `}
  `;
}


/* ==========================================================================
   VIEW 4: BẢNG TỔNG HỢP THEO TUẦN (MATRIX TRA CỨU TRỌN GÓI)
   ========================================================================== */
function renderWeeklyView(container) {
  var currentGradeNum = selectedGrade === "all" ? 5 : parseInt(selectedGrade);
  
  var khbdList = (DATABASE.khbdList || []).filter(function(f) {
    var matchWeek = f.week === selectedWeek || (f.weeks && f.weeks.includes(selectedWeek));
    return f.grade === currentGradeNum && AuthService.isVisibleToFileList(f) && matchWeek;
  });

  var pptxList = (DATABASE.pptxList || []).filter(function(f) {
    var matchWeek = f.week === selectedWeek || (f.weeks && f.weeks.includes(selectedWeek));
    return f.grade === currentGradeNum && AuthService.isVisibleToFileList(f) && matchWeek;
  });

  container.innerHTML = `
    ${renderAdminBulkToolbarHtml()}

    <div class="section-header">
      <div>
        <h2 class="section-title">
          <i class="fa-solid fa-table-columns" style="color: #38bdf8;"></i> 
          Bảng Tra Cứu Trọn Gói Khối ${currentGradeNum} - Tuần ${selectedWeek}
        </h2>
        <p class="section-subtitle">
          Hiển thị song song Kế hoạch bài dạy (Word) & Bài giảng điện tử (PPTX) cho giáo viên
        </p>
      </div>
    </div>

    <!-- Week Strip -->
    <div class="week-strip-box">
      <div class="week-pills-flow">
        ${Array.from({ length: 35 }, function(_, i) { return i + 1; }).map(function(w) {
          return `
            <button class="week-pill-chip ${w === selectedWeek ? 'active' : ''}" onclick="selectWeekFilter(${w})">
              Tuần ${w}
            </button>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Matrix Table -->
    <div class="matrix-card-wrap">
      <table class="formal-matrix-table">
        <thead>
          <tr>
            <th style="width: 22%;">Môn Học</th>
            <th style="width: 38%;">Kế Hoạch Bài Dạy (Word)</th>
            <th style="width: 40%;">Bài Giảng Điện Tử (PPTX)</th>
          </tr>
        </thead>
        <tbody>
          ${Object.keys(SUBJECTS_CONFIG).map(function(sKey) {
            var sub = SUBJECTS_CONFIG[sKey];
            var kFiles = khbdList.filter(function(f) { return f.subjectId === sKey; });
            var pFiles = pptxList.filter(function(f) { return f.subjectId === sKey; });

            if (kFiles.length === 0 && pFiles.length === 0) return "";

            return `
              <tr>
                <td>
                  <div style="display: flex; align-items: center; gap: 0.65rem;">
                    <div style="width: 34px; height: 34px; border-radius: var(--radius-sm); background-color: ${sub.bgColor}; color: ${sub.color}; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;">
                      <i class="fa-solid ${sub.icon}"></i>
                    </div>
                    <div>
                      <strong style="font-size: 0.9rem;">${sub.name}</strong>
                      <div style="font-size: 0.72rem; color: var(--text-muted);">Khối ${currentGradeNum} • Tuần ${selectedWeek}</div>
                    </div>
                  </div>
                </td>
                <td style="vertical-align: top;">
                  ${kFiles.length > 0 ? `
                    <div style="display: flex; flex-direction: column; gap: 0.45rem;">
                      ${kFiles.map(function(kFile) {
                        return `
                          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.4rem 0.65rem;">
                            <span style="font-size: 0.8rem; font-weight: 500; color: #1e293b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 220px;" title="${kFile.name}">
                              <i class="fa-solid fa-file-word" style="color: var(--color-word); margin-right: 4px;"></i> ${kFile.name}
                            </span>
                            <div style="display: flex; gap: 0.35rem; flex-shrink: 0;">
                              <button class="btn btn-sm btn-outline" style="padding: 0.2rem 0.45rem; font-size: 0.75rem;" onclick="handleFileViewer('${kFile.id}')" title="Xem trước tài liệu">
                                <i class="fa-solid fa-eye"></i>
                              </button>
                              <button class="btn btn-sm btn-primary" style="padding: 0.2rem 0.6rem; font-size: 0.75rem;" onclick="handleFileDownload('${kFile.id}')" title="Tải file Word">
                                <i class="fa-solid fa-download"></i> Tải
                              </button>
                            </div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  ` : `<span style="color: var(--text-light); font-style: italic;">Chưa có tệp</span>`}
                </td>
                <td style="vertical-align: top;">
                  ${pFiles.length > 0 ? `
                    <div style="display: flex; flex-direction: column; gap: 0.45rem;">
                      ${pFiles.map(function(pFile) {
                        return `
                          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; background: #fff7ed; border: 1px solid #ffedd5; border-radius: 6px; padding: 0.4rem 0.65rem;">
                            <span style="font-size: 0.8rem; font-weight: 500; color: #9a3412; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 220px;" title="${pFile.name}">
                              <i class="fa-solid fa-file-powerpoint" style="color: var(--color-powerpoint); margin-right: 4px;"></i> ${pFile.name}
                            </span>
                            <div style="display: flex; gap: 0.35rem; flex-shrink: 0;">
                              <button class="btn btn-sm btn-outline" style="padding: 0.2rem 0.45rem; font-size: 0.75rem;" onclick="handleFileViewer('${pFile.id}')" title="Xem trước slide">
                                <i class="fa-solid fa-eye"></i>
                              </button>
                              <button class="btn btn-sm btn-primary" style="padding: 0.2rem 0.6rem; font-size: 0.75rem; background: #ea580c; border-color: #ea580c;" onclick="handleFileDownload('${pFile.id}')" title="Tải PowerPoint">
                                <i class="fa-solid fa-download"></i> Tải PPTX
                              </button>
                            </div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  ` : `<span style="color: var(--text-light); font-style: italic;">Chưa có slide</span>`}
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

/* ==========================================================================
   VIEW 5: TRỢ LÝ AI SOẠN ĐỀ KIỂM TRA (CHƯƠNG TRÌNH GDPT 2018 - SGK KẾT NỐI TRI THỨC)
   Chuẩn mẫu thực tế: Ma trận phân tầng 3 Mức • Đề kiểm tra 3 ô đánh giá • Barem chấm
   ========================================================================== */

var currentExamData = null;
var currentExamActiveTab = "exam"; // "exam" | "matrix" | "answers" | "reading" | "writing" | "rubric"

function getSubjectsForGrade(grade) {
  var g = parseInt(grade) || 5;
  var all = AIService.EXAM_SUBJECTS;
  var list = [];
  for (var key in all) {
    if (all[key].grades.indexOf(g) !== -1) {
      list.push(all[key]);
    }
  }
  return list;
}

function renderAiExamView(container) {
  var currentGradeNum = selectedGrade === "all" ? 5 : parseInt(selectedGrade);
  var apiKey = localStorage.getItem("tvth_gemini_api_key") || (window.CONFIG && window.CONFIG.DEFAULT_GEMINI_API_KEY) || "";
  var availableSubjects = getSubjectsForGrade(currentGradeNum);
  var defaultSubject = availableSubjects[0]?.id || "TOAN";

  container.innerHTML = `
    <div class="section-header">
      <div>
        <h2 class="section-title">
          <i class="fa-solid fa-wand-magic-sparkles" style="color: #a855f7;"></i> 
          Trợ Lý AI Soạn Đề Kiểm Tra & Ma Trận Chuẩn Sư Phạm
        </h2>
        <p class="section-subtitle">
          Bộ sách <strong>Kết nối tri thức với cuộc sống</strong> • Thông tư 27/2020/TT-BGDĐT • Ma trận 3 Mức độ • Phiếu kiểm tra & Barem chấm
        </p>
      </div>
      <div>
        <button class="btn btn-sm ${apiKey ? 'btn-outline' : 'btn-primary'}" style="${apiKey ? 'border-color: #16a34a; color: #16a34a;' : 'background: linear-gradient(135deg, #7c3aed, #a855f7);'}" onclick="openGeminiApiKeyModal()">
          <i class="fa-solid ${apiKey ? 'fa-key' : 'fa-wand-magic-sparkles'}"></i> 
          ${apiKey ? 'Gemini AI: Đã kết nối' : 'Cấu hình Gemini API Key'}
        </button>
      </div>
    </div>

    <div class="ai-layout-container">
      <!-- CỘT ĐIỀU KHIỂN BÊN TRÁI (FORM THU THẬP THÔNG SỐ) -->
      <div class="ai-ctrl-box" style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; box-shadow: var(--shadow-sm);">
        
        <div style="font-size: 0.76rem; font-weight: 800; color: #7c3aed; background: #f5f3ff; border: 1px solid #ddd6fe; padding: 0.3rem 0.75rem; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <span><i class="fa-solid fa-book-open"></i> SGK KẾT NỐI TRI THỨC 2026</span>
          <span style="color: #16a34a;"><i class="fa-solid fa-circle-check"></i> Chuẩn TT 27</span>
        </div>

        <!-- 1. KHỐI LỚP & MÔN THI -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem;">
          <div class="form-group">
            <label for="aiGradeSelect" style="font-weight: 700; font-size: 0.82rem;">1. Khối Lớp:</label>
            <select id="aiGradeSelect" class="form-select" onchange="onExamGradeChange(this.value)">
              <option value="1" ${currentGradeNum === 1 ? 'selected' : ''}>Khối 1</option>
              <option value="2" ${currentGradeNum === 2 ? 'selected' : ''}>Khối 2</option>
              <option value="3" ${currentGradeNum === 3 ? 'selected' : ''}>Khối 3</option>
              <option value="4" ${currentGradeNum === 4 ? 'selected' : ''}>Khối 4</option>
              <option value="5" ${currentGradeNum === 5 ? 'selected' : ''}>Khối 5</option>
            </select>
          </div>

          <div class="form-group">
            <label for="aiSubjectSelect" style="font-weight: 700; font-size: 0.82rem;">2. Môn Thi:</label>
            <select id="aiSubjectSelect" class="form-select" onchange="onExamSubjectChange(this.value)">
              ${availableSubjects.map(function(s) {
                return `<option value="${s.id}">${s.name}</option>`;
              }).join('')}
            </select>
          </div>
        </div>

        <!-- 2. PHẠM VI RA ĐỀ -->
        <div class="form-group" style="margin-top: 0.35rem;">
          <label for="aiScopePreset" style="font-weight: 700; font-size: 0.82rem;">3. Phạm Vi Đề Kiểm Tra:</label>
          <select id="aiScopePreset" class="form-select" onchange="onExamScopePresetChange(this.value)">
            <option value="Kiểm tra Định kỳ Cuối Học Kỳ I (Tuần 1 - 18)" selected>Cuối Học Kỳ I (Tuần 1 - 18)</option>
            <option value="Kiểm tra Định kỳ Giữa Học Kỳ I (Tuần 1 - 9)">Giữa Học Kỳ I (Tuần 1 - 9)</option>
            <option value="Kiểm tra Định kỳ Giữa Học Kỳ II (Tuần 19 - 27)">Giữa Học Kỳ II (Tuần 19 - 27)</option>
            <option value="Kiểm tra Định kỳ Cuối Năm / Cả Năm (Tuần 1 - 35)">Cuối Năm / Cả Năm (Tuần 1 - 35)</option>
            <option value="Theo Tuần ${selectedWeek}">Theo Tuần ${selectedWeek}</option>
            <option value="custom">✏️ Tự gõ tên bài học SGK Kết nối tri thức...</option>
          </select>
          <input type="text" id="aiCustomScopeInput" class="form-control" placeholder="Ví dụ: Bài 15 Luyện tập chung - Phép nhân và phép chia..." style="margin-top: 0.4rem; display: none;">
        </div>

        <!-- ========================================================= -->
        <!-- FORM ĐẶC THÙ CHO MÔN TIẾNG VIỆT (CHUẨN 2 PHIẾU ĐỌC & VIẾT) -->
        <!-- ========================================================= -->
        <div id="tvConfigBox" style="display: none; background: #fdf4ff; border: 1px solid #e879f9; border-radius: var(--radius-sm); padding: 0.75rem; margin-top: 0.65rem;">
          
          <div style="font-weight: 800; font-size: 0.82rem; color: #86198f; margin-bottom: 0.45rem; display: flex; align-items: center; gap: 0.35rem;">
            <i class="fa-solid fa-book-open-reader"></i> I. PHẦN KIỂM TRA ĐỌC (10,0 điểm)
          </div>

          <div style="display: grid; grid-template-columns: 1fr; gap: 0.45rem; margin-bottom: 0.6rem; background: #fff; padding: 0.5rem; border-radius: 4px; border: 1px solid #f0abfc;">
            <div class="form-group" style="margin-bottom: 0;">
              <label for="tvOralScoreSelect" style="font-weight: 700; font-size: 0.78rem; color: #581c87;">• Điểm Đọc thành tiếng:</label>
              <select id="tvOralScoreSelect" class="form-select" style="font-size: 0.8rem;" onchange="onTvOralScoreChange(this.value)">
                <option value="4" selected>4,0 điểm (Đọc hiểu & LTVC: 6,0 điểm - Chuẩn TT27)</option>
                <option value="3">3,0 điểm (Đọc hiểu & LTVC: 7,0 điểm)</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label for="tvOralModeSelect" style="font-weight: 700; font-size: 0.78rem; color: #581c87;">• Chế độ Đọc thành tiếng:</label>
              <select id="tvOralModeSelect" class="form-select" style="font-size: 0.8rem;">
                <option value="sgk" selected>📚 5 bài trong SGK KNTT (Bốc thăm, chỉ in Tên bài + Trang SGK)</option>
                <option value="custom">📄 1 bài đọc ngoài SGK tương tự (In toàn văn bài đọc vào đề)</option>
              </select>
              <p style="font-size: 0.71rem; color: #7e22ce; margin: 0.25rem 0 0 0; line-height: 1.3;">
                <i class="fa-solid fa-circle-info"></i> <i>Câu hỏi & Gợi ý trả lời sẽ được in trong <b>Hướng Dẫn Chấm</b> để giáo viên hỏi học sinh.</i>
              </p>
            </div>
          </div>

          <div style="font-weight: 800; font-size: 0.82rem; color: #86198f; margin-bottom: 0.45rem; display: flex; align-items: center; gap: 0.35rem;">
            <i class="fa-solid fa-pen-nib"></i> II. PHẦN KIỂM TRA VIẾT (10,0 điểm)
          </div>

          <!-- Dành cho Lớp 1, 2, 3 -->
          <div id="tvWritingGrade123Box" style="background: #fff; padding: 0.5rem; border-radius: 4px; border: 1px solid #f0abfc;">
            <label for="tvWritingRatioSelect" style="font-weight: 700; font-size: 0.78rem; color: #581c87;">• Phân chia điểm Chính tả & Tập làm văn:</label>
            <select id="tvWritingRatioSelect" class="form-select" style="font-size: 0.8rem;">
              <option value="4-6" selected>Chính tả (Nghe-viết): 4,0đ — Viết đoạn văn: 6,0đ (Chuẩn TT27)</option>
              <option value="3-7">Chính tả (Nghe-viết): 3,0đ — Viết đoạn văn: 7,0đ</option>
              <option value="5-5">Chính tả (Nghe-viết): 5,0đ — Viết đoạn văn: 5,0đ</option>
            </select>
          </div>

          <!-- Dành cho Lớp 4, 5 -->
          <div id="tvWritingGrade45Box" style="display: none; background: #fff; padding: 0.5rem; border-radius: 4px; border: 1px solid #f0abfc;">
            <div style="font-size: 0.78rem; font-weight: 700; color: #1e40af; margin-bottom: 0.35rem;">
              <i class="fa-solid fa-circle-check"></i> Tập làm văn: 10,0 điểm (Bài văn hoàn chỉnh)
            </div>
            <label for="tvEssayGenreSelect" style="font-weight: 700; font-size: 0.78rem; color: #581c87;">• Thể loại Tập làm văn:</label>
            <select id="tvEssayGenreSelect" class="form-select" style="font-size: 0.8rem;">
              <option value="Văn miêu tả cây cối" selected>Văn miêu tả cây cối (cây bóng mát, cây hoa, cây ăn quả)</option>
              <option value="Văn miêu tả con vật">Văn miêu tả con vật nuôi yêu thích</option>
              <option value="Văn miêu tả cảnh vật">Văn miêu tả cảnh đẹp thiên nhiên / quê hương</option>
              <option value="Văn miêu tả người">Văn miêu tả người thân / thầy cô giáo</option>
              <option value="Văn kể chuyện">Văn kể lại câu chuyện đã học / đã nghe</option>
              <option value="Viết đoạn văn nêu tình cảm cảm xúc">Viết đoạn văn nêu tình cảm, cảm xúc</option>
            </select>
            <p style="font-size: 0.71rem; color: #1e40af; margin: 0.3rem 0 0 0;">
              <i class="fa-solid fa-award"></i> Tự động tạo Barem chấm 10 điểm chi tiết trong Hướng Dẫn Chấm.
            </p>
          </div>

        </div>

        <!-- ========================================================= -->
        <!-- FORM CHUẨN CHO CÁC MÔN TOÁN, KHOA HỌC, XÃ HỘI, TIN HỌC... -->
        <!-- ========================================================= -->
        <div id="standardConfigBox" style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.75rem; margin-top: 0.65rem;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; margin-bottom: 0.5rem;">
            <div class="form-group" style="margin-bottom: 0;">
              <label for="aiMcqCount" style="font-weight: 700; font-size: 0.8rem;">4. Số câu Trắc nghiệm:</label>
              <input type="number" id="aiMcqCount" min="0" max="30" value="8" class="form-control" style="font-weight: 700; text-align: center;">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label for="aiEssayCount" style="font-weight: 700; font-size: 0.8rem;">5. Số câu Tự luận:</label>
              <input type="number" id="aiEssayCount" min="0" max="10" value="2" class="form-control" style="font-weight: 700; text-align: center;">
            </div>
          </div>

          <!-- ĐỊNH HƯỚNG NỘI DUNG TỰ LUẬN -->
          <div class="form-group" style="margin-bottom: 0.5rem;">
            <label for="aiEssayGuide" style="font-weight: 700; font-size: 0.8rem;">6. Định hướng nội dung Tự luận (Gợi ý cho AI):</label>
            <textarea id="aiEssayGuide" class="form-control" rows="2" placeholder="Ví dụ: Bài 1 đặt tính rồi tính (4 phép tính), Bài 2 giải toán có lời văn 2 bước tính, Bài 3 tính bằng cách thuận tiện..." style="font-size: 0.8rem;"></textarea>
          </div>

          <!-- TỈ LỆ % ĐIỂM TRẮC NGHIỆM / TỰ LUẬN -->
          <div class="form-group" style="margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.8rem; margin-bottom: 0.25rem;">
              <span>Trắc nghiệm: <b id="aiMcqPctLabel" style="color: #7c3aed;">70%</b> (<span id="aiMcqScoreLabel">7,0</span>đ)</span>
              <span>Tự luận: <b id="aiEssayPctLabel" style="color: #2563eb;">30%</b> (<span id="aiEssayScoreLabel">3,0</span>đ)</span>
            </div>
            <input type="range" id="aiScoreRatioSlider" min="0" max="100" step="10" value="70" class="form-range" oninput="onExamScoreRatioChange(this.value)" style="width: 100%; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; gap: 0.25rem; margin-top: 0.35rem;">
              <button type="button" class="btn btn-sm btn-outline" style="padding: 0.15rem 0.4rem; font-size: 0.72rem;" onclick="setExamScoreRatio(70)">70% - 30%</button>
              <button type="button" class="btn btn-sm btn-outline" style="padding: 0.15rem 0.4rem; font-size: 0.72rem;" onclick="setExamScoreRatio(80)">80% - 20%</button>
              <button type="button" class="btn btn-sm btn-outline" style="padding: 0.15rem 0.4rem; font-size: 0.72rem;" onclick="setExamScoreRatio(60)">60% - 40%</button>
              <button type="button" class="btn btn-sm btn-outline" style="padding: 0.15rem 0.4rem; font-size: 0.72rem;" onclick="setExamScoreRatio(50)">50% - 50%</button>
              <button type="button" class="btn btn-sm btn-outline" style="padding: 0.15rem 0.4rem; font-size: 0.72rem;" onclick="setExamScoreRatio(100)">100% TN</button>
            </div>
          </div>
        </div>

        <!-- 4. TỰ NHẬP TỈ LỆ 3 MỨC ĐỘ NHẬN THỨC (THÔNG TƯ 27) -->
        <div style="background: #fdf4ff; border: 1px solid #f0abfc; border-radius: var(--radius-sm); padding: 0.75rem; margin-top: 0.65rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
            <label style="font-weight: 800; font-size: 0.8rem; color: #86198f; margin-bottom: 0;">
              Ma trận 3 Mức độ nhận thức (Tự nhập %):
            </label>
            <span id="aiCognitiveTotalBadge" style="font-size: 0.72rem; font-weight: 800; padding: 0.15rem 0.5rem; border-radius: 9999px; background: #dcfce7; color: #166534;">
              Tổng: 100% ✓
            </span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.4rem; text-align: center;">
            <div>
              <div style="font-size: 0.72rem; font-weight: 700; color: #6b21a8; margin-bottom: 0.15rem;">Mức 1 (Nhận biết)</div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 0.2rem;">
                <input type="number" id="aiLevel1Pct" min="0" max="100" step="5" value="40" class="form-control" style="text-align: center; font-weight: 800; padding: 0.25rem;" oninput="updateCognitiveTotal()">
                <span style="font-size: 0.75rem; font-weight: 700;">%</span>
              </div>
            </div>

            <div>
              <div style="font-size: 0.72rem; font-weight: 700; color: #6b21a8; margin-bottom: 0.15rem;">Mức 2 (Kết nối)</div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 0.2rem;">
                <input type="number" id="aiLevel2Pct" min="0" max="100" step="5" value="40" class="form-control" style="text-align: center; font-weight: 800; padding: 0.25rem;" oninput="updateCognitiveTotal()">
                <span style="font-size: 0.75rem; font-weight: 700;">%</span>
              </div>
            </div>

            <div>
              <div style="font-size: 0.72rem; font-weight: 700; color: #6b21a8; margin-bottom: 0.15rem;">Mức 3 (Vận dụng)</div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 0.2rem;">
                <input type="number" id="aiLevel3Pct" min="0" max="100" step="5" value="20" class="form-control" style="text-align: center; font-weight: 800; padding: 0.25rem;" oninput="updateCognitiveTotal()">
                <span style="font-size: 0.75rem; font-weight: 700;">%</span>
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 0.35rem; margin-top: 0.45rem; justify-content: center;">
            <button type="button" class="btn btn-sm btn-outline" style="padding: 0.15rem 0.45rem; font-size: 0.7rem; background: #fff;" onclick="setCognitivePreset(40, 40, 20)">40 - 40 - 20 (Chuẩn TT27)</button>
            <button type="button" class="btn btn-sm btn-outline" style="padding: 0.15rem 0.45rem; font-size: 0.7rem; background: #fff;" onclick="setCognitivePreset(50, 30, 20)">50 - 30 - 20</button>
            <button type="button" class="btn btn-sm btn-outline" style="padding: 0.15rem 0.45rem; font-size: 0.7rem; background: #fff;" onclick="setCognitivePreset(30, 40, 30)">30 - 40 - 30</button>
          </div>
        </div>

        <!-- 5. CÁC THÔNG SỐ BỔ SUNG -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; margin-top: 0.65rem;">
          <div class="form-group" style="margin-bottom: 0;">
            <label for="aiDurationSelect" style="font-weight: 700; font-size: 0.8rem;">Thời gian làm bài:</label>
            <select id="aiDurationSelect" class="form-select">
              <option value="35 phút" ${currentGradeNum <= 2 ? 'selected' : ''}>35 phút (Tiết học chuẩn)</option>
              <option value="40 phút" ${currentGradeNum > 2 ? 'selected' : ''}>40 phút (Chuẩn định kỳ)</option>
              <option value="15 phút">15 phút (Kiểm tra nhanh)</option>
              <option value="Đọc: 35p | Viết: 35p">Đọc: 35p | Viết: 35p (Tiếng Việt)</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label for="aiSchoolNameInput" style="font-weight: 700; font-size: 0.8rem;">Tên Trường Tiểu học:</label>
            <input type="text" id="aiSchoolNameInput" class="form-control" placeholder="Trường Tiểu học .................">
          </div>
        </div>

        <div class="form-group" style="margin-top: 0.5rem; margin-bottom: 0;">
          <label for="aiCustomPrompt" style="font-weight: 700; font-size: 0.8rem;">Ghi chú / Yêu cầu đặc biệt cho AI (Tùy chọn):</label>
          <input type="text" id="aiCustomPrompt" class="form-control" placeholder="Ví dụ: Đề vừa sức học sinh, câu hỏi trắc nghiệm có tình huống thực tế...">
        </div>

        <!-- NÚT BẮT ĐẦU SOẠN ĐỀ -->
        <button class="btn btn-primary" style="width: 100%; margin-top: 1.15rem; padding: 0.8rem; font-size: 0.95rem; font-weight: 800; background: linear-gradient(135deg, #7c3aed, #a855f7); box-shadow: 0 4px 12px rgba(124, 58, 237, 0.35);" onclick="triggerAiGenerate()">
          <i class="fa-solid fa-wand-magic-sparkles"></i> BẮT ĐẦU SOẠN ĐỀ TỰ ĐỘNG
        </button>

      </div>

      <!-- CỘT KẾT QUẢ BÊN PHẢI (TRÌNH XEM TRƯỚC ĐỀ THI ĐA TABS) -->
      <div class="paper-preview-card" id="aiOutputContainer" style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; box-shadow: var(--shadow-sm); min-height: 600px;">
        <div style="text-align: center; padding: 6rem 1rem; color: var(--text-muted);">
          <div style="width: 70px; height: 70px; border-radius: 50%; background: #f3e8ff; color: #7c3aed; display: inline-flex; align-items: center; justify-content: center; font-size: 2.2rem; margin-bottom: 1.25rem;">
            <i class="fa-solid fa-file-signature"></i>
          </div>
          <h3 style="color: var(--text-color); font-weight: 800; font-size: 1.25rem; margin-bottom: 0.5rem;">Sẵn sàng tạo đề kiểm tra chuẩn Bộ GD&ĐT</h3>
          <p style="font-size: 0.88rem; max-width: 480px; margin: 0 auto; line-height: 1.5;">
            Chọn thông số bên trái và bấm <strong>"BẮT ĐẦU SOẠN ĐỀ TỰ ĐỘNG"</strong>. AI sẽ tạo trọn bộ Ma trận 3 Mức độ, Đề kiểm tra và Hướng dẫn chấm chi tiết theo SGK Kết nối tri thức.
          </p>
        </div>
      </div>
    </div>
  `;

  setTimeout(function() {
    updateExamSubjectFormState(defaultSubject, currentGradeNum);
    updateExamScopeOptions(currentGradeNum, defaultSubject);
  }, 20);
}

// Cập nhật giao diện form khi đổi môn học hoặc khối lớp
function updateExamSubjectFormState(subjectId, grade) {
  var isTv = (subjectId === "TIENG_VIET");
  var g = parseInt(grade) || 3;
  
  var tvBox = document.getElementById("tvConfigBox");
  var stdBox = document.getElementById("standardConfigBox");
  var tvG123Box = document.getElementById("tvWritingGrade123Box");
  var tvG45Box = document.getElementById("tvWritingGrade45Box");

  if (tvBox) tvBox.style.display = isTv ? "block" : "none";
  if (stdBox) stdBox.style.display = isTv ? "none" : "block";

  if (isTv) {
    if (tvG123Box) tvG123Box.style.display = (g <= 3) ? "block" : "none";
    if (tvG45Box) tvG45Box.style.display = (g >= 4) ? "block" : "none";
  }
}

function onTvOralScoreChange(val) {
  // Có thể cập nhật nhãn nếu cần
}

// Cập nhật danh sách môn khi đổi khối lớp
function onExamGradeChange(grade) {
  var select = document.getElementById("aiSubjectSelect");
  if (!select) return;
  var subjects = getSubjectsForGrade(grade);
  select.innerHTML = subjects.map(function(s) {
    return `<option value="${s.id}">${s.name}</option>`;
  }).join('');

  updateExamSubjectFormState(select.value, grade);
  updateExamScopeOptions(grade, select.value);
}

// Cập nhật phạm vi bài học khi đổi môn
function onExamSubjectChange(subjectId) {
  var grade = document.getElementById("aiGradeSelect")?.value || 5;
  updateExamSubjectFormState(subjectId, grade);
  updateExamScopeOptions(grade, subjectId);
}

// Nạp danh sách chủ đề & bài học từ Kho Sách Giáo Khoa Số Hóa KNTT
function updateExamScopeOptions(grade, subjectId) {
  var scopeSelect = document.getElementById("aiScopePreset");
  if (!scopeSelect) return;

  var currentSelectedVal = scopeSelect.value;
  var sgkKey = (subjectId || 'TOAN').toLowerCase().replace('lich_su_dia_ly', 'lich_su_dia_li');
  var book = (typeof window !== 'undefined' && window.SGK_DATA && typeof window.SGK_DATA.getBook === 'function') 
             ? window.SGK_DATA.getBook(grade, sgkKey) : null;

  var html = `
    <optgroup label="Phạm vi định kỳ chuẩn">
      <option value="Kiểm tra Định kỳ Cuối Học Kỳ I (Tuần 1 - 18)" selected>Cuối Học Kỳ I (Tuần 1 - 18)</option>
      <option value="Kiểm tra Định kỳ Giữa Học Kỳ I (Tuần 1 - 9)">Giữa Học Kỳ I (Tuần 1 - 9)</option>
      <option value="Kiểm tra Định kỳ Giữa Học Kỳ II (Tuần 19 - 27)">Giữa Học Kỳ II (Tuần 19 - 27)</option>
      <option value="Kiểm tra Định kỳ Cuối Năm / Cả Năm (Tuần 1 - 35)">Cuối Năm / Cả Năm (Tuần 1 - 35)</option>
      <option value="Theo Tuần ${selectedWeek}">Theo Tuần ${selectedWeek}</option>
    </optgroup>
  `;

  if (book && book.topics && book.topics.length > 0) {
    html += `
      <optgroup label="Chủ đề / Chủ điểm SGK KNTT (${book.metadata?.bookName || ''})">
        ${book.topics.map(function(t) {
          return `<option value="${t.name}">${t.name} (Tuần ${t.weeks || ''})</option>`;
        }).join('')}
      </optgroup>
    `;
  }

  if (book && book.lessons && book.lessons.length > 0) {
    html += `
      <optgroup label="Từng bài học SGK số hóa (Khối ${grade})">
        ${book.lessons.slice(0, 45).map(function(l) {
          return `<option value="${l.title}">Tuần ${l.week || 'N/A'}: ${l.title}</option>`;
        }).join('')}
      </optgroup>
    `;
  }

  html += `
    <optgroup label="Tùy chỉnh khác">
      <option value="custom">✏️ Tự gõ tên bài học / phạm vi khác...</option>
    </optgroup>
  `;

  scopeSelect.innerHTML = html;
  onExamScopePresetChange(scopeSelect.value);
}

// Xử lý chọn nhanh hoặc tự gõ bài học
function onExamScopePresetChange(val) {
  var customInput = document.getElementById("aiCustomScopeInput");
  if (!customInput) return;
  if (val === "custom") {
    customInput.style.display = "block";
    customInput.focus();
  } else {
    customInput.style.display = "none";
  }
}

// Đồng bộ thanh trượt tỉ lệ điểm % Trắc nghiệm / Tự luận
function onExamScoreRatioChange(mcqPct) {
  var p = parseInt(mcqPct);
  var essayPct = 100 - p;
  
  var mcqLbl = document.getElementById("aiMcqPctLabel");
  var essayLbl = document.getElementById("aiEssayPctLabel");
  var mcqScore = document.getElementById("aiMcqScoreLabel");
  var essayScore = document.getElementById("aiEssayScoreLabel");

  if (mcqLbl) mcqLbl.innerText = p + "%";
  if (essayLbl) essayLbl.innerText = essayPct + "%";
  if (mcqScore) mcqScore.innerText = (p / 10).toString().replace('.', ',');
  if (essayScore) essayScore.innerText = (essayPct / 10).toString().replace('.', ',');
}

function setExamScoreRatio(mcqPct) {
  var slider = document.getElementById("aiScoreRatioSlider");
  if (slider) {
    slider.value = mcqPct;
    onExamScoreRatioChange(mcqPct);
  }
}

// Cập nhật và kiểm tra tổng % 3 mức độ nhận thức
function updateCognitiveTotal() {
  var m1 = parseInt(document.getElementById("aiLevel1Pct")?.value) || 0;
  var m2 = parseInt(document.getElementById("aiLevel2Pct")?.value) || 0;
  var m3 = parseInt(document.getElementById("aiLevel3Pct")?.value) || 0;
  var total = m1 + m2 + m3;

  var badge = document.getElementById("aiCognitiveTotalBadge");
  if (badge) {
    if (total === 100) {
      badge.style.background = "#dcfce7";
      badge.style.color = "#166534";
      badge.innerHTML = "Tổng: 100% ✓";
    } else {
      badge.style.background = "#fee2e2";
      badge.style.color = "#991b1b";
      badge.innerHTML = `Tổng: ${total}% (Cần đủ 100%)`;
    }
  }
}

function setCognitivePreset(m1, m2, m3) {
  var in1 = document.getElementById("aiLevel1Pct");
  var in2 = document.getElementById("aiLevel2Pct");
  var in3 = document.getElementById("aiLevel3Pct");
  if (in1) in1.value = m1;
  if (in2) in2.value = m2;
  if (in3) in3.value = m3;
  updateCognitiveTotal();
}

// Bắt đầu gọi sinh đề
async function triggerAiGenerate() {
  var grade = document.getElementById("aiGradeSelect")?.value || 3;
  var subjectId = document.getElementById("aiSubjectSelect")?.value || "TOAN";
  var scopePreset = document.getElementById("aiScopePreset")?.value || "";
  var customScope = document.getElementById("aiCustomScopeInput")?.value || "";
  var scope = (scopePreset === "custom" && customScope.trim()) ? customScope.trim() : scopePreset;

  var duration = document.getElementById("aiDurationSelect")?.value || "40 phút";
  var schoolName = document.getElementById("aiSchoolNameInput")?.value || "";
  var customPrompt = document.getElementById("aiCustomPrompt")?.value || "";
  var apiKey = localStorage.getItem("tvth_gemini_api_key") || (window.CONFIG && window.CONFIG.DEFAULT_GEMINI_API_KEY) || "";

  var level1Percent = parseInt(document.getElementById("aiLevel1Pct")?.value) || 40;
  var level2Percent = parseInt(document.getElementById("aiLevel2Pct")?.value) || 40;
  var level3Percent = parseInt(document.getElementById("aiLevel3Pct")?.value) || 20;

  var isTv = (subjectId === "TIENG_VIET");
  var payload = {
    grade: grade,
    subjectId: subjectId,
    scope: scope,
    duration: duration,
    schoolName: schoolName,
    customPrompt: customPrompt,
    apiKey: apiKey,
    level1Percent: level1Percent,
    level2Percent: level2Percent,
    level3Percent: level3Percent
  };

  if (isTv) {
    var oralScoreVal = parseFloat(document.getElementById("tvOralScoreSelect")?.value) || 4.0;
    var oralModeVal = document.getElementById("tvOralModeSelect")?.value || "sgk";
    var ratioVal = document.getElementById("tvWritingRatioSelect")?.value || "4-6";
    var dictScoreVal = parseFloat(ratioVal.split('-')[0]) || 4.0;
    var genreVal = document.getElementById("tvEssayGenreSelect")?.value || "Văn miêu tả cây cối";

    payload.tvOralScore = oralScoreVal;
    payload.tvOralMode = oralModeVal;
    payload.tvDictationScore = dictScoreVal;
    payload.tvEssayGenre = genreVal;
  } else {
    var mcqCount = parseInt(document.getElementById("aiMcqCount")?.value) || 8;
    var essayCount = parseInt(document.getElementById("aiEssayCount")?.value);
    if (isNaN(essayCount)) essayCount = 2;
    var essayGuide = document.getElementById("aiEssayGuide")?.value || "";

    var sliderVal = parseInt(document.getElementById("aiScoreRatioSlider")?.value);
    var mcqPercent = !isNaN(sliderVal) ? sliderVal : 70;
    var essayPercent = 100 - mcqPercent;

    payload.mcqCount = mcqCount;
    payload.essayCount = essayCount;
    payload.essayGuide = essayGuide;
    payload.mcqPercent = mcqPercent;
    payload.essayPercent = essayPercent;
  }

  var outputEl = document.getElementById("aiOutputContainer");
  if (!outputEl) return;

  outputEl.innerHTML = `
    <div style="text-align: center; padding: 6rem 1rem;">
      <div class="spinner" style="border-top-color: #7c3aed; width: 44px; height: 44px; margin: 0 auto 1.5rem; border-width: 4px;"></div>
      <h3 style="color: #7c3aed; font-weight: 800; font-size: 1.2rem; margin-bottom: 0.5rem;">AI đang phân tích chương trình SGK Kết nối tri thức...</h3>
      <p style="color: var(--text-muted); font-size: 0.88rem; max-width: 450px; margin: 0 auto;">
        ${isTv ? 'Đang xây dựng Đề Đọc (Đọc tiếng + Đọc hiểu), Đề Viết (Chính tả + TLV), Ma trận Thông tư 27 và Barem chấm chi tiết...' : 'Đang xây dựng Ma trận 3 Mức độ, Đề kiểm tra và Barem chấm chuẩn Thông tư 27...'}
      </p>
    </div>
  `;

  setTimeout(async function() {
    try {
      var exam = await AIService.generateExam(payload);
      currentExamData = exam;
      currentExamActiveTab = (exam.isTiengViet || exam.subjectId === "TIENG_VIET" || exam.readingExam) ? "reading" : "exam";
      renderExamOutput(exam, outputEl);
      showToast("Đã soạn đề kiểm tra & ma trận thành công!", "success");
    } catch (err) {
      console.error(err);
      showToast("Có lỗi khi tạo đề, vui lòng thử lại!", "error");
    }
  }, 500);
}

// Hiển thị kết quả đề thi dạng Tabs
function renderExamOutput(exam, container) {
  if (!container || !exam) return;

  var isAi = exam.source === 'ai';
  var sourceBadgeHtml = isAi 
    ? `<div style="display: inline-flex; align-items: center; gap: 0.35rem; background: #f3e8ff; color: #7c3aed; padding: 0.35rem 0.75rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; border: 1px solid #d8b4fe;" title="Đề thi được tạo trực tuyến bởi mô hình Google Gemini AI"><i class="fa-solid fa-brain"></i> ${exam.modelName ? `AI (${exam.modelName})` : `Google Gemini AI (Online)`}</div>`
    : `<div style="display: inline-flex; align-items: center; gap: 0.35rem; background: #fef3c7; color: #b45309; padding: 0.35rem 0.75rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; border: 1px solid #fde68a;" title="Đề thi được tạo tự động từ Ngân hàng SGK Kết nối tri thức số hóa"><i class="fa-solid fa-database"></i> Ngân hàng SGK (Offline)</div>`;

  // =========================================================================
  // GIAO DIỆN HIỂN THỊ ĐẶC BIỆT CHO MÔN TIẾNG VIỆT (4 TABS: ĐỌC, VIẾT, MA TRẬN, ĐÁP ÁN)
  // =========================================================================
  if (exam.isTiengViet || exam.subjectId === "TIENG_VIET" || exam.readingExam) {
    var rd = exam.readingExam || {};
    var wr = exam.writingExam || {};
    var oralScoreStr = (rd.oralScore || 4.0).toFixed(1).replace('.', ',');
    var compScoreStr = (rd.comprehensionScore || 6.0).toFixed(1).replace('.', ',');
    var isSGK = (rd.oralMode !== "custom");
    var grade = exam.grade || 3;

    if (!["reading", "writing", "matrix", "rubric"].includes(currentExamActiveTab)) {
      currentExamActiveTab = "reading";
    }

    container.innerHTML = `
      <!-- THANH ĐIỀU HƯỚNG 4 TABS TIẾNG VIỆT -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.65rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.85rem;">
        <div style="display: flex; gap: 0.35rem; background: #f1f5f9; padding: 0.25rem; border-radius: var(--radius-sm); align-items: center; flex-wrap: wrap;">
          <button class="btn btn-sm ${currentExamActiveTab === 'reading' ? 'btn-primary' : 'btn-ghost'}" style="${currentExamActiveTab === 'reading' ? 'background: #7c3aed;' : ''}" onclick="switchExamTab('reading')">
            <i class="fa-solid fa-book-open"></i> 1. Phiếu Đề Đọc (10đ)
          </button>
          <button class="btn btn-sm ${currentExamActiveTab === 'writing' ? 'btn-primary' : 'btn-ghost'}" style="${currentExamActiveTab === 'writing' ? 'background: #7c3aed;' : ''}" onclick="switchExamTab('writing')">
            <i class="fa-solid fa-pen-nib"></i> 2. Phiếu Đề Viết (10đ)
          </button>
          <button class="btn btn-sm ${currentExamActiveTab === 'matrix' ? 'btn-primary' : 'btn-ghost'}" style="${currentExamActiveTab === 'matrix' ? 'background: #7c3aed;' : ''}" onclick="switchExamTab('matrix')">
            <i class="fa-solid fa-table-cells"></i> 3. Ma Trận Đề (TT 27)
          </button>
          <button class="btn btn-sm ${currentExamActiveTab === 'rubric' ? 'btn-primary' : 'btn-ghost'}" style="${currentExamActiveTab === 'rubric' ? 'background: #7c3aed;' : ''}" onclick="switchExamTab('rubric')">
            <i class="fa-solid fa-square-check"></i> 4. Hướng Dẫn Chấm
          </button>
        </div>

        <div style="display: flex; gap: 0.45rem; align-items: center;">
          ${sourceBadgeHtml}
          <button class="btn btn-sm btn-primary" style="background: #16a34a; border-color: #16a34a;" onclick="AIService.exportToWord(currentExamData)">
            <i class="fa-solid fa-file-word"></i> Xuất File Word (.doc)
          </button>
          <button class="btn btn-sm btn-outline" onclick="window.print()">
            <i class="fa-solid fa-print"></i> In Đề
          </button>
        </div>
      </div>

      <!-- TAB 1: PHIẾU ĐỀ ĐỌC (HỌC SINH) -->
      <div id="examTabContent_reading" class="exam-paper-sheet" style="display: ${currentExamActiveTab === 'reading' ? 'block' : 'none'}; background: #fff; padding: 1.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.4; color: #000;">
        
        <!-- HEADER 2 CỘT -->
        <table style="width: 100%; border: none; margin-bottom: 12px;">
          <tr>
            <td style="width: 48%; vertical-align: top;">
              <b>${exam.schoolName || "TRƯỜNG TIỂU HỌC ................................."}</b><br>
              Họ và tên: ...................................................<br>
              Lớp: ${exam.grade}.....
            </td>
            <td style="width: 52%; vertical-align: top; text-align: right;">
              <i>Thứ….. ngày … tháng … năm 2026</i><br>
              <b style="font-size: 13.5pt; text-transform: uppercase;">PHIẾU KIỂM TRA ĐỌC</b><br>
              <b>MÔN: TIẾNG VIỆT - LỚP ${exam.grade}</b><br>
              <i>Thời gian làm bài: 35 - 40 phút</i>
            </td>
          </tr>
        </table>

        <!-- KHUNG ĐÁNH GIÁ 3 Ô PHẦN ĐỌC -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <tr style="background: #fafafa; font-weight: bold; text-align: center;">
            <td style="border: 1px solid #000; width: 16%; padding: 4px;">Đọc tiếng</td>
            <td style="border: 1px solid #000; width: 16%; padding: 4px;">Đọc hiểu</td>
            <td style="border: 1px solid #000; width: 16%; padding: 4px;">Tổng điểm</td>
            <td style="border: 1px solid #000; width: 34%; padding: 4px;">Nhận xét của giáo viên</td>
            <td style="border: 1px solid #000; width: 18%; padding: 4px;">Chữ kí PHHS</td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; height: 50px; text-align: center;">..... / ${oralScoreStr}đ</td>
            <td style="border: 1px solid #000; text-align: center;">..... / ${compScoreStr}đ</td>
            <td style="border: 1px solid #000; text-align: center; font-weight: bold; font-size: 13pt;">..... / 10đ</td>
            <td style="border: 1px solid #000;">&nbsp;</td>
            <td style="border: 1px solid #000;">&nbsp;</td>
          </tr>
        </table>

        <!-- A. ĐỌC THÀNH TIẾNG -->
        <div style="font-weight: bold; font-size: 13.5pt; margin: 10px 0 4px 0;">A. PHẦN ĐỌC THÀNH TIẾNG (${oralScoreStr} điểm)</div>
        <p style="margin: 0 0 6px 0; font-style: italic;">
          ${rd.oralGuideIntro || "Học sinh bốc thăm đọc thành tiếng một đoạn trong các bài sau (thời gian không quá 1 phút) và trả lời câu hỏi do giáo viên nêu:"}
        </p>

        ${isSGK ? `
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 8px 12px; margin-bottom: 14px;">
            <table style="width: 100%; border-collapse: collapse;">
              ${(rd.oralItems || []).map(function(item, idx) {
                return `
                  <tr style="border-bottom: 1px dashed #e2e8f0;">
                    <td style="padding: 4px 6px; font-weight: bold; width: 14%; color: #7c3aed;">Phiếu ${idx + 1}:</td>
                    <td style="padding: 4px 6px;">
                      <b>${item.title}</b> <span style="color: #64748b; font-style: italic;">(${item.bookVolume || 'Tập 1'} - ${item.page || 'SGK KNTT'})</span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </table>
          </div>
        ` : `
          <div style="background: #fafafa; border: 1px solid #ccc; padding: 10px 14px; margin: 8px 0 14px 0; line-height: 1.45;">
            <div style="text-align: center; font-weight: bold; font-size: 13.5pt; text-transform: uppercase; margin-bottom: 4px;">
              ${rd.oralItems?.[0]?.title || "BÀI ĐỌC THÀNH TIẾNG"}
            </div>
            <div style="text-align: center; font-style: italic; font-size: 11pt; margin-bottom: 8px;">
              ${rd.oralItems?.[0]?.author ? `Tác giả: ${rd.oralItems[0].author}` : ''}
            </div>
            <div style="text-align: justify; text-indent: 1.5rem;">
              ${rd.oralItems?.[0]?.passage || ""}
            </div>
          </div>
        `}

        <!-- B. ĐỌC HIỂU VÀ KIẾN THỨC TIẾNG VIỆT -->
        <div style="font-weight: bold; font-size: 13.5pt; margin: 14px 0 4px 0;">B. PHẦN ĐỌC HIỂU VÀ KIẾN THỨC TIẾNG VIỆT (${compScoreStr} điểm)</div>
        <p style="margin: 0 0 6px 0; font-style: italic;">Đọc thầm bài văn sau và hoàn thành các câu hỏi bên dưới:</p>

        <div style="background: #fdfdfd; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px 14px; margin: 6px 0 12px 0;">
          <div style="text-align: center; font-weight: bold; font-size: 13.5pt; text-transform: uppercase; margin-bottom: 2px;">
            ${rd.comprehensionReading?.title || "BÀI ĐỌC THẦM"}
          </div>
          <div style="text-align: center; font-style: italic; font-size: 11pt; margin-bottom: 8px; color: #555;">
            ${rd.comprehensionReading?.author ? `Tác giả: ${rd.comprehensionReading.author}` : ''}
          </div>
          <div style="text-align: justify; text-indent: 1.5rem; line-height: 1.45;">
            ${rd.comprehensionReading?.passage || ""}
          </div>
        </div>

        <p style="margin: 6px 0 8px 0; font-style: italic; font-weight: bold;">Khoanh vào chữ cái trước câu trả lời đúng và hoàn thành các bài tập:</p>

        ${(rd.questions || []).map(function(q) {
          if (q.type === 'mcq') {
            return `
              <div style="margin-bottom: 10px;" contenteditable="true">
                <b>Câu ${q.num}</b> (${q.score ? q.score.toString().replace('.', ',') : '0,5'} điểm - ${q.level || 'Mức 1'}): ${q.text}
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.35rem; padding-left: 1.25rem; margin-top: 3px;">
                  ${(q.options || []).map(function(opt) { return `<div>${opt}</div>`; }).join('')}
                </div>
              </div>
            `;
          } else {
            return `
              <div style="margin-top: 10px; margin-bottom: 12px;" contenteditable="true">
                <b>Câu ${q.num}</b> (${q.score ? q.score.toString().replace('.', ',') : '1,0'} điểm - ${q.level || 'Mức 2'}): ${q.text}
                <div style="margin-top: 4px;">
                  <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
                  <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
                </div>
              </div>
            `;
          }
        }).join('')}
      </div>

      <!-- TAB 2: PHIẾU ĐỀ VIẾT (HỌC SINH) -->
      <div id="examTabContent_writing" class="exam-paper-sheet" style="display: ${currentExamActiveTab === 'writing' ? 'block' : 'none'}; background: #fff; padding: 1.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.4; color: #000;">
        
        <!-- HEADER 2 CỘT -->
        <table style="width: 100%; border: none; margin-bottom: 12px;">
          <tr>
            <td style="width: 48%; vertical-align: top;">
              <b>${exam.schoolName || "TRƯỜNG TIỂU HỌC ................................."}</b><br>
              Họ và tên: ...................................................<br>
              Lớp: ${exam.grade}.....
            </td>
            <td style="width: 52%; vertical-align: top; text-align: right;">
              <i>Thứ….. ngày … tháng … năm 2026</i><br>
              <b style="font-size: 13.5pt; text-transform: uppercase;">PHIẾU KIỂM TRA VIẾT</b><br>
              <b>MÔN: TIẾNG VIỆT - LỚP ${exam.grade}</b><br>
              <i>Thời gian làm bài: 35 - 40 phút</i>
            </td>
          </tr>
        </table>

        ${grade <= 3 ? `
          <!-- KHUNG ĐÁNH GIÁ 3 Ô PHẦN VIẾT LỚP 1-3 -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            <tr style="background: #fafafa; font-weight: bold; text-align: center;">
              <td style="border: 1px solid #000; width: 18%; padding: 4px;">Chính tả</td>
              <td style="border: 1px solid #000; width: 18%; padding: 4px;">Tập làm văn</td>
              <td style="border: 1px solid #000; width: 18%; padding: 4px;">Tổng điểm Viết</td>
              <td style="border: 1px solid #000; width: 28%; padding: 4px;">Nhận xét của giáo viên</td>
              <td style="border: 1px solid #000; width: 18%; padding: 4px;">Chữ kí PHHS</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; height: 50px; text-align: center;">..... / ${(wr.dictation?.score || 4.0).toFixed(1).replace('.', ',')}đ</td>
              <td style="border: 1px solid #000; text-align: center;">..... / ${(wr.paragraphWriting?.score || 6.0).toFixed(1).replace('.', ',')}đ</td>
              <td style="border: 1px solid #000; text-align: center; font-weight: bold; font-size: 13pt;">..... / 10đ</td>
              <td style="border: 1px solid #000;">&nbsp;</td>
              <td style="border: 1px solid #000;">&nbsp;</td>
            </tr>
          </table>

          <!-- PHẦN 1: CHÍNH TẢ -->
          <div style="font-weight: bold; font-size: 13.5pt; margin: 12px 0 4px 0;">I. CHÍNH TẢ (Nghe - viết) (${(wr.dictation?.score || 4.0).toFixed(1).replace('.', ',')} điểm)</div>
          <p style="margin: 0 0 6px 0; font-style: italic;">
            <b>${wr.dictation?.title || "Bài viết chính tả"}</b> ${wr.dictation?.author ? `(Tác giả: ${wr.dictation.author})` : ''}
          </p>

          <div style="margin-top: 8px;">
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
          </div>

          <!-- PHẦN 2: TẬP LÀM VĂN -->
          <div style="font-weight: bold; font-size: 13.5pt; margin: 18px 0 4px 0;">II. TẬP LÀM VĂN (${(wr.paragraphWriting?.score || 6.0).toFixed(1).replace('.', ',')} điểm)</div>
          <p style="margin: 0 0 6px 0; font-weight: bold;">
            Đề bài: ${wr.paragraphWriting?.prompt || "Viết đoạn văn ngắn theo chủ điểm đã học."}
          </p>
          ${(wr.paragraphWriting?.suggestions && wr.paragraphWriting.suggestions.length > 0) ? `
            <div style="font-style: italic; margin-bottom: 8px; font-size: 11.5pt; color: #475569;">
              Gợi ý:
              ${wr.paragraphWriting.suggestions.map(function(s){ return `<div>• ${s}</div>`; }).join('')}
            </div>
          ` : ''}

          <div style="margin-top: 8px;">
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
          </div>
        ` : `
          <!-- KHUNG ĐÁNH GIÁ LỚP 4-5 -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            <tr style="background: #fafafa; font-weight: bold; text-align: center;">
              <td style="border: 1px solid #000; width: 25%; padding: 6px;">Điểm Tập làm văn</td>
              <td style="border: 1px solid #000; width: 50%; padding: 6px;">Nhận xét của giáo viên</td>
              <td style="border: 1px solid #000; width: 25%; padding: 6px;">Chữ kí của PHHS</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; height: 60px; text-align: center; font-weight: bold; font-size: 14pt;">..... / 10đ</td>
              <td style="border: 1px solid #000;">&nbsp;</td>
              <td style="border: 1px solid #000;">&nbsp;</td>
            </tr>
          </table>

          <div style="font-weight: bold; font-size: 13.5pt; margin: 12px 0 4px 0;">TẬP LÀM VĂN (10,0 điểm)</div>
          <p style="margin: 0 0 8px 0; font-weight: bold; font-size: 13.5pt;">
            Đề bài: ${wr.essay?.prompt || "Em hãy viết một bài văn hoàn chỉnh đúng thể loại đã học."}
          </p>
          ${(wr.essay?.suggestions && wr.essay.suggestions.length > 0) ? `
            <div style="font-style: italic; margin-bottom: 10px; font-size: 12pt; background: #f8fafc; border: 1px dashed #94a3b8; padding: 8px 12px; border-radius: 4px;">
              <b>Gợi ý dàn ý:</b>
              ${wr.essay.suggestions.map(function(s){ return `<div>• ${s}</div>`; }).join('')}
            </div>
          ` : ''}

          <div style="margin-top: 8px;">
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
            <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
          </div>
        `}

      </div>

      <!-- TAB 3: MA TRẬN ĐỀ TIẾNG VIỆT (TT 27) -->
      <div id="examTabContent_matrix" style="display: ${currentExamActiveTab === 'matrix' ? 'block' : 'none'}; background: #fff; padding: 1.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.35; color: #000;">
        <div style="text-align: center; font-weight: bold; font-size: 14pt; text-transform: uppercase; margin-bottom: 4px;">
          MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ MÔN TIẾNG VIỆT LỚP ${exam.grade}
        </div>
        <div style="text-align: center; font-size: 12.5pt; margin-bottom: 14px;">
          Bộ sách: Kết nối tri thức với cuộc sống • Năm học ${exam.schoolYear}
        </div>

        <div style="font-weight: bold; font-size: 13pt; margin: 10px 0 6px 0; color: #1e3a8a;">I. MA TRẬN NỘI DUNG VÀ MỨC ĐỘ NHẬN THỨC PHẦN ĐỌC (10 ĐIỂM)</div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; text-align: center;">
          <thead>
            <tr style="background: #f1f5f9; font-weight: bold;">
              <th rowspan="2" style="border: 1px solid #000; width: 35%; padding: 6px; text-align: left;">Mạch kiến thức, kĩ năng</th>
              <th colspan="3" style="border: 1px solid #000; padding: 6px;">Mức độ nhận thức (TT 27)</th>
              <th rowspan="2" style="border: 1px solid #000; width: 15%; padding: 6px;">Tổng điểm</th>
            </tr>
            <tr style="background: #f8fafc; font-weight: bold;">
              <th style="border: 1px solid #000; padding: 4px;">Mức 1</th>
              <th style="border: 1px solid #000; padding: 4px;">Mức 2</th>
              <th style="border: 1px solid #000; padding: 4px;">Mức 3</th>
            </tr>
          </thead>
          <tbody>
            ${(exam.matrix?.readingMatrix || []).map(function(r) {
              return `
                <tr>
                  <td style="border: 1px solid #000; padding: 6px; text-align: left; font-weight: 500;">${r.component}</td>
                  <td style="border: 1px solid #000; padding: 6px;">${r.m1 || '-'}</td>
                  <td style="border: 1px solid #000; padding: 6px;">${r.m2 || '-'}</td>
                  <td style="border: 1px solid #000; padding: 6px;">${r.m3 || '-'}</td>
                  <td style="border: 1px solid #000; padding: 6px; font-weight: bold;">${r.total || '-'}đ</td>
                </tr>
              `;
            }).join('')}
            <tr style="font-weight: bold; background: #fafafa;">
              <td style="border: 1px solid #000; padding: 6px; text-align: left;">Tổng cộng Phần Đọc</td>
              <td style="border: 1px solid #000; padding: 6px;">4,0đ</td>
              <td style="border: 1px solid #000; padding: 6px;">4,0đ</td>
              <td style="border: 1px solid #000; padding: 6px;">2,0đ</td>
              <td style="border: 1px solid #000; padding: 6px; font-weight: bold;">10,0đ</td>
            </tr>
          </tbody>
        </table>

        <div style="font-weight: bold; font-size: 13pt; margin: 14px 0 6px 0; color: #1e3a8a;">II. MA TRẬN NỘI DUNG VÀ MỨC ĐỘ NHẬN THỨC PHẦN VIẾT (10 ĐIỂM)</div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; text-align: center;">
          <thead>
            <tr style="background: #f1f5f9; font-weight: bold;">
              <th style="border: 1px solid #000; width: 45%; padding: 6px; text-align: left;">Nội dung kiểm tra</th>
              <th style="border: 1px solid #000; width: 30%; padding: 6px;">Mức độ đáp ứng</th>
              <th style="border: 1px solid #000; width: 25%; padding: 6px;">Điểm số</th>
            </tr>
          </thead>
          <tbody>
            ${(exam.matrix?.writingMatrix || []).map(function(w) {
              return `
                <tr>
                  <td style="border: 1px solid #000; padding: 6px; text-align: left; font-weight: 500;">${w.component}</td>
                  <td style="border: 1px solid #000; padding: 6px;">${w.level}</td>
                  <td style="border: 1px solid #000; padding: 6px; font-weight: bold;">${w.score} điểm</td>
                </tr>
              `;
            }).join('')}
            <tr style="font-weight: bold; background: #fafafa;">
              <td style="border: 1px solid #000; padding: 6px; text-align: left;">Tổng cộng Phần Viết</td>
              <td style="border: 1px solid #000; padding: 6px;">Chuẩn năng lực TT 27</td>
              <td style="border: 1px solid #000; padding: 6px; font-weight: bold;">10,0 điểm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- TAB 4: HƯỚNG DẪN CHẤM & ĐÁP ÁN TIẾNG VIỆT -->
      <div id="examTabContent_rubric" style="display: ${currentExamActiveTab === 'rubric' ? 'block' : 'none'}; background: #fff; padding: 1.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.4; color: #000;">
        <div style="text-align: center; font-weight: bold; font-size: 14pt; text-transform: uppercase; margin-bottom: 4px;">
          HƯỚNG DẪN CHẤM VÀ ĐÁP ÁN MÔN TIẾNG VIỆT LỚP ${exam.grade}
        </div>
        <div style="text-align: center; font-size: 12.5pt; margin-bottom: 14px;">
          Chuẩn đánh giá học sinh Tiểu học theo Thông tư 27/2020/TT-BGDĐT
        </div>

        <!-- 1. HƯỚNG DẪN CHẤM ĐỌC THÀNH TIẾNG -->
        <div style="font-weight: bold; font-size: 13.5pt; margin: 10px 0 4px 0; color: #1e3a8a;">A. HƯỚNG DẪN CHẤM ĐỌC THÀNH TIẾNG (${oralScoreStr} ĐIỂM)</div>
        <p style="margin: 0 0 6px 0; font-size: 11.5pt; white-space: pre-line;">
          ${exam.teacherGuide?.oralGuide?.criteria || "- Đọc đúng, rõ ràng, phát âm chuẩn.\n- Trả lời đúng câu hỏi đọc hiểu được 1,0 điểm."}
        </p>

        <div style="font-weight: bold; margin: 8px 0 4px 0; color: #6b21a8;">
          DANH SÁCH CÂU HỎI VÀ GỢI Ý TRẢ LỜI DÀNH CHO GIÁO VIÊN:
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px;">
          <thead>
            <tr style="background: #f1f5f9; font-weight: bold;">
              <th style="border: 1px solid #000; width: 25%; padding: 6px; text-align: center;">Bài đọc</th>
              <th style="border: 1px solid #000; width: 35%; padding: 6px; text-align: center;">Câu hỏi giáo viên hỏi</th>
              <th style="border: 1px solid #000; width: 40%; padding: 6px; text-align: center;">Gợi ý câu trả lời chuẩn của học sinh</th>
            </tr>
          </thead>
          <tbody>
            ${(exam.teacherGuide?.oralGuide?.qaList || []).map(function(item, idx) {
              return `
                <tr>
                  <td style="border: 1px solid #000; padding: 6px; font-weight: bold; vertical-align: top;">
                    ${idx + 1}. ${item.lessonTitle}<br>
                    <span style="font-size: 10pt; font-weight: normal; color: #555;">${item.bookVolume || ''} ${item.page ? `(${item.page})` : ''}</span>
                  </td>
                  <td style="border: 1px solid #000; padding: 6px; vertical-align: top;">${item.question}</td>
                  <td style="border: 1px solid #000; padding: 6px; vertical-align: top; color: #15803d;"><b>${item.answer}</b></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <!-- 2. HƯỚNG DẪN CHẤM ĐỌC HIỂU -->
        <div style="font-weight: bold; font-size: 13.5pt; margin: 14px 0 4px 0; color: #1e3a8a;">B. ĐÁP ÁN ĐỌC HIỂU VÀ KIẾN THỨC TIẾNG VIỆT (${compScoreStr} ĐIỂM)</div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <thead>
            <tr style="background: #f1f5f9; font-weight: bold;">
              <th style="border: 1px solid #000; width: 12%; padding: 6px; text-align: center;">Câu</th>
              <th style="border: 1px solid #000; width: 25%; padding: 6px; text-align: center;">Đáp án / Lời giải</th>
              <th style="border: 1px solid #000; width: 63%; padding: 6px; text-align: center;">Hướng dẫn chấm chi tiết</th>
            </tr>
          </thead>
          <tbody>
            ${(exam.teacherGuide?.comprehensionAnswers || []).map(function(ans) {
              return `
                <tr>
                  <td style="border: 1px solid #000; padding: 6px; font-weight: bold; text-align: center;">Câu ${ans.num}</td>
                  <td style="border: 1px solid #000; padding: 6px; font-weight: bold; color: #b91c1c; text-align: center; font-size: 12pt;">${ans.ans}</td>
                  <td style="border: 1px solid #000; padding: 6px; text-align: left; vertical-align: top;">${ans.explain}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <!-- 3. HƯỚNG DẪN CHẤM PHẦN VIẾT -->
        <div style="font-weight: bold; font-size: 13.5pt; margin: 14px 0 4px 0; color: #1e3a8a;">C. HƯỚNG DẪN CHẤM PHẦN VIẾT (10 ĐIỂM)</div>
        ${grade <= 3 ? `
          <div style="font-weight: bold; margin-bottom: 4px;">1. Chính tả (${(wr.dictation?.score || 4.0).toFixed(1).replace('.', ',')} điểm):</div>
          <p style="margin: 0 0 8px 0; font-size: 11.5pt; white-space: pre-line;">
            ${exam.teacherGuide?.writingGuide?.dictationCriteria || "- Viết đúng mẫu chữ, độ đều nét, trình bày sạch: 1,0đ\n- Mỗi lỗi chính tả (âm đầu, vần, thanh, hoa): trừ 0,5đ"}
          </p>

          <div style="font-weight: bold; margin: 8px 0 4px 0;">2. Tập làm văn - Viết đoạn văn (${(wr.paragraphWriting?.score || 6.0).toFixed(1).replace('.', ',')} điểm):</div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px;">
            <thead>
              <tr style="background: #f1f5f9; font-weight: bold;">
                <th style="border: 1px solid #000; width: 30%; padding: 6px; text-align: center;">Tiêu chí đánh giá</th>
                <th style="border: 1px solid #000; width: 18%; padding: 6px; text-align: center;">Điểm</th>
                <th style="border: 1px solid #000; width: 52%; padding: 6px; text-align: center;">Yêu cầu cần đạt</th>
              </tr>
            </thead>
            <tbody>
              ${(wr.paragraphWriting?.rubric || []).map(function(rub) {
                return `
                  <tr>
                    <td style="border: 1px solid #000; padding: 6px; font-weight: bold;">${rub.criteria}</td>
                    <td style="border: 1px solid #000; padding: 6px; text-align: center; font-weight: bold;">${rub.score}</td>
                    <td style="border: 1px solid #000; padding: 6px;">${rub.detail}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        ` : `
          <div style="font-weight: bold; margin-bottom: 6px;">Barem chấm điểm Bài văn hoàn chỉnh (10,0 điểm):</div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px;">
            <thead>
              <tr style="background: #f1f5f9; font-weight: bold;">
                <th style="border: 1px solid #000; width: 25%; padding: 6px; text-align: center;">Tiêu chí chấm</th>
                <th style="border: 1px solid #000; width: 15%; padding: 6px; text-align: center;">Điểm</th>
                <th style="border: 1px solid #000; width: 60%; padding: 6px; text-align: center;">Yêu cầu chi tiết</th>
              </tr>
            </thead>
            <tbody>
              ${(wr.essay?.rubric || []).map(function(rub) {
                return `
                  <tr>
                    <td style="border: 1px solid #000; padding: 6px; font-weight: bold;">${rub.criteria}</td>
                    <td style="border: 1px solid #000; padding: 6px; text-align: center; font-weight: bold;">${rub.score}</td>
                    <td style="border: 1px solid #000; padding: 6px;">${rub.detail}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        `}
      </div>
    `;
    return;
  }

  // =========================================================================
  // GIAO DIỆN HIỂN THỊ 3 TABS CHO CÁC MÔN CÒN LẠI (TOÁN, KHOA HỌC, XÃ HỘI...)
  // =========================================================================
  var mcqScoreStr = exam.mcqTotalScore ? exam.mcqTotalScore.toString().replace('.', ',') : "7,0";
  var essayScoreStr = exam.essayTotalScore ? exam.essayTotalScore.toString().replace('.', ',') : "3,0";
  var m = exam.matrix || {};
  var s = m.summary || {};

  if (!["exam", "matrix", "answers"].includes(currentExamActiveTab)) {
    currentExamActiveTab = "exam";
  }

  container.innerHTML = `
    <!-- THANH CÔNG CỤ ĐIỀU HƯỚNG VÀ XUẤT BẢN -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.65rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.85rem;">
      
      <!-- 3 TABS CHUYỂN ĐỔI -->
      <div style="display: flex; gap: 0.35rem; background: #f1f5f9; padding: 0.25rem; border-radius: var(--radius-sm); align-items: center;">
        <button class="btn btn-sm ${currentExamActiveTab === 'exam' ? 'btn-primary' : 'btn-ghost'}" style="${currentExamActiveTab === 'exam' ? 'background: #7c3aed;' : ''}" onclick="switchExamTab('exam')">
          <i class="fa-solid fa-file-lines"></i> 1. Phiếu Đề Thi
        </button>
        <button class="btn btn-sm ${currentExamActiveTab === 'matrix' ? 'btn-primary' : 'btn-ghost'}" style="${currentExamActiveTab === 'matrix' ? 'background: #7c3aed;' : ''}" onclick="switchExamTab('matrix')">
          <i class="fa-solid fa-table-cells"></i> 2. Ma Trận Đề (TT 27)
        </button>
        <button class="btn btn-sm ${currentExamActiveTab === 'answers' ? 'btn-primary' : 'btn-ghost'}" style="${currentExamActiveTab === 'answers' ? 'background: #7c3aed;' : ''}" onclick="switchExamTab('answers')">
          <i class="fa-solid fa-square-check"></i> 3. Hướng Dẫn Chấm
        </button>
      </div>

      <!-- BADGE NGUỒN GỐC & NÚT THAO TÁC XUẤT FILE & IN -->
      <div style="display: flex; gap: 0.45rem; align-items: center;">
        ${sourceBadgeHtml}
        <button class="btn btn-sm btn-primary" style="background: #16a34a; border-color: #16a34a;" onclick="AIService.exportToWord(currentExamData)">
          <i class="fa-solid fa-file-word"></i> Xuất File Word (.doc)
        </button>
        <button class="btn btn-sm btn-outline" onclick="window.print()">
          <i class="fa-solid fa-print"></i> In Đề
        </button>
      </div>
    </div>

    <!-- NỘI DUNG TAB 1: PHIẾU ĐỀ THI HỌC SINH -->
    <div id="examTabContent_exam" class="exam-paper-sheet" style="display: ${currentExamActiveTab === 'exam' ? 'block' : 'none'}; background: #fff; padding: 1.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.4; color: #000;">
      
      <!-- HEADER 2 CỘT -->
      <table style="width: 100%; border: none; margin-bottom: 12px;">
        <tr>
          <td style="width: 48%; vertical-align: top;">
            <b>${exam.schoolName || "TRƯỜNG TIỂU HỌC ................................."}</b><br>
            Tên học sinh: ...................................................<br>
            Lớp: ${exam.grade}.....
          </td>
          <td style="width: 52%; vertical-align: top; text-align: right;">
            <i>Thứ….. ngày … tháng … năm 2026</i><br>
            <b style="font-size: 13.5pt; text-transform: uppercase;">ĐỀ KIỂM TRA HỌC KÌ I</b><br>
            <b>MÔN: ${exam.subjectName.toUpperCase()} - LỚP ${exam.grade}</b><br>
            <i>Thời gian làm bài: ${exam.duration}</i>
          </td>
        </tr>
      </table>

      <!-- KHUNG ĐÁNH GIÁ 3 Ô -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <tr>
          <td style="border: 1px solid #000; width: 25%; text-align: center; height: 75px; vertical-align: top; padding: 6px;">
            <b>Điểm</b>
          </td>
          <td style="border: 1px solid #000; width: 50%; text-align: center; vertical-align: top; padding: 6px;">
            <b>Nhận xét của giáo viên</b>
          </td>
          <td style="border: 1px solid #000; width: 25%; text-align: center; vertical-align: top; padding: 6px;">
            <b>Chữ kí của PHHS</b>
          </td>
        </tr>
      </table>

      <!-- PHẦN I: TRẮC NGHIỆM -->
      <div style="font-weight: bold; font-size: 13.5pt; margin: 12px 0 4px 0;">I. PHẦN TRẮC NGHIỆM (${mcqScoreStr} điểm)</div>
      <p style="margin: 0 0 10px 0; font-style: italic;">Khoanh vào chữ cái đặt trước câu trả lời đúng:</p>

      ${(exam.multipleChoice || []).map(function(q) {
        return `
          <div style="margin-bottom: 10px;" contenteditable="true">
            <b>Câu ${q.num}</b> (${q.score ? q.score.toString().replace('.', ',') : '0,5'} điểm - ${q.level || 'Mức 1'}): ${q.text}
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.35rem; padding-left: 1.25rem; margin-top: 4px;">
              ${(q.options || []).map(function(opt) { return `<div>${opt}</div>`; }).join('')}
            </div>
          </div>
        `;
      }).join('')}

      <!-- PHẦN II: TỰ LUẬN -->
      ${(exam.essaySection && exam.essaySection.length > 0) ? `
        <div style="font-weight: bold; font-size: 13.5pt; margin: 18px 0 6px 0;">II. PHẦN TỰ LUẬN (${essayScoreStr} điểm)</div>
        ${exam.essaySection.map(function(e) {
          return `
            <div style="margin-top: 10px; margin-bottom: 14px;" contenteditable="true">
              <b>${e.title || `Câu ${e.num} (${e.score ? e.score.toString().replace('.', ',') : ''} điểm):`}</b> ${e.text}
              <div style="margin-top: 6px;">
                <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
                <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
                <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
                <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
                <div style="border-bottom: 1px dotted #777; height: 24px;"></div>
              </div>
            </div>
          `;
        }).join('')}
      ` : ''}
    </div>

    <!-- NỘI DUNG TAB 2: MA TRẬN ĐỀ THI THÔNG TƯ 27 -->
    <div id="examTabContent_matrix" style="display: ${currentExamActiveTab === 'matrix' ? 'block' : 'none'}; background: #fff; padding: 1.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.35; color: #000;">
      
      <div style="text-align: center; font-weight: bold; font-size: 14pt; text-transform: uppercase; margin-bottom: 4px;">
        MA TRẬN ĐỀ THI HỌC KÌ I MÔN ${exam.subjectName.toUpperCase()} LỚP ${exam.grade} - KẾT NỐI TRI THỨC
      </div>
      <div style="text-align: center; font-size: 12.5pt; margin-bottom: 14px;">
        NĂM HỌC ${exam.schoolYear}
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; text-align: center;">
        <thead>
          <tr style="background: #f1f5f9; font-weight: bold;">
            <th rowspan="3" style="border: 1px solid #000; width: 32%; padding: 6px; text-align: left;">Chủ đề / Bài học</th>
            <th colspan="6" style="border: 1px solid #000; padding: 6px;">Mức độ nhận thức</th>
            <th colspan="2" rowspan="2" style="border: 1px solid #000; padding: 6px;">Tổng số câu</th>
            <th rowspan="3" style="border: 1px solid #000; width: 10%; padding: 6px;">Điểm số</th>
          </tr>
          <tr style="background: #f8fafc; font-weight: bold;">
            <th colspan="2" style="border: 1px solid #000; padding: 4px;">Mức 1<br>(Nhận biết)</th>
            <th colspan="2" style="border: 1px solid #000; padding: 4px;">Mức 2<br>(Kết nối)</th>
            <th colspan="2" style="border: 1px solid #000; padding: 4px;">Mức 3<br>(Vận dụng)</th>
          </tr>
          <tr style="background: #f8fafc; font-weight: bold;">
            <th style="border: 1px solid #000; padding: 4px;">TN</th>
            <th style="border: 1px solid #000; padding: 4px;">TL</th>
            <th style="border: 1px solid #000; padding: 4px;">TN</th>
            <th style="border: 1px solid #000; padding: 4px;">TL</th>
            <th style="border: 1px solid #000; padding: 4px;">TN</th>
            <th style="border: 1px solid #000; padding: 4px;">TL</th>
            <th style="border: 1px solid #000; padding: 4px;">TN</th>
            <th style="border: 1px solid #000; padding: 4px;">TL</th>
          </tr>
        </thead>
        <tbody>
          ${(m.topics || []).map(function(t) {
            return `
              <tr>
                <td style="border: 1px solid #000; padding: 6px; text-align: left; font-weight: 500;">${t.topic}</td>
                <td style="border: 1px solid #000; padding: 6px;">${t.m1_mcq || '-'}</td>
                <td style="border: 1px solid #000; padding: 6px;">${t.m1_essay || '-'}</td>
                <td style="border: 1px solid #000; padding: 6px;">${t.m2_mcq || '-'}</td>
                <td style="border: 1px solid #000; padding: 6px;">${t.m2_essay || '-'}</td>
                <td style="border: 1px solid #000; padding: 6px;">${t.m3_mcq || '-'}</td>
                <td style="border: 1px solid #000; padding: 6px;">${t.m3_essay || '-'}</td>
                <td style="border: 1px solid #000; padding: 6px; font-weight: bold;">${t.total_mcq || 0}</td>
                <td style="border: 1px solid #000; padding: 6px; font-weight: bold;">${t.total_essay || 0}</td>
                <td style="border: 1px solid #000; padding: 6px; font-weight: bold;">${t.score ? t.score.toString().replace('.', ',') : '-'}</td>
              </tr>
            `;
          }).join('')}
          <tr style="font-weight: bold; background: #fafafa;">
            <td style="border: 1px solid #000; padding: 6px; text-align: left;">Tổng số câu TN / TL</td>
            <td style="border: 1px solid #000; padding: 6px;">${s.m1_total_mcq || 0}</td>
            <td style="border: 1px solid #000; padding: 6px;">${s.m1_total_essay || 0}</td>
            <td style="border: 1px solid #000; padding: 6px;">${s.m2_total_mcq || 0}</td>
            <td style="border: 1px solid #000; padding: 6px;">${s.m2_total_essay || 0}</td>
            <td style="border: 1px solid #000; padding: 6px;">${s.m3_total_mcq || 0}</td>
            <td style="border: 1px solid #000; padding: 6px;">${s.m3_total_essay || 0}</td>
            <td style="border: 1px solid #000; padding: 6px;">${s.total_mcq_count || 0}</td>
            <td style="border: 1px solid #000; padding: 6px;">${s.total_essay_count || 0}</td>
            <td style="border: 1px solid #000; padding: 6px;">${(s.total_mcq_count || 0) + (s.total_essay_count || 0)}</td>
          </tr>
          <tr style="font-weight: bold; background: #fafafa;">
            <td style="border: 1px solid #000; padding: 6px; text-align: left;">Điểm số</td>
            <td colspan="2" style="border: 1px solid #000; padding: 6px;">${s.m1_score ? s.m1_score.toString().replace('.', ',') : '-'}</td>
            <td colspan="2" style="border: 1px solid #000; padding: 6px;">${s.m2_score ? s.m2_score.toString().replace('.', ',') : '-'}</td>
            <td colspan="2" style="border: 1px solid #000; padding: 6px;">${s.m3_score ? s.m3_score.toString().replace('.', ',') : '-'}</td>
            <td style="border: 1px solid #000; padding: 6px;">${mcqScoreStr}</td>
            <td style="border: 1px solid #000; padding: 6px;">${essayScoreStr}</td>
            <td style="border: 1px solid #000; padding: 6px;">10,0</td>
          </tr>
          <tr style="font-weight: bold; background: #f1f5f9;">
            <td style="border: 1px solid #000; padding: 6px; text-align: left;">Tỉ lệ %</td>
            <td colspan="2" style="border: 1px solid #000; padding: 6px;">${s.m1_pct || 40}%</td>
            <td colspan="2" style="border: 1px solid #000; padding: 6px;">${s.m2_pct || 40}%</td>
            <td colspan="2" style="border: 1px solid #000; padding: 6px;">${s.m3_pct || 20}%</td>
            <td colspan="2" style="border: 1px solid #000; padding: 6px;">100%</td>
            <td style="border: 1px solid #000; padding: 6px;">100%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- NỘI DUNG TAB 3: HƯỚNG DẪN CHẤM & ĐÁP ÁN -->
    <div id="examTabContent_answers" style="display: ${currentExamActiveTab === 'answers' ? 'block' : 'none'}; background: #fff; padding: 1.5rem; border: 1px solid #cbd5e1; border-radius: 4px; font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.4; color: #000;">
      
      <div style="text-align: center; font-weight: bold; font-size: 14pt; text-transform: uppercase; margin-bottom: 4px;">
        HƯỚNG DẪN CHẤM VÀ ĐÁP ÁN MÔN ${exam.subjectName.toUpperCase()} LỚP ${exam.grade}
      </div>
      <div style="text-align: center; font-size: 12.5pt; margin-bottom: 14px;">
        Bộ sách: Kết nối tri thức với cuộc sống • Năm học ${exam.schoolYear}
      </div>

      <div style="font-weight: bold; font-size: 13.5pt; margin: 12px 0 6px 0;">I. PHẦN TRẮC NGHIỆM (${mcqScoreStr} điểm)</div>
      <p style="margin: 0 0 8px 0; font-style: italic;">Mỗi câu trả lời đúng được ${exam.multipleChoice?.[0]?.score ? exam.multipleChoice[0].score.toString().replace('.', ',') : '0,5'} điểm.</p>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px; text-align: center;">
        <tr style="background: #f1f5f9; font-weight: bold;">
          <td style="border: 1px solid #000; padding: 6px; width: 15%;">Câu hỏi</td>
          ${(exam.multipleChoice || []).map(function(q) {
            return `<td style="border: 1px solid #000; padding: 6px;"><b>Câu ${q.num}</b></td>`;
          }).join('')}
        </tr>
        <tr style="font-weight: bold; font-size: 13.5pt; color: #b91c1c;">
          <td style="border: 1px solid #000; padding: 6px;">Đáp án</td>
          ${(exam.multipleChoice || []).map(function(q) {
            return `<td style="border: 1px solid #000; padding: 6px;">${q.ans || '-'}</td>`;
          }).join('')}
        </tr>
      </table>

      ${(exam.essaySection && exam.essaySection.length > 0) ? `
        <div style="font-weight: bold; font-size: 13.5pt; margin: 18px 0 8px 0;">II. PHẦN TỰ LUẬN (${essayScoreStr} điểm)</div>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f1f5f9; font-weight: bold;">
              <th style="border: 1px solid #000; width: 15%; padding: 6px; text-align: center;">Câu</th>
              <th style="border: 1px solid #000; width: 65%; padding: 6px; text-align: center;">Nội dung đáp án & Các bước giải</th>
              <th style="border: 1px solid #000; width: 20%; padding: 6px; text-align: center;">Biểu điểm</th>
            </tr>
          </thead>
          <tbody>
            ${exam.essaySection.map(function(e) {
              return `
                <tr>
                  <td style="border: 1px solid #000; padding: 8px; text-align: center; vertical-align: top; font-weight: bold;">
                    Câu ${e.num}<br>(${e.score ? e.score.toString().replace('.', ',') : ''} đ)
                  </td>
                  <td style="border: 1px solid #000; padding: 8px; vertical-align: top; white-space: pre-line;">
                    ${e.solution || e.text}
                  </td>
                  <td style="border: 1px solid #000; padding: 8px; text-align: center; vertical-align: top;">
                    ${(e.rubric || []).map(function(r) {
                      return `<div style="margin-bottom: 4px;"><b>${r.score}</b></div>`;
                    }).join('') || `<b>${e.score ? e.score.toString().replace('.', ',') : ''} đ</b>`}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      ` : ''}

    </div>
  `;
}

// Chuyển đổi tabs xem trước
function switchExamTab(tabName) {
  currentExamActiveTab = tabName;
  var elExam = document.getElementById("examTabContent_exam");
  var elMatrix = document.getElementById("examTabContent_matrix");
  var elAnswers = document.getElementById("examTabContent_answers");
  var elReading = document.getElementById("examTabContent_reading");
  var elWriting = document.getElementById("examTabContent_writing");
  var elRubric = document.getElementById("examTabContent_rubric");

  if (elExam) elExam.style.display = (tabName === "exam" ? "block" : "none");
  if (elMatrix) elMatrix.style.display = (tabName === "matrix" ? "block" : "none");
  if (elAnswers) elAnswers.style.display = (tabName === "answers" ? "block" : "none");
  if (elReading) elReading.style.display = (tabName === "reading" ? "block" : "none");
  if (elWriting) elWriting.style.display = (tabName === "writing" ? "block" : "none");
  if (elRubric) elRubric.style.display = (tabName === "rubric" ? "block" : "none");

  var container = document.getElementById("aiOutputContainer");
  if (container && currentExamData) {
    renderExamOutput(currentExamData, container);
  }
}

// Modal Cấu hình nhanh Gemini API Key
function openGeminiApiKeyModal() {
  var key = localStorage.getItem("tvth_gemini_api_key") || "";
  var modalHtml = `
    <div class="modal-overlay" id="geminiKeyModal">
      <div class="modal-content" style="max-width: 480px;">
        <div class="modal-header">
          <h3 style="display: flex; align-items: center; gap: 0.5rem; font-size: 1.1rem; color: #7c3aed;">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Cấu hình Google Gemini AI
          </h3>
          <button class="modal-close-btn" onclick="document.getElementById('geminiKeyModal').remove()">&times;</button>
        </div>
        <div class="modal-body" style="padding: 1.25rem 0;">
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            Nhập <strong>API Key Gemini</strong> miễn phí từ <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color: #7c3aed; font-weight: 700;">Google AI Studio</a> để AI soạn đề không giới hạn, bám sát từng bài học SGK Kết nối tri thức.
          </p>
          <div class="form-group">
            <label style="font-weight: 700; font-size: 0.85rem;">Gemini API Key:</label>
            <input type="password" id="quickGeminiApiKeyInput" class="form-control" value="${key}" placeholder="AIzaSy...">
          </div>
          <div style="background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: var(--radius-sm); padding: 0.75rem; font-size: 0.78rem; color: #6b21a8;">
            <i class="fa-solid fa-shield-halved"></i> Key được lưu trữ an toàn trong trình duyệt của bạn (Local Storage).
          </div>
        </div>
        <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 0.5rem;">
          <button class="btn btn-outline" onclick="document.getElementById('geminiKeyModal').remove()">Đóng</button>
          <button class="btn btn-primary" style="background: linear-gradient(135deg, #7c3aed, #a855f7);" onclick="saveQuickGeminiApiKey()">
            <i class="fa-solid fa-save"></i> Lưu API Key
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function saveQuickGeminiApiKey() {
  var input = document.getElementById("quickGeminiApiKeyInput");
  if (!input) return;
  var key = (input.value || "").trim();
  localStorage.setItem("tvth_gemini_api_key", key);
  showToast(key ? "Đã lưu Gemini API Key thành công!" : "Đã xóa API Key", "success");
  var modal = document.getElementById("geminiKeyModal");
  if (modal) modal.remove();
  if (currentActiveTab === "aiexam") {
    switchMainTab("aiexam");
  }
}

/* ==========================================================================
   VIEW 6: TIỆN ÍCH LỚP HỌC (TOOLKIT)
   ========================================================================== */
function renderToolkitView(container) {
  container.innerHTML = `
    <div class="section-header">
      <div>
        <h2 class="section-title">
          <i class="fa-solid fa-shapes" style="color: #34d399;"></i> 
          Tiện Ích Trợ Giảng Trên Lớp Học
        </h2>
        <p class="section-subtitle">
          Công cụ hỗ trợ tương tác trực tiếp trên màn hình cảm ứng, máy chiếu hoặc tivi lớp học
        </p>
      </div>
    </div>

    <div class="toolkit-deck">
      <div class="tool-panel">
        <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 0.25rem; color: var(--primary);">
          🎯 Vòng Quay Gọi Học Sinh Ngẫu Nhiên
        </h3>
        <p style="font-size: 0.78rem; color: var(--text-muted);">Tạo hứng thú khi kiểm tra bài cũ hoặc thảo luận</p>

        <div class="wheel-frame">
          <div class="wheel-needle"></div>
          <canvas id="wheelCanvas" width="260" height="260"></canvas>
        </div>

        <div id="wheelResult" style="min-height: 35px; margin-bottom: 0.75rem;">
          <span style="color: var(--text-muted); font-size: 0.85rem;">Bấm nút để bắt đầu quay</span>
        </div>

        <button class="btn btn-primary" style="width: 100%;" onclick="ToolkitService.spinWheel()">
          <i class="fa-solid fa-rotate-right"></i> QUAY NGAY
        </button>

        <details style="margin-top: 1rem; width: 100%; text-align: left; font-size: 0.8rem;">
          <summary style="cursor: pointer; color: var(--accent); font-weight: 600;">Chỉnh sửa danh sách học sinh</summary>
          <div style="margin-top: 0.45rem;">
            <textarea id="studentListInput" class="form-control" rows="4">${ToolkitService.students.join('\n')}</textarea>
            <button class="btn btn-sm btn-outline" style="margin-top: 0.4rem; width: 100%;" onclick="ToolkitService.updateStudentList(document.getElementById('studentListInput').value)">
              Cập nhật danh sách
            </button>
          </div>
        </details>
      </div>

      <div class="tool-panel">
        <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 0.25rem; color: var(--primary);">
          ⏰ Đồng Hồ Bấm Giờ Thảo Luận Nhóm
        </h3>
        <p style="font-size: 0.78rem; color: var(--text-muted);">Tính giờ làm bài tập, thảo luận nhóm theo mốc chuẩn</p>

        <div class="clock-timer-text" id="timerDisplay">03:00</div>

        <div style="display: flex; gap: 0.4rem; margin-bottom: 1.15rem; flex-wrap: wrap; justify-content: center;">
          <button class="btn btn-sm btn-outline" onclick="ToolkitService.setTimerPreset(60)">1 Phút</button>
          <button class="btn btn-sm btn-outline" onclick="ToolkitService.setTimerPreset(120)">2 Phút</button>
          <button class="btn btn-sm btn-outline" onclick="ToolkitService.setTimerPreset(180)">3 Phút</button>
          <button class="btn btn-sm btn-outline" onclick="ToolkitService.setTimerPreset(300)">5 Phút</button>
        </div>

        <div style="display: flex; gap: 0.45rem; width: 100%;">
          <button class="btn btn-primary" style="flex: 1;" onclick="ToolkitService.startTimer()">
            <i class="fa-solid fa-play"></i> Bắt Đầu
          </button>
          <button class="btn btn-outline" onclick="ToolkitService.pauseTimer()">
            <i class="fa-solid fa-pause"></i> Tạm Dừng
          </button>
          <button class="btn btn-outline" onclick="ToolkitService.resetTimer()">
            <i class="fa-solid fa-rotate-left"></i> Đặt Lại
          </button>
        </div>
      </div>
    </div>
  `;

  setTimeout(function() {
    ToolkitService.initWheel();
    ToolkitService.updateTimerDisplay();
  }, 100);
}

/* ==========================================================================
   VIEW 7: CẤU HÌNH & QUẢN TRỊ (SETTINGS)
   ========================================================================== */
function renderSettingsView(container) {
  var session = AuthService.getSession();
  var isAdmin = session.role === "admin";
  var pins = AuthService.getValidPins();
  var apiKey = localStorage.getItem("tvth_gemini_api_key") || "";

  container.innerHTML = `
    <div class="section-header">
      <div>
        <h2 class="section-title">
          <i class="fa-solid fa-sliders"></i> 
          Trung Tâm Quản Trị & Cấu Hình Google Drive
        </h2>
        <p class="section-subtitle">
          Quản lý đường dẫn kho lưu trữ, danh sách Mã PIN mở khóa và phân quyền từng tài liệu
        </p>
      </div>
      <div>
        ${isAdmin ? `
          <span class="access-tag-free" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">
            <i class="fa-solid fa-crown" style="color: #d97706;"></i> Quyền Quản trị: Thầy Lê Thành Long
          </span>
        ` : `
          <button class="btn btn-primary" onclick="openAdminLoginModal()">
            <i class="fa-solid fa-lock"></i> Đăng Nhập Quản Trị
          </button>
        `}
      </div>
    </div>

    <!-- Phân Quyền Hàng Loạt (Dành cho Admin) -->
    ${isAdmin ? `
      <div class="ai-ctrl-box" style="margin-bottom: 1.25rem; background: linear-gradient(135deg, #f0fdf4, #eff6ff); border: 1px solid #93c5fd;">
        <h3 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.45rem; color: #1e3a8a;">
          <i class="fa-solid fa-wand-magic-sparkles"></i> Phân Quyền Hàng Loạt Toàn Bộ Kho
        </h3>
        <p style="font-size: 0.8rem; color: #334155; margin-bottom: 0.85rem;">
          Bạn có thể <strong>khóa toàn bộ rồi mở từng cái</strong>, hoặc <strong>mở toàn bộ rồi khóa từng cái</strong>, hoặc <strong>ẩn toàn bộ với khách</strong>:
        </p>
        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
          <button class="btn btn-sm btn-primary" style="background: #d97706;" onclick="AuthService.setBulkPermission('pin')">
            <i class="fa-solid fa-lock"></i> 1. Khóa toàn bộ kho (Cần PIN)
          </button>
          <button class="btn btn-sm btn-primary" style="background: #16a34a;" onclick="AuthService.setBulkPermission('free')">
            <i class="fa-solid fa-unlock"></i> 2. Mở toàn bộ kho (Miễn phí)
          </button>
          <button class="btn btn-sm btn-primary" style="background: #dc2626;" onclick="AuthService.setBulkPermission('hidden')">
            <i class="fa-solid fa-eye-slash"></i> 3. Ẩn toàn bộ kho với khách
          </button>
        </div>
      </div>
    ` : ''}

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem;">
      <div class="ai-ctrl-box">
        <h3 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.65rem; color: var(--primary);">
          <i class="fa-brands fa-google-drive" style="color: #16a34a;"></i> 2 Kho Google Drive Thực Tế
        </h3>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 1rem;">
          Đã kết nối trực tiếp với 2 kho Google Drive của Thầy Lê Thành Long
        </p>

        <div class="form-group">
          <label>1. Folder ID Kho KHBD (535 tệp):</label>
          <input type="text" id="driveKhbdInput" class="form-control" value="${CONFIG.KHBD_FOLDER_ID}" ${!isAdmin ? 'disabled' : ''}>
        </div>

        <div class="form-group">
          <label>2. Folder ID Kho Bài Giảng (81 slide):</label>
          <input type="text" id="drivePptxInput" class="form-control" value="${CONFIG.BAI_GIANG_FOLDER_ID}" ${!isAdmin ? 'disabled' : ''}>
        </div>

        <button class="btn btn-outline" style="width: 100%; margin-top: 0.5rem;" onclick="syncDriveData(true)">
          <i class="fa-solid fa-rotate-right"></i> Đồng bộ lại từ Google Drive
        </button>
      </div>

      <div class="ai-ctrl-box" style="grid-column: 1 / -1;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--primary); display: flex; align-items: center; gap: 0.45rem;">
              <i class="fa-solid fa-key" style="color: #d97706;"></i> Quản Lý & Cấp Mã PIN Cho Giáo Viên / Đồng Nghiệp
            </h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">
              Tạo mã PIN cấp cho từng giáo viên hoặc từng khối lớp. Đồng nghiệp nhập mã này để mở khóa quyền tải về.
            </p>
          </div>
        </div>

        <!-- Form Tạo Mã PIN Mới -->
        ${isAdmin ? `
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1.25rem;">
            <div style="font-weight: 700; font-size: 0.85rem; color: var(--primary); margin-bottom: 0.65rem;">
              <i class="fa-solid fa-plus-circle" style="color: #16a34a;"></i> Tạo Mã PIN Mới:
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.65rem; align-items: flex-end;">
              <div class="form-group" style="margin-bottom: 0;">
                <label style="font-size: 0.78rem;">Mã PIN (viết liền, không dấu):</label>
                <input type="text" id="newPinInput" class="form-control text-uppercase" placeholder="VD: COLAN_2026, THAYNAM...">
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label style="font-size: 0.78rem;">Phạm vi mở khóa:</label>
                <select id="newPinGradeSelect" class="form-select">
                  <option value="all">Mở khóa toàn bộ 5 Khối</option>
                  <option value="1">Chỉ mở Khối 1</option>
                  <option value="2">Chỉ mở Khối 2</option>
                  <option value="3">Chỉ mở Khối 3</option>
                  <option value="4">Chỉ mở Khối 4</option>
                  <option value="5">Chỉ mở Khối 5</option>
                </select>
              </div>
              <div class="form-group" style="margin-bottom: 0;">
                <label style="font-size: 0.78rem;">Ghi chú người nhận:</label>
                <input type="text" id="newPinDescInput" class="form-control" placeholder="VD: Cấp cho cô Lan - Khối 5">
              </div>
              <div>
                <button class="btn btn-primary" style="width: 100%; height: 38px;" onclick="addNewPinCode()">
                  <i class="fa-solid fa-check"></i> Tạo & Cấp Mã
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Danh Sách Mã PIN & Thành Viên Đang Kích Hoạt -->
        <div style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-sm); overflow-x: auto;">
          <table class="formal-matrix-table" style="margin: 0;">
            <thead>
              <tr style="background: #f1f5f9;">
                <th style="width: 20%;">Mã PIN / SĐT</th>
                <th style="width: 15%;">Phạm Vi</th>
                <th style="width: 15%;">Thiết Bị</th>
                <th style="width: 20%;">Thời Hạn</th>
                <th style="width: 30%; text-align: center;">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              ${pins.map(function(p) {
                var gradeLabel = p.grade === 'all' ? 'Tất cả 5 khối' : ('Khối ' + p.grade);
                var devCount = (p.devices && Array.isArray(p.devices)) ? p.devices.length : 0;
                var devBadge = devCount >= 2 ? '<span style="color:#dc2626; font-weight:700;">2/2 (Đầy)</span>' : (`<span style="color:#16a34a; font-weight:700;">${devCount}/2</span>`);
                
                var now = Date.now();
                var isExpired = p.expiresAt && now > p.expiresAt;
                var daysLeft = p.expiresAt ? Math.max(0, Math.ceil((p.expiresAt - now)/(1000*60*60*24))) : 7;
                var expBadge = isExpired ? '<span style="color:#dc2626; font-size:0.75rem; font-weight:700;">Đã hết hạn</span>' : (`<span style="color:#0284c7; font-size:0.75rem;">Còn ${daysLeft} ngày</span>`);

                return `
                  <tr>
                    <td>
                      <strong style="color: #1e3a8a; font-family: monospace; font-size: 0.95rem; background: #e0f2fe; padding: 0.2rem 0.5rem; border-radius: 4px;">
                        ${p.code}
                      </strong>
                      <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">${p.desc || ''}</div>
                    </td>
                    <td>
                      <span class="access-tag-free">${gradeLabel}</span>
                    </td>
                    <td>
                      ${devBadge}
                    </td>
                    <td>
                      ${expBadge}
                    </td>
                    <td style="text-align: center;">
                      <div style="display: flex; gap: 0.35rem; justify-content: center; flex-wrap: wrap;">
                        <button class="btn btn-sm btn-outline" style="font-size: 0.72rem; padding: 0.2rem 0.4rem;" onclick="copyPinShareMessage('${p.code}', '${p.grade}', '${p.desc || ''}')" title="Sao chép tin nhắn gửi qua Zalo / Facebook">
                          <i class="fa-solid fa-share-nodes" style="color: #0284c7;"></i> Zalo
                        </button>
                        ${isAdmin ? `
                          <button class="btn btn-sm btn-outline" style="font-size: 0.72rem; padding: 0.2rem 0.4rem; color: #d97706; border-color: #fde68a;" onclick="resetPinDevicesPrompt('${p.code}')" title="Reset để cho phép đổi sang 2 máy tính mới">
                            <i class="fa-solid fa-rotate-left"></i> Reset Máy
                          </button>
                          <button class="btn btn-sm btn-outline" style="font-size: 0.72rem; padding: 0.2rem 0.4rem; color: #16a34a; border-color: #bbf7d0;" onclick="extendPinDaysPrompt('${p.code}')" title="Gia hạn thêm 7 ngày">
                            <i class="fa-solid fa-calendar-plus"></i> +7 Ngày
                          </button>
                          <button class="btn btn-sm btn-outline" style="font-size: 0.72rem; padding: 0.2rem 0.4rem; color: #dc2626; border-color: #fca5a5;" onclick="AuthService.deletePin('${p.code}')" title="Thu hồi mã PIN này">
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Khung Đổi Mật Khẩu Admin -->
      <div class="ai-ctrl-box">
        <h3 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.65rem; color: var(--primary);">
          <i class="fa-solid fa-shield-halved" style="color: #dc2626;"></i> Đổi Mật Khẩu Quản Trị Viên (Admin)
        </h3>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 1rem;">
          Đổi mật khẩu tài khoản Thầy Lê Thành Long (đồng bộ lưu trữ an toàn trên máy chủ Google)
        </p>

        <div class="form-group">
          <label>Mật khẩu hiện tại:</label>
          <input type="password" id="adminOldPassInput" class="form-control" placeholder="Nhập mật khẩu hiện tại...">
        </div>

        <div class="form-group">
          <label>Mật khẩu mới:</label>
          <input type="password" id="adminNewPassInput" class="form-control" placeholder="Nhập mật khẩu mới (ít nhất 4 ký tự)...">
        </div>

        <div class="form-group">
          <label>Xác nhận mật khẩu mới:</label>
          <input type="password" id="adminConfirmPassInput" class="form-control" placeholder="Nhập lại mật khẩu mới...">
        </div>

        <button class="btn btn-primary" id="btn-submit-change-pass" style="background: #dc2626; border-color: #dc2626;" onclick="handleAdminChangePassword()">
          <i class="fa-solid fa-key"></i> Đổi Mật Khẩu
        </button>
      </div>

      <div class="ai-ctrl-box">
        <h3 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.65rem; color: var(--primary);">
          <i class="fa-solid fa-wand-magic-sparkles" style="color: #8b5cf6;"></i> Google Gemini AI API Key
        </h3>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 1rem;">
          Nhập API key để kích hoạt tính năng sinh đề nâng cao qua AI trực tuyến
        </p>

        <div class="form-group">
          <label>Gemini API Key (Google AI Studio):</label>
          <input type="password" id="geminiApiKeyInput" class="form-control" value="${apiKey}" placeholder="AIzaSy...">
        </div>

        <button class="btn btn-primary" style="background: linear-gradient(135deg, #7c3aed, #c084fc);" onclick="saveGeminiApiKey()">
          <i class="fa-solid fa-check"></i> Lưu API Key
        </button>
      </div>
    </div>
  `;
}

async function handleAdminChangePassword() {
  var oldPass = (document.getElementById("adminOldPassInput")?.value || "").trim();
  var newPass = (document.getElementById("adminNewPassInput")?.value || "").trim();
  var confirmPass = (document.getElementById("adminConfirmPassInput")?.value || "").trim();
  var btn = document.getElementById("btn-submit-change-pass");

  if (!oldPass) {
    showToast("Vui lòng nhập mật khẩu hiện tại!", "error");
    return;
  }
  if (!newPass || newPass.length < 4) {
    showToast("Mật khẩu mới phải có ít nhất 4 ký tự!", "error");
    return;
  }
  if (newPass !== confirmPass) {
    showToast("Mật khẩu xác nhận không khớp!", "error");
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang đổi mật khẩu...';
  }

  var res = await AuthService.changeAdminPassword(oldPass, newPass);

  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-key"></i> Đổi Mật Khẩu';
  }

  if (res.success) {
    showToast(res.msg, "success");
    document.getElementById("adminOldPassInput").value = "";
    document.getElementById("adminNewPassInput").value = "";
    document.getElementById("adminConfirmPassInput").value = "";
  } else {
    showToast(res.msg || "Không thể đổi mật khẩu!", "error");
  }
}

function addNewPinCode() {
  var input = document.getElementById("newPinInput");
  var gradeSelect = document.getElementById("newPinGradeSelect");
  var descInput = document.getElementById("newPinDescInput");

  var code = input ? input.value.trim().toUpperCase() : "";
  var grade = gradeSelect ? gradeSelect.value : "all";
  var desc = descInput ? descInput.value.trim() : "";

  if (!code) {
    showToast("Vui lòng nhập mã PIN cần cấp!", "error");
    return;
  }

  var res = AuthService.addPin(code, grade, desc);
  if (res.success) {
    if (input) input.value = "";
    if (descInput) descInput.value = "";
    renderCurrentView();
    showToast("Đã tạo và cấp mã PIN " + code + " thành công!", "success");
  } else {
    showToast(res.msg || "Không thể tạo mã PIN", "error");
  }
}

async function resetPinDevicesPrompt(code) {
  if (!confirm(`Bạn có chắc chắn muốn RESET thiết bị cho mã ${code}?\nKhách sẽ có thể đăng nhập trên 2 máy tính mới.`)) return;

  var token = AuthService.getAdminToken();
  try {
    var url = CONFIG.API_URL + "?action=reset_pin_devices&code=" + encodeURIComponent(code) + "&adminToken=" + encodeURIComponent(token);
    var res = await fetch(url);
    var json = await res.json();
    if (json && json.success) {
      showToast(json.message || "Đã reset thiết bị thành công!", "success");
      // Cập nhật local
      var pins = AuthService.getValidPins();
      var item = pins.find(p => p.code === code);
      if (item) { item.devices = []; item.deviceDetails = []; AuthService.savePins(pins); }
      renderCurrentView();
    } else {
      showToast(json.error || "Không thể reset thiết bị", "error");
    }
  } catch(e) {
    showToast("Lỗi kết nối máy chủ Google!", "error");
  }
}

async function extendPinDaysPrompt(code) {
  var daysStr = prompt(`Nhập số ngày muốn gia hạn thêm cho mã ${code}:`, "7");
  if (!daysStr) return;
  var days = parseInt(daysStr, 10);
  if (isNaN(days) || days <= 0) return;

  var token = AuthService.getAdminToken();
  try {
    var url = CONFIG.API_URL + "?action=extend_pin_days&code=" + encodeURIComponent(code) + "&days=" + days + "&adminToken=" + encodeURIComponent(token);
    var res = await fetch(url);
    var json = await res.json();
    if (json && json.success) {
      showToast(json.message || `Đã gia hạn thêm ${days} ngày thành công!`, "success");
      var pins = AuthService.getValidPins();
      var item = pins.find(p => p.code === code);
      if (item && json.expiresAt) { item.expiresAt = json.expiresAt; AuthService.savePins(pins); }
      renderCurrentView();
    } else {
      showToast(json.error || "Không thể gia hạn", "error");
    }
  } catch(e) {
    showToast("Lỗi kết nối máy chủ Google!", "error");
  }
}

function copyPinShareMessage(code, grade, desc) {
  var gradeText = grade === "all" ? "Toàn bộ 5 Khối (Khối 1 đến Khối 5)" : ("Khối " + grade);
  var msg = "Thầy Lê Thành Long gửi bạn mã PIN mở khóa tải tài liệu thư viện:\n" +
            "🔑 Mã PIN: " + code + "\n" +
            "📚 Phạm vi tải: " + gradeText + (desc ? (" (" + desc + ")") : "") + "\n" +
            "👉 Bạn truy cập vào web, bấm nút 'Nhập PIN' ở góc dưới menu để tải giáo án Word & bài giảng PowerPoint nhé!";

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(msg).then(function() {
      showToast("Đã sao chép tin nhắn gửi đồng nghiệp vào bộ nhớ tạm! Bạn có thể dán vào Zalo/Facebook.", "success");
    }).catch(function() {
      prompt("Sao chép tin nhắn gửi đồng nghiệp:", msg);
    });
  } else {
    prompt("Sao chép tin nhắn gửi đồng nghiệp:", msg);
  }
}

function saveGeminiApiKey() {
  var input = document.getElementById("geminiApiKeyInput");
  var key = input ? input.value.trim() : "";
  localStorage.setItem("tvth_gemini_api_key", key);
  showToast("Đã lưu Gemini API Key thành công!", "success");
}

/* ==========================================================================
   VIEW 8: TÌM KIẾM TOÀN DIỆN (SEARCH)
   ========================================================================== */
function renderSearchView(container) {
  var query = (document.getElementById("search-input")?.value || "").trim().toLowerCase();

  var pptxMatches = (DATABASE.pptxList || []).filter(function(item) {
    return AuthService.isVisibleToFileList(item) && (item.name.toLowerCase().includes(query) || (item.folderPath && item.folderPath.toLowerCase().includes(query)));
  });

  var khbdMatches = (DATABASE.khbdList || []).filter(function(item) {
    return AuthService.isVisibleToFileList(item) && (item.name.toLowerCase().includes(query) || (item.folderPath && item.folderPath.toLowerCase().includes(query)));
  });

  container.innerHTML = `
    <div class="section-header">
      <div>
        <h2 class="section-title">
          <i class="fa-solid fa-magnifying-glass"></i> 
          Kết Quả Tìm Kiếm: "${query}"
        </h2>
        <p class="section-subtitle">
          Tìm thấy ${pptxMatches.length} bài giảng PPTX và ${khbdMatches.length} kế hoạch bài dạy KHBD
        </p>
      </div>
    </div>

    <!-- PPTX Results -->
    <h3 style="font-size: 1.05rem; font-weight: 800; margin: 1.25rem 0 0.85rem; color: var(--color-powerpoint);">
      <i class="fa-solid fa-file-powerpoint"></i> Bài Giảng Điện Tử PowerPoint (${pptxMatches.length})
    </h3>
    <div class="file-cards-grid">
      ${pptxMatches.length > 0 ? pptxMatches.slice(0, 12).map(function(item) { return renderFileCardHtml(item); }).join('') : `
        <div style="grid-column: 1/-1; color: var(--text-muted);">Không có bài giảng PPTX nào khớp với từ khóa</div>
      `}
    </div>

    <!-- KHBD Results -->
    <h3 style="font-size: 1.05rem; font-weight: 800; margin: 1.75rem 0 0.85rem; color: var(--color-word);">
      <i class="fa-solid fa-file-word"></i> Kế Hoạch Bài Dạy KHBD Word (${khbdMatches.length})
    </h3>
    <div class="file-cards-grid">
      ${khbdMatches.length > 0 ? khbdMatches.slice(0, 12).map(function(item) { return renderFileCardHtml(item); }).join('') : `
        <div style="grid-column: 1/-1; color: var(--text-muted);">Không có giáo án nào khớp với từ khóa</div>
      `}
    </div>
  `;
}

/* ==========================================================================
   UI CARD RENDERER (HIỂN THỊ QUYỀN TỪNG TÀI LIỆU & NÚT ADMIN ĐỔI QUYỀN)
   ========================================================================== */
function renderFileCardHtml(file) {
  if (!AuthService.isVisibleToFileList(file)) return "";

  var fileIcon = "fa-file";
  var iconColor = "#64748b";
  var formatBadge = file.extension ? file.extension.toUpperCase() : "FILE";

  var lower = (file.name || "").toLowerCase();
  if (lower.endsWith(".docx") || lower.endsWith(".doc")) {
    fileIcon = "fa-file-word";
    iconColor = "var(--color-word)";
    formatBadge = "DOCX";
  } else if (lower.endsWith(".pptx") || lower.endsWith(".ppt")) {
    fileIcon = "fa-file-powerpoint";
    iconColor = "var(--color-powerpoint)";
    formatBadge = "PPTX";
  } else if (lower.endsWith(".pdf")) {
    fileIcon = "fa-file-pdf";
    iconColor = "var(--color-pdf)";
    formatBadge = "PDF";
  }

  var perm = AuthService.getFilePermission(file);
  var session = AuthService.getSession();
  var isAdmin = session.role === "admin";
  var canDl = AuthService.canDownload(file);

  var permBadgeHtml = '<span class="access-tag-free">🟢 Miễn phí</span>';
  if (perm === "pin") {
    if (canDl) {
      permBadgeHtml = '<span class="access-tag-unlocked"><i class="fa-solid fa-unlock-keyhole"></i> Đã mở khóa</span>';
    } else {
      permBadgeHtml = '<span class="access-tag-pin"><i class="fa-solid fa-lock"></i> Cần PIN</span>';
    }
  } else if (perm === "hidden") {
    permBadgeHtml = '<span class="access-tag-hidden"><i class="fa-solid fa-eye-slash"></i> Ẩn với khách</span>';
  }

  return `
    <div class="file-card" style="${perm === 'hidden' ? 'border: 1px dashed #f87171; background: #fffafb;' : ''}">
      <div class="file-card-header">
        <span class="subject-badge-pill" style="background-color: #f1f5f9; color: var(--text-dark);">
          <i class="fa-solid ${fileIcon}" style="color: ${iconColor};"></i> ${formatBadge}
        </span>
        <div style="display: flex; align-items: center; gap: 0.35rem;">
          ${permBadgeHtml}
          ${isAdmin ? `
            <button class="btn btn-sm btn-outline" style="padding: 0.15rem 0.45rem; font-size: 0.7rem; border-color: #94a3b8; background: #ffffff;" onclick="toggleFilePermissionPrompt('${file.id}')" title="Bấm để đổi: 🟢 Miễn phí ➜ 🔒 Cần PIN ➜ 👁️‍🗨️ Ẩn với khách">
              <i class="fa-solid fa-gear"></i>
            </button>
          ` : ''}
        </div>
      </div>

      <h4 class="file-card-title">${file.name}</h4>

      <div class="file-card-meta">
        <span><i class="fa-solid fa-database"></i> ${file.size}</span>
        <span><i class="fa-solid fa-cloud-arrow-down" style="color: #0284c7;"></i> <b data-dl-count-id="${file.id}">${(typeof StatsService !== "undefined" ? StatsService.getFileDownloads(file) : 120)}</b> lượt tải</span>
      </div>

      <div class="file-card-actions">
        <button class="btn btn-sm btn-outline" onclick="handleFileViewer('${file.id}')">
          <i class="fa-solid fa-eye"></i> Xem trước
        </button>
        <button class="btn btn-sm btn-primary" onclick="handleFileDownload('${file.id}')">
          <i class="fa-solid fa-download"></i> Tải về
        </button>
      </div>
    </div>
  `;
}

// ---- LIST VIEW RENDERER ----
function renderFileListRowHtml(file) {
  if (!AuthService.isVisibleToFileList(file)) return "";

  var fileIcon = "fa-file";
  var iconColor = "#64748b";
  var formatBadge = "FILE";

  var lower = (file.name || "").toLowerCase();
  if (lower.endsWith(".docx") || lower.endsWith(".doc")) {
    fileIcon = "fa-file-word"; iconColor = "var(--color-word)"; formatBadge = "DOCX";
  } else if (lower.endsWith(".pptx") || lower.endsWith(".ppt")) {
    fileIcon = "fa-file-powerpoint"; iconColor = "var(--color-powerpoint)"; formatBadge = "PPTX";
  } else if (lower.endsWith(".pdf")) {
    fileIcon = "fa-file-pdf"; iconColor = "var(--color-pdf)"; formatBadge = "PDF";
  }

  var perm = AuthService.getFilePermission(file);
  var session = AuthService.getSession();
  var isAdmin = session.role === "admin";
  var canDl = AuthService.canDownload(file);

  var permBadgeHtml = '<span class="access-tag-free" style="white-space:nowrap;">🟢 Miễn phí</span>';
  if (perm === "pin") {
    permBadgeHtml = canDl
      ? '<span class="access-tag-unlocked" style="white-space:nowrap;"><i class="fa-solid fa-unlock-keyhole"></i> Đã mở</span>'
      : '<span class="access-tag-pin" style="white-space:nowrap;"><i class="fa-solid fa-lock"></i> Cần PIN</span>';
  } else if (perm === "hidden") {
    permBadgeHtml = '<span class="access-tag-hidden" style="white-space:nowrap;"><i class="fa-solid fa-eye-slash"></i> Ẩn</span>';
  }

  return `
    <div class="file-list-row" style="${perm === 'hidden' ? 'border-left: 3px solid #f87171; background: #fffafb;' : ''}">
      <div class="file-list-icon">
        <i class="fa-solid ${fileIcon}" style="color: ${iconColor}; font-size: 1.5rem;"></i>
      </div>
      <div class="file-list-info">
        <div class="file-list-name">${file.name}</div>
        <div class="file-list-meta">
          <span><i class="fa-solid fa-database"></i> ${file.size}</span>
          <span><i class="fa-solid fa-cloud-arrow-down" style="color: #0284c7;"></i> <b data-dl-count-id="${file.id}">${(typeof StatsService !== "undefined" ? StatsService.getFileDownloads(file) : 120)}</b> lượt tải</span>
          <span><i class="fa-regular fa-clock"></i> ${file.updatedAt || 'Hôm nay'}</span>
        </div>
      </div>
      <div class="file-list-badges">
        <span class="subject-badge-pill" style="background:#f1f5f9; color:var(--text-dark); white-space:nowrap;">
          ${formatBadge}
        </span>
        ${permBadgeHtml}
        ${isAdmin ? `<button class="btn btn-sm btn-outline" style="padding:0.15rem 0.4rem;font-size:0.7rem;" onclick="toggleFilePermissionPrompt('${file.id}')" title="Đổi quyền"><i class="fa-solid fa-gear"></i></button>` : ''}
      </div>
      <div class="file-list-actions">
        <button class="btn btn-sm btn-outline" onclick="handleFileViewer('${file.id}')">
          <i class="fa-solid fa-eye"></i> Xem
        </button>
        <button class="btn btn-sm btn-primary" onclick="handleFileDownload('${file.id}')">
          <i class="fa-solid fa-download"></i> Tải
        </button>
      </div>
    </div>
  `;
}

// Render danh sách theo kiểu hiển thị hiện tại
var currentViewMode = localStorage.getItem("tvth_view_mode") || "grid";

function renderFilesHtml(fileList) {
  if (!fileList || fileList.length === 0) return "";
  if (currentViewMode === "list") {
    return '<div class="file-list-container">' +
      fileList.map(function(f) { return renderFileListRowHtml(f); }).join('') +
    '</div>';
  }
  return '<div class="file-cards-grid">' +
    fileList.map(function(f) { return renderFileCardHtml(f); }).join('') +
  '</div>';
}

function setViewMode(mode) {
  currentViewMode = mode;
  localStorage.setItem("tvth_view_mode", mode);
  renderCurrentView();
}

// HTML nút toggle view mode
function renderViewToggleHtml() {
  return `
    <div class="view-mode-toggle" role="group" aria-label="Kiểu hiển thị">
      <button class="view-toggle-btn ${currentViewMode === 'grid' ? 'active' : ''}"
              onclick="setViewMode('grid')" title="Dạng lưới" aria-label="Hiển thị dạng lưới">
        <i class="fa-solid fa-grip"></i>
      </button>
      <button class="view-toggle-btn ${currentViewMode === 'list' ? 'active' : ''}"
              onclick="setViewMode('list')" title="Dạng danh sách" aria-label="Hiển thị dạng danh sách">
        <i class="fa-solid fa-list"></i>
      </button>
    </div>
  `;
}


function toggleFilePermissionPrompt(fileId) {
  var file = DATABASE.allFiles.find(function(f) { return f.id === fileId; });
  if (!file) return;

  var current = AuthService.getFilePermission(file);
  var next = "pin";
  if (current === "free") next = "pin";
  else if (current === "pin") next = "hidden";
  else if (current === "hidden") next = "free";

  AuthService.setFilePermission(fileId, next);
}

function handleFileViewer(fileId) {
  var file = DATABASE.allFiles.find(function(f) { return f.id === fileId; });
  if (file) {
    DriveService.openViewer(file);
  }
}

function handleFileDownload(fileId) {
  var file = DATABASE.allFiles.find(function(f) { return f.id === fileId; });
  if (!file) return;

  if (!AuthService.canDownload(file)) {
    var perm = AuthService.getFilePermission(file);
    if (perm === "hidden") {
      showToast("Tài liệu này được đặt chế độ Ẩn với khách của Quản trị viên (Thầy Lê Thành Long)", "error");
      return;
    }
    openPinModal();
    showToast("Tài liệu được bảo vệ bản quyền. Vui lòng nhập mã PIN để tải về!", "error");
    return;
  }

  DriveService.downloadFile(file);
}

// Global Nav & Filter event listeners
function setupNavigationEvents() {
  document.querySelectorAll(".tree-menu .tree-item").forEach(function(item) {
    item.addEventListener("click", function(e) {
      e.preventDefault();
      var view = item.getAttribute("data-view");
      if (view) {
        navigateTo(view);
      }
    });
  });

  var mobileBtn = document.getElementById("mobile-toggle-btn");
  var sidebar = document.getElementById("app-sidebar");
  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener("click", function() {
      sidebar.classList.toggle("show");
    });
  }
}

function setupSearchEvents() {
  var searchInput = document.getElementById("search-input");
  var clearBtn = document.getElementById("searchClearBtn");

  if (searchInput) {
    // Đảm bảo không bị dính giá trị autofill từ trình duyệt khi tải trang
    searchInput.value = "";
    if (clearBtn) clearBtn.style.display = "none";

    searchInput.addEventListener("input", function(e) {
      var val = e.target.value.trim();
      if (clearBtn) clearBtn.style.display = val ? "block" : "none";
      if (val.length >= 2) {
        navigateTo("search");
      }
    });

    searchInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        navigateTo("search");
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", function() {
      if (searchInput) searchInput.value = "";
      clearBtn.style.display = "none";
      navigateTo("home");
    });
  }
}

function filterByGrade(grade) {
  selectedGrade = grade;
  updateTopGradeFilterUI();
  renderCurrentView();
}

function updateTopGradeFilterUI() {
  document.querySelectorAll(".grade-btn").forEach(function(chip) {
    if (chip.getAttribute("data-grade") === String(selectedGrade)) {
      chip.classList.add("active");
    } else {
      chip.classList.remove("active");
    }
  });
}

// Đồng bộ live từ Google Drive
async function syncDriveData(showToastMsg) {
  if (typeof showToastMsg === "undefined") showToastMsg = true;
  var btn = document.getElementById("btn-refresh-data");
  if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Đang quét...</span>';

  try {
    var res = await fetch(CONFIG.API_URL + "?action=preload_all&folderId=" + CONFIG.KHBD_FOLDER_ID);
    var json = await res.json();
    if (json && json.success) {
      if (showToastMsg) showToast("Đã đồng bộ dữ liệu mới nhất từ Google Drive!", "success");
    }
  } catch (err) {
    console.warn("Sync error:", err);
    if (showToastMsg) showToast("Đang sử dụng dữ liệu đã lưu sẵn!", "info");
  } finally {
    if (btn) btn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> <span>Đồng bộ Drive</span>';
  }
}

// Export functions to window
window.navigateTo = navigateTo;
window.handleFileViewer = handleFileViewer;
window.handleFileDownload = handleFileDownload;
window.toggleFilePermissionPrompt = toggleFilePermissionPrompt;
window.filterByGrade = filterByGrade;
window.selectWeekFilter = selectWeekFilter;
window.selectSubjectFilter = selectSubjectFilter;
// Toggle sidebar accordion menu by element ID
function toggleSidebarMenu(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var subMenu = el.querySelector('.sub-tree-menu');
  var chevron = el.querySelector('.tree-chevron');
  var isOpen = el.classList.contains('open');

  // Close all other sidebar menus first
  var allMenus = document.querySelectorAll('.tree-item-collapsible.open');
  allMenus.forEach(function(m) {
    if (m.id !== id) {
      m.classList.remove('open');
      var sm = m.querySelector('.sub-tree-menu');
      var ch = m.querySelector('.tree-chevron');
      if (sm) sm.style.maxHeight = '0';
      if (ch) { ch.className = 'fa-solid fa-chevron-right tree-chevron'; }
    }
  });

  if (isOpen) {
    el.classList.remove('open');
    if (subMenu) subMenu.style.maxHeight = '0';
    if (chevron) { chevron.className = 'fa-solid fa-chevron-right tree-chevron'; }
  } else {
    el.classList.add('open');
    if (subMenu) subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
    if (chevron) { chevron.className = 'fa-solid fa-chevron-down tree-chevron'; }
  }
}

// Set grade then navigate to a view (khbd / pptx)
function selectGradeAndNavigateTo(grade, view) {
  selectedGrade = String(grade);
  navigateTo(view);
}

window.selectGradeAndNavigate = selectGradeAndNavigate;

window.triggerAiGenerate = triggerAiGenerate;
window.syncDriveData = syncDriveData;
window.addNewPinCode = addNewPinCode;
window.copyPinShareMessage = copyPinShareMessage;
window.saveGeminiApiKey = saveGeminiApiKey;
window.toggleGradeTree = toggleGradeTree;
window.navigateToSubject = navigateToSubject;
window.setViewMode = setViewMode;
window.setSidebarGrade = setSidebarGrade;
window.toggleSidebarMenu = toggleSidebarMenu;
window.selectGradeAndNavigateTo = selectGradeAndNavigateTo;
window.toggleSidebarSection = toggleSidebarSection;
window.toggleSidebarGrade = toggleSidebarGrade;
window.selectSubjectAndNavigateTo = selectSubjectAndNavigateTo;
window.selectWeekAndNavigateTo = selectWeekAndNavigateTo;

// AI Exam Generator Window Bindings
window.onExamGradeChange = onExamGradeChange;
window.onExamScopePresetChange = onExamScopePresetChange;
window.onExamScoreRatioChange = onExamScoreRatioChange;
window.setExamScoreRatio = setExamScoreRatio;
window.updateCognitiveTotal = updateCognitiveTotal;
window.setCognitivePreset = setCognitivePreset;
window.triggerAiGenerate = triggerAiGenerate;
window.switchExamTab = switchExamTab;
window.openGeminiApiKeyModal = openGeminiApiKeyModal;
window.saveQuickGeminiApiKey = saveQuickGeminiApiKey;

// AI Integration Window Bindings
window.onIntegrationGradeChange = onIntegrationGradeChange;
window.onIntegrationSubjectChange = onIntegrationSubjectChange;
window.onIntegrationDurationChange = onIntegrationDurationChange;
window.onIntegrationStartWeekChange = onIntegrationStartWeekChange;
window.onIntegrationTopicChange = onIntegrationTopicChange;
window.triggerAnalyzeIntegrationPlan = triggerAnalyzeIntegrationPlan;
window.toggleIntegrationLessonSelect = toggleIntegrationLessonSelect;
window.toggleSelectAllIntegrationLessons = toggleSelectAllIntegrationLessons;
window.triggerApplyAndPreviewIntegration = triggerApplyAndPreviewIntegration;
window.switchIntegrationPreviewLesson = switchIntegrationPreviewLesson;
window.triggerExportIntegrationWord = triggerExportIntegrationWord;






/* ==========================================================================
   TRỢ LÝ AI TÍCH HỢP GIÁO ÁN TỰ ĐỘNG (CHUẨN CÔNG VĂN 2345/BGDĐT-GDTH)
   ========================================================================== */

var integrationState = {
  grade: 5,
  subjectKey: 'toan',
  durationWeeks: 1, // 1, 2, or 4
  startWeek: 1,
  topicKey: 'gddp',
  customTopicTitle: '',
  customNotes: '',
  analyzedPlan: null,
  selectedLessons: {},
  appliedLessons: null,
  activePreviewLessonIndex: 0,
  isAnalyzing: false,
  isApplying: false
};

function getIntegrationSubjectsForGrade(grade) {
  var g = parseInt(grade) || 5;
  var subjs = [
    { key: 'toan', name: 'Toán', icon: 'fa-calculator' },
    { key: 'tieng_viet', name: 'Tiếng Việt', icon: 'fa-book-open' }
  ];
  if (g <= 3) {
    subjs.push({ key: 'tnxh', name: 'Tự nhiên và Xã hội', icon: 'fa-leaf' });
  } else {
    subjs.push({ key: 'khoa_hoc', name: 'Khoa học', icon: 'fa-flask' });
    subjs.push({ key: 'lich_su_dia_ly', name: 'Lịch sử và Địa lí', icon: 'fa-earth-asia' });
  }
  subjs.push({ key: 'dao_duc', name: 'Đạo đức', icon: 'fa-heart' });
  subjs.push({ key: 'hdtn', name: 'Hoạt động trải nghiệm', icon: 'fa-compass' });
  if (g >= 3) {
    subjs.push({ key: 'cong_nghe', name: 'Công nghệ', icon: 'fa-microchip' });
  }
  return subjs;
}

function renderAiIntegrationView(container) {
  var curGrade = integrationState.grade;
  var subjects = getIntegrationSubjectsForGrade(curGrade);
  var curSubj = integrationState.subjectKey;
  if (!subjects.some(function(s) { return s.key === curSubj; })) {
    curSubj = subjects[0].key;
    integrationState.subjectKey = curSubj;
  }

  var topics = (typeof IntegrationService !== 'undefined' && IntegrationService.TOPICS) ? IntegrationService.TOPICS : {};
  var endWeek = Math.min(35, integrationState.startWeek + integrationState.durationWeeks - 1);

  container.innerHTML = `
    <div class="section-header">
      <div>
        <h2 class="section-title">
          <i class="fa-solid fa-layer-group" style="color: #ec4899;"></i> 
          Trợ Lý AI Tích Hợp Giáo Án Tự Động
        </h2>
        <p class="section-subtitle">
          Số hóa 100% KHBD Kết nối tri thức • Tích hợp chuẩn Công văn 2345/BGDĐT-GDTH • Chèn vào 3 vị trí (YCCĐ, ĐDDH, Hoạt động GV-HS) • Xuất file Word (.doc) hoàn chỉnh
        </p>
      </div>
      <div>
        <span class="tree-badge badge-ai" style="background: linear-gradient(135deg, #db2777, #ec4899); color: white; padding: 0.45rem 0.85rem; font-size: 0.85rem; font-weight: 800;">
          <i class="fa-solid fa-wand-magic-sparkles"></i> AI Engine 2026
        </span>
      </div>
    </div>

    <div class="ai-layout-container" style="display: grid; grid-template-columns: 380px 1fr; gap: 1.25rem; align-items: start;">
      
      <!-- CỘT ĐIỀU KHIỂN BÊN TRÁI -->
      <div class="ai-ctrl-box" style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; box-shadow: var(--shadow-sm);">
        
        <div style="font-size: 0.76rem; font-weight: 800; color: #db2777; background: #fdf2f8; border: 1px solid #fbcfe8; padding: 0.35rem 0.75rem; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <span><i class="fa-solid fa-sliders"></i> THIẾT LẬP TÍCH HỢP</span>
          <span style="color: #16a34a;"><i class="fa-solid fa-circle-check"></i> CV 2345 Chuẩn</span>
        </div>

        <!-- 1. KHỐI LỚP & MÔN HỌC -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; margin-bottom: 0.75rem;">
          <div class="form-group" style="margin-bottom: 0;">
            <label for="integGradeSelect" style="font-weight: 700; font-size: 0.82rem; color: #334155;">1. Khối Lớp:</label>
            <select id="integGradeSelect" class="form-select" onchange="onIntegrationGradeChange(this.value)">
              <option value="1" ${curGrade === 1 ? 'selected' : ''}>Khối 1 (Lớp 1)</option>
              <option value="2" ${curGrade === 2 ? 'selected' : ''}>Khối 2 (Lớp 2)</option>
              <option value="3" ${curGrade === 3 ? 'selected' : ''}>Khối 3 (Lớp 3)</option>
              <option value="4" ${curGrade === 4 ? 'selected' : ''}>Khối 4 (Lớp 4)</option>
              <option value="5" ${curGrade === 5 ? 'selected' : ''}>Khối 5 (Lớp 5)</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label for="integSubjectSelect" style="font-weight: 700; font-size: 0.82rem; color: #334155;">2. Môn Học:</label>
            <select id="integSubjectSelect" class="form-select" onchange="onIntegrationSubjectChange(this.value)">
              ${subjects.map(function(s) {
                return `<option value="${s.key}" ${s.key === curSubj ? 'selected' : ''}>${s.name}</option>`;
              }).join('')}
            </select>
          </div>
        </div>

        <!-- 2. THỜI LƯỢNG TÍCH HỢP (1 TUẦN, 2 TUẦN, 4 TUẦN) -->
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label style="font-weight: 700; font-size: 0.82rem; color: #334155; display: flex; justify-content: space-between;">
            <span>3. Thời lượng tích hợp:</span>
            <span style="font-size: 0.74rem; color: #db2777; font-weight: 800;">Tối ưu tốc độ AI</span>
          </label>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.4rem; margin-top: 0.25rem;">
            <label style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem 0.25rem; border: 1.5px solid ${integrationState.durationWeeks === 1 ? '#db2777' : 'var(--border-color)'}; background: ${integrationState.durationWeeks === 1 ? '#fdf2f8' : '#ffffff'}; border-radius: var(--radius-sm); cursor: pointer; text-align: center;">
              <input type="radio" name="integDurationRadio" value="1" ${integrationState.durationWeeks === 1 ? 'checked' : ''} onchange="onIntegrationDurationChange(1)" style="display: none;">
              <strong style="font-size: 0.85rem; color: ${integrationState.durationWeeks === 1 ? '#db2777' : 'inherit'};">1 Tuần</strong>
              <small style="font-size: 0.68rem; color: var(--text-muted);">Nhanh nhất</small>
            </label>
            <label style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem 0.25rem; border: 1.5px solid ${integrationState.durationWeeks === 2 ? '#db2777' : 'var(--border-color)'}; background: ${integrationState.durationWeeks === 2 ? '#fdf2f8' : '#ffffff'}; border-radius: var(--radius-sm); cursor: pointer; text-align: center;">
              <input type="radio" name="integDurationRadio" value="2" ${integrationState.durationWeeks === 2 ? 'checked' : ''} onchange="onIntegrationDurationChange(2)" style="display: none;">
              <strong style="font-size: 0.85rem; color: ${integrationState.durationWeeks === 2 ? '#db2777' : 'inherit'};">2 Tuần</strong>
              <small style="font-size: 0.68rem; color: var(--text-muted);">Nửa tháng</small>
            </label>
            <label style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem 0.25rem; border: 1.5px solid ${integrationState.durationWeeks === 4 ? '#db2777' : 'var(--border-color)'}; background: ${integrationState.durationWeeks === 4 ? '#fdf2f8' : '#ffffff'}; border-radius: var(--radius-sm); cursor: pointer; text-align: center;">
              <input type="radio" name="integDurationRadio" value="4" ${integrationState.durationWeeks === 4 ? 'checked' : ''} onchange="onIntegrationDurationChange(4)" style="display: none;">
              <strong style="font-size: 0.85rem; color: ${integrationState.durationWeeks === 4 ? '#db2777' : 'inherit'};">4 Tuần</strong>
              <small style="font-size: 0.68rem; color: var(--text-muted);">1 Tháng</small>
            </label>
          </div>
        </div>

        <!-- 3. CHỌN TUẦN BẮT ĐẦU -->
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
            <label for="integStartWeekSelect" style="font-weight: 700; font-size: 0.82rem; color: #334155; margin-bottom: 0;">4. Tuần Bắt Đầu:</label>
            <span id="integWeekRangeBadge" style="font-size: 0.75rem; font-weight: 800; color: #db2777; background: #fdf2f8; padding: 0.15rem 0.5rem; border-radius: 9999px;">
              Áp dụng: Tuần ${integrationState.startWeek} → Tuần ${endWeek}
            </span>
          </div>
          <select id="integStartWeekSelect" class="form-select" onchange="onIntegrationStartWeekChange(this.value)">
            ${Array.from({length: 35}, function(_, i) { return i + 1; }).map(function(w) {
              return `<option value="${w}" ${w === integrationState.startWeek ? 'selected' : ''}>Tuần ${w}</option>`;
            }).join('')}
          </select>
        </div>

        <!-- 4. CHỦ ĐỀ / NỘI DUNG TÍCH HỢP -->
        <div class="form-group" style="margin-bottom: 0.75rem;">
          <label for="integTopicSelect" style="font-weight: 700; font-size: 0.82rem; color: #334155;">5. Nội Dung / Chủ Đề Tích Hợp:</label>
          <select id="integTopicSelect" class="form-select" onchange="onIntegrationTopicChange(this.value)">
            ${Object.keys(topics).map(function(k) {
              return `<option value="${k}" ${k === integrationState.topicKey ? 'selected' : ''}>${topics[k].name}</option>`;
            }).join('')}
          </select>
        </div>

        <!-- TÙY CHỈNH TÊN CHỦ ĐỀ NẾU CHỌN CUSTOM -->
        <div id="integCustomTopicBox" style="display: ${integrationState.topicKey === 'custom' ? 'block' : 'none'}; margin-bottom: 0.75rem;">
          <label for="integCustomTopicInput" style="font-weight: 700; font-size: 0.8rem; color: #db2777;">Tên chủ đề / Nội dung tích hợp tùy chỉnh:</label>
          <input type="text" id="integCustomTopicInput" class="form-control" placeholder="Ví dụ: Lồng ghép Giáo dục Địa phương tỉnh Đồng Nai..." value="${integrationState.customTopicTitle || ''}" oninput="integrationState.customTopicTitle = this.value">
        </div>

        <!-- GHI CHÚ / YÊU CẦU ĐẶC BIỆT CHO AI -->
        <div class="form-group" style="margin-bottom: 1rem;">
          <label for="integCustomNotes" style="font-weight: 700; font-size: 0.82rem; color: #334155;">6. Yêu cầu chi tiết cho AI (Tùy chọn):</label>
          <textarea id="integCustomNotes" class="form-control" rows="2" placeholder="Ví dụ: Tích hợp sâu vào hoạt động Vận dụng, nêu rõ đặc sản / di tích cụ thể..." oninput="integrationState.customNotes = this.value">${integrationState.customNotes || ''}</textarea>
        </div>

        <!-- NÚT BẮT ĐẦU PHÂN TÍCH MA TRẬN BƯỚC 1 -->
        <button id="btnStartIntegAnalyze" class="btn btn-primary" style="width: 100%; padding: 0.8rem; font-size: 0.95rem; font-weight: 800; background: linear-gradient(135deg, #db2777, #ec4899); box-shadow: 0 4px 12px rgba(219, 39, 119, 0.35); border: none;" onclick="triggerAnalyzeIntegrationPlan()">
          <i class="fa-solid fa-wand-magic-sparkles"></i> BƯỚC 1: AI LẬP KẾ HOẠCH TÍCH HỢP
        </button>

      </div>

      <!-- CỘT KẾT QUẢ BÊN PHẢI -->
      <div id="integOutputContainer" class="paper-preview-card" style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; box-shadow: var(--shadow-sm); min-height: 600px;">
        ${renderIntegrationIdleStateHtml()}
      </div>

    </div>
  `;
}

function renderIntegrationIdleStateHtml() {
  return `
    <div style="text-align: center; padding: 4.5rem 1.5rem; color: var(--text-muted);">
      <div style="width: 80px; height: 80px; border-radius: 50%; background: #fdf2f8; color: #db2777; display: inline-flex; align-items: center; justify-content: center; font-size: 2.5rem; margin-bottom: 1.25rem; box-shadow: 0 4px 14px rgba(219, 39, 119, 0.2);">
        <i class="fa-solid fa-layer-group"></i>
      </div>
      <h3 style="color: var(--text-color); font-weight: 800; font-size: 1.3rem; margin-bottom: 0.65rem;">
        Trợ Lý AI Tích Hợp Giáo Án Chuẩn Công Văn 2345
      </h3>
      <p style="font-size: 0.9rem; max-width: 540px; margin: 0 auto 1.5rem; line-height: 1.6;">
        Tự động quét toàn bộ Kế hoạch bài dạy số hóa, xây dựng <strong>Ma trận Tích hợp (Bước 1)</strong> và <strong>Chèn tự động chuẩn 3 vị trí (Bước 2)</strong>, sau đó xuất ra file <strong>Word (.doc)</strong> hoàn chỉnh 100%.
      </p>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 600px; margin: 0 auto; text-align: left;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 0.85rem;">
          <div style="font-weight: 800; color: #db2777; font-size: 0.82rem; margin-bottom: 0.25rem;">
            <i class="fa-solid fa-1"></i> Mục I. YCCĐ
          </div>
          <p style="font-size: 0.76rem; color: var(--text-muted); margin: 0;">Bổ sung phẩm chất & năng lực đặc thù của nội dung tích hợp.</p>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 0.85rem;">
          <div style="font-weight: 800; color: #2563eb; font-size: 0.82rem; margin-bottom: 0.25rem;">
            <i class="fa-solid fa-2"></i> Mục II. ĐDDH
          </div>
          <p style="font-size: 0.76rem; color: var(--text-muted); margin: 0;">Bổ sung đồ dùng, tranh ảnh, video clip trực quan cho GV & HS.</p>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-sm); padding: 0.85rem;">
          <div style="font-weight: 800; color: #16a34a; font-size: 0.82rem; margin-bottom: 0.25rem;">
            <i class="fa-solid fa-3"></i> Mục III. Hoạt động
          </div>
          <p style="font-size: 0.76rem; color: var(--text-muted); margin: 0;">Chèn tiến trình GV - HS trực tiếp vào bảng 2 cột của bài dạy.</p>
        </div>
      </div>
    </div>
  `;
}

// Controller handlers
function onIntegrationGradeChange(grade) {
  integrationState.grade = parseInt(grade) || 5;
  var subjs = getIntegrationSubjectsForGrade(integrationState.grade);
  var subjSelect = document.getElementById('integSubjectSelect');
  if (subjSelect) {
    subjSelect.innerHTML = subjs.map(function(s) {
      return `<option value="${s.key}">${s.name}</option>`;
    }).join('');
    integrationState.subjectKey = subjs[0].key;
  }
}

function onIntegrationSubjectChange(subjKey) {
  integrationState.subjectKey = subjKey;
}

function onIntegrationDurationChange(weeks) {
  integrationState.durationWeeks = parseInt(weeks) || 1;
  // Re-render controls or update UI borders
  var container = document.getElementById('content-container');
  if (container && currentView === 'ai-integration') {
    renderAiIntegrationView(container);
  }
}

function onIntegrationStartWeekChange(week) {
  integrationState.startWeek = parseInt(week) || 1;
  var endWeek = Math.min(35, integrationState.startWeek + integrationState.durationWeeks - 1);
  var badge = document.getElementById('integWeekRangeBadge');
  if (badge) {
    badge.textContent = 'Áp dụng: Tuần ' + integrationState.startWeek + ' → Tuần ' + endWeek;
  }
}

function onIntegrationTopicChange(topicKey) {
  integrationState.topicKey = topicKey;
  var customBox = document.getElementById('integCustomTopicBox');
  if (customBox) {
    customBox.style.display = (topicKey === 'custom') ? 'block' : 'none';
  }
}

// BƯỚC 1: AI LẬP KẾ HOẠCH MA TRẬN TÍCH HỢP
async function triggerAnalyzeIntegrationPlan() {
  if (typeof IntegrationService === 'undefined') {
    showToast('Dịch vụ AI Tích hợp chưa sẵn sàng!', 'danger');
    return;
  }

  var btn = document.getElementById('btnStartIntegAnalyze');
  var output = document.getElementById('integOutputContainer');
  if (!output) return;

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang đọc KHBD & Lập ma trận...';
  }

  output.innerHTML = `
    <div style="text-align: center; padding: 5rem 1rem;">
      <div class="spinner" style="width: 48px; height: 48px; border-width: 4px; border-color: #fbcfe8; border-top-color: #db2777; margin: 0 auto 1.25rem;"></div>
      <h4 style="color: #db2777; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.5rem;">AI đang nghiên cứu Kế hoạch bài dạy...</h4>
      <p style="color: var(--text-muted); font-size: 0.85rem; max-width: 420px; margin: 0 auto;">
        Đang quét nội dung số hóa từ <strong>Tuần ${integrationState.startWeek} đến Tuần ${Math.min(35, integrationState.startWeek + integrationState.durationWeeks - 1)}</strong> môn <strong>${integrationState.subjectKey.toUpperCase()} - Khối ${integrationState.grade}</strong> để tìm địa chỉ tích hợp tối ưu.
      </p>
    </div>
  `;

  try {
    var plan = await IntegrationService.analyzeIntegrationPlan(
      integrationState.grade,
      integrationState.subjectKey,
      integrationState.startWeek,
      integrationState.durationWeeks,
      integrationState.topicKey,
      integrationState.customTopicTitle,
      integrationState.customNotes
    );

    integrationState.analyzedPlan = plan;
    integrationState.selectedLessons = {};
    plan.suggestions.forEach(function(s) {
      integrationState.selectedLessons[s.lessonId] = s.integrate !== false;
    });

    renderIntegrationMatrixView(output, plan);
    showToast('Đã lập Ma trận Tích hợp cho ' + plan.suggestions.length + ' bài dạy thành công!', 'success');

  } catch (err) {
    console.error('Integration analysis error:', err);
    output.innerHTML = `
      <div style="text-align: center; padding: 4rem 1rem; color: #dc2626;">
        <i class="fa-solid fa-circle-exclamation" style="font-size: 3rem; margin-bottom: 1rem;"></i>
        <h4>Có lỗi xảy ra khi phân tích KHBD</h4>
        <p style="font-size: 0.85rem; max-width: 420px; margin: 0 auto 1.5rem;">${err.message || 'Không tìm thấy dữ liệu giáo án số hóa cho phạm vi tuần đã chọn.'}</p>
        <button class="btn btn-primary" onclick="triggerAnalyzeIntegrationPlan()">Thử lại</button>
      </div>
    `;
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> BƯỚC 1: AI LẬP KẾ HOẠCH TÍCH HỢP';
    }
  }
}

function renderIntegrationMatrixView(output, plan) {
  var topicInfo = plan.topicInfo || {};
  var totalSelected = Object.values(integrationState.selectedLessons).filter(Boolean).length;

  output.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.85rem; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
      <div>
        <div style="font-size: 0.75rem; font-weight: 800; color: #db2777; text-transform: uppercase;">
          <i class="fa-solid fa-table"></i> MA TRẬN KẾ HOẠCH TÍCH HỢP (BƯỚC 1/2)
        </div>
        <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-color); margin: 0.15rem 0;">
          Chủ đề: ${topicInfo.name || 'Tích hợp'}
        </h3>
        <div style="font-size: 0.8rem; color: var(--text-muted);">
          Môn: <strong>${plan.subjectName}</strong> • <strong>Khối ${plan.grade}</strong> • <strong>Tuần ${plan.startWeek} - ${plan.endWeek}</strong> (${plan.suggestions.length} bài dạy)
        </div>
      </div>

      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <button id="btnExecuteApplyIntegration" class="btn btn-primary" style="background: linear-gradient(135deg, #16a34a, #22c55e); border: none; font-weight: 800; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.35); padding: 0.6rem 1.15rem;" onclick="triggerApplyAndPreviewIntegration()">
          <i class="fa-solid fa-arrow-right"></i> BƯỚC 2: CHÈN VÀO GIÁO ÁN (<span id="integSelectedCountBadge">${totalSelected}</span> Bài)
        </button>
      </div>
    </div>

    <!-- HƯỚNG DẪN GIÁO VIÊN -->
    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius-sm); padding: 0.75rem 1rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between;">
      <div style="font-size: 0.82rem; color: #166534; display: flex; align-items: center; gap: 0.5rem;">
        <i class="fa-solid fa-circle-info" style="font-size: 1rem;"></i>
        <span>Giáo viên có thể tích chọn/bỏ chọn từng bài dưới đây trước khi AI tiến hành chèn vào giáo án.</span>
      </div>
      <div>
        <button class="btn btn-sm btn-outline" style="font-size: 0.74rem; padding: 0.2rem 0.5rem;" onclick="toggleSelectAllIntegrationLessons(true)">Chọn tất cả</button>
        <button class="btn btn-sm btn-outline" style="font-size: 0.74rem; padding: 0.2rem 0.5rem;" onclick="toggleSelectAllIntegrationLessons(false)">Bỏ chọn tất cả</button>
      </div>
    </div>

    <!-- BẢNG MA TRẬN -->
    <div style="overflow-x: auto; border: 1px solid var(--border-color); border-radius: var(--radius-sm); margin-bottom: 1rem;">
      <table style="width: 100%; border-collapse: collapse; font-size: 0.84rem; text-align: left;">
        <thead>
          <tr style="background: #f8fafc; border-bottom: 2px solid var(--border-color); color: #334155; font-weight: 700;">
            <th style="padding: 0.65rem 0.5rem; text-align: center; width: 45px;">Chọn</th>
            <th style="padding: 0.65rem 0.5rem; text-align: center; width: 60px;">Tuần</th>
            <th style="padding: 0.65rem 0.5rem; text-align: center; width: 70px;">Tiết</th>
            <th style="padding: 0.65rem 0.75rem; width: 220px;">Tên bài dạy (KHBD gốc)</th>
            <th style="padding: 0.65rem 0.6rem; text-align: center; width: 110px;">Mức độ</th>
            <th style="padding: 0.65rem 0.75rem;">Nội dung tích hợp & Hoạt động đề xuất</th>
          </tr>
        </thead>
        <tbody>
          ${plan.suggestions.map(function(s, idx) {
            var isChecked = integrationState.selectedLessons[s.lessonId] !== false;
            var isEven = idx % 2 === 0;
            var levelBadgeColor = s.level === 'Toàn phần' ? 'background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;' :
                                 (s.level === 'Bộ phận' ? 'background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe;' : 'background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0;');

            return `
              <tr style="border-bottom: 1px solid var(--border-color); background: ${isChecked ? (isEven ? '#ffffff' : '#fcfcfc') : '#f8fafc'}; opacity: ${isChecked ? '1' : '0.6'};">
                <td style="padding: 0.65rem 0.5rem; text-align: center;">
                  <input type="checkbox" id="chk_integ_${s.lessonId}" ${isChecked ? 'checked' : ''} onchange="toggleIntegrationLessonSelect('${s.lessonId}')" style="cursor: pointer; width: 16px; height: 16px;">
                </td>
                <td style="padding: 0.65rem 0.5rem; text-align: center; font-weight: 700; color: #db2777;">
                  T.${s.week}
                </td>
                <td style="padding: 0.65rem 0.5rem; text-align: center; font-weight: 600; color: var(--text-muted);">
                  ${s.period || '—'}
                </td>
                <td style="padding: 0.65rem 0.75rem; font-weight: 700; color: #1e293b;">
                  ${s.title}
                </td>
                <td style="padding: 0.65rem 0.6rem; text-align: center;">
                  <span style="font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 9999px; ${levelBadgeColor}">
                    ${s.level}
                  </span>
                </td>
                <td style="padding: 0.65rem 0.75rem;">
                  <div style="font-weight: 700; color: #4338ca; margin-bottom: 0.2rem;">
                    • ${s.integrationTarget}
                  </div>
                  <div style="font-size: 0.78rem; color: #475569; line-height: 1.4;">
                    <i class="fa-solid fa-arrow-turn-down-right" style="color: #db2777; font-size: 0.7rem;"></i> <b>Hoạt động:</b> ${s.activityHook}
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <!-- ACTION BUTTON BƯỚC 2 -->
    <div style="text-align: right; margin-top: 1rem;">
      <button class="btn btn-primary" style="background: linear-gradient(135deg, #16a34a, #22c55e); border: none; font-weight: 800; box-shadow: 0 4px 14px rgba(22, 163, 74, 0.35); padding: 0.75rem 1.5rem; font-size: 0.95rem;" onclick="triggerApplyAndPreviewIntegration()">
        <i class="fa-solid fa-layer-group"></i> TIẾN HÀNH CHÈN VÀO GIÁO ÁN VÀ XEM TRƯỚC (BƯỚC 2)
      </button>
    </div>
  `;
}

function toggleIntegrationLessonSelect(lessonId) {
  integrationState.selectedLessons[lessonId] = !integrationState.selectedLessons[lessonId];
  var count = Object.values(integrationState.selectedLessons).filter(Boolean).length;
  var badge = document.getElementById('integSelectedCountBadge');
  if (badge) badge.textContent = count;
}

function toggleSelectAllIntegrationLessons(checked) {
  if (!integrationState.analyzedPlan) return;
  integrationState.analyzedPlan.suggestions.forEach(function(s) {
    integrationState.selectedLessons[s.lessonId] = checked;
    var chk = document.getElementById('chk_integ_' + s.lessonId);
    if (chk) chk.checked = checked;
  });
  var count = Object.values(integrationState.selectedLessons).filter(Boolean).length;
  var badge = document.getElementById('integSelectedCountBadge');
  if (badge) badge.textContent = count;
}

// BƯỚC 2: CHÈN VÀO GIÁO ÁN VÀ XEM TRƯỚC
async function triggerApplyAndPreviewIntegration() {
  if (!integrationState.analyzedPlan) return;
  var output = document.getElementById('integOutputContainer');
  if (!output) return;

  output.innerHTML = `
    <div style="text-align: center; padding: 5rem 1rem;">
      <div class="spinner" style="width: 48px; height: 48px; border-width: 4px; border-color: #bbf7d0; border-top-color: #16a34a; margin: 0 auto 1.25rem;"></div>
      <h4 style="color: #16a34a; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.5rem;">Đang chèn nội dung tích hợp chuẩn CV 2345...</h4>
      <p style="color: var(--text-muted); font-size: 0.85rem; max-width: 420px; margin: 0 auto;">
        Đang bảo lưu 100% giáo án gốc và bổ sung chính xác vào <strong>Mục I (YCCĐ)</strong>, <strong>Mục II (ĐDDH)</strong> và <strong>Mục III (Hoạt động GV-HS)</strong>...
      </p>
    </div>
  `;

  try {
    var appliedLessons = await IntegrationService.applyIntegrationToWeekRange(
      integrationState.analyzedPlan,
      integrationState.selectedLessons
    );

    integrationState.appliedLessons = appliedLessons;
    integrationState.activePreviewLessonIndex = 0;

    renderIntegratedLessonPreview(output);
    showToast('Đã hoàn tất tích hợp ' + appliedLessons.length + ' bài dạy chuẩn CV 2345!', 'success');

  } catch (err) {
    console.error('Apply integration error:', err);
    output.innerHTML = `
      <div style="text-align: center; padding: 4rem 1rem; color: #dc2626;">
        <i class="fa-solid fa-circle-exclamation" style="font-size: 3rem; margin-bottom: 1rem;"></i>
        <h4>Có lỗi xảy ra khi chèn vào KHBD</h4>
        <p style="font-size: 0.85rem; max-width: 420px; margin: 0 auto 1.5rem;">${err.message || 'Lỗi xử lý chèn giáo án.'}</p>
        <button class="btn btn-primary" onclick="renderIntegrationMatrixView(document.getElementById('integOutputContainer'), integrationState.analyzedPlan)">Quay lại Ma trận</button>
      </div>
    `;
  }
}

function renderIntegratedLessonPreview(output) {
  var lessons = integrationState.appliedLessons || [];
  if (lessons.length === 0) {
    output.innerHTML = renderIntegrationIdleStateHtml();
    return;
  }

  var curIdx = integrationState.activePreviewLessonIndex;
  if (curIdx >= lessons.length) curIdx = 0;
  var currentLesson = lessons[curIdx];

  var topicInfo = (integrationState.analyzedPlan && integrationState.analyzedPlan.topicInfo) || {};
  var topicName = topicInfo.name || 'Tích hợp';

  // Render CV 2345 HTML Preview for currentLesson
  var lessonHtml = (typeof KHBD_REGISTRY !== 'undefined' && typeof KHBD_REGISTRY.renderLessonHtml === 'function')
                   ? KHBD_REGISTRY.renderLessonHtml(currentLesson)
                   : renderFallbackLessonHtml(currentLesson);

  output.innerHTML = `
    <!-- THANH CÔNG CỤ XUẤT FILE & CHỌN BÀI DẠY -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.85rem; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.65rem;">
      <div>
        <div style="font-size: 0.74rem; font-weight: 800; color: #16a34a; text-transform: uppercase;">
          <i class="fa-solid fa-circle-check"></i> ĐÃ TÍCH HỢP HOÀN TẤT (${lessons.length} BÀI DẠY)
        </div>
        <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-color); margin: 0.15rem 0;">
          Kế Hoạch Bài Dạy Chuẩn Công Văn 2345
        </h3>
      </div>

      <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
        <button class="btn btn-outline" style="font-size: 0.82rem; padding: 0.5rem 0.85rem;" onclick="renderIntegrationMatrixView(document.getElementById('integOutputContainer'), integrationState.analyzedPlan)">
          <i class="fa-solid fa-table"></i> Xem lại Ma trận
        </button>
        <button class="btn btn-primary" style="background: linear-gradient(135deg, #2563eb, #3b82f6); border: none; font-weight: 800; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35); padding: 0.55rem 1.15rem;" onclick="triggerExportIntegrationWord()">
          <i class="fa-solid fa-file-word"></i> TẢI TOÀN BỘ FILE WORD (.DOC)
        </button>
      </div>
    </div>

    <!-- CHỌN BÀI ĐỂ XEM TRƯỚC -->
    <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.65rem 0.85rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 0.65rem; flex-wrap: wrap;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <label for="integLessonPicker" style="font-weight: 700; font-size: 0.82rem; color: #334155; margin-bottom: 0; white-space: nowrap;">
          <i class="fa-solid fa-file-lines"></i> Xem trước bài dạy:
        </label>
        <select id="integLessonPicker" class="form-select" style="font-size: 0.82rem; min-width: 260px;" onchange="switchIntegrationPreviewLesson(this.value)">
          ${lessons.map(function(l, i) {
            return `<option value="${i}" ${i === curIdx ? 'selected' : ''}>Tuần ${l.week}: ${l.title || ('Bài ' + (i+1))}</option>`;
          }).join('')}
        </select>
      </div>

      <div style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.76rem;">
        <span style="display: flex; align-items: center; gap: 0.35rem;">
          <span style="width: 12px; height: 12px; background: #e0e7ff; border: 1px solid #c7d2fe; border-radius: 3px; display: inline-block;"></span>
          <span>Nội dung tích hợp mới</span>
        </span>
        <span style="display: flex; align-items: center; gap: 0.35rem;">
          <span style="width: 12px; height: 12px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; display: inline-block;"></span>
          <span>100% Giáo án gốc</span>
        </span>
      </div>
    </div>

    <!-- KHUNG XEM TRƯỚC GIÁO ÁN ĐÃ TÍCH HỢP -->
    <div class="integrated-doc-sheet" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: var(--radius-sm); padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); max-height: 800px; overflow-y: auto; font-family: 'Times New Roman', Times, serif; font-size: 14pt; line-height: 1.45;">
      ${lessonHtml}
    </div>
  `;
}

function switchIntegrationPreviewLesson(idx) {
  integrationState.activePreviewLessonIndex = parseInt(idx) || 0;
  var output = document.getElementById('integOutputContainer');
  if (output) {
    renderIntegratedLessonPreview(output);
  }
}

function triggerExportIntegrationWord() {
  if (!integrationState.appliedLessons || integrationState.appliedLessons.length === 0) {
    showToast('Chưa có dữ liệu giáo án để xuất!', 'warning');
    return;
  }

  var plan = integrationState.analyzedPlan || {};
  var topicName = (plan.topicInfo && plan.topicInfo.name) || 'Tich_Hop';
  var cleanTopic = topicName.replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]/g, '_');
  var filename = 'KHBD_Lop' + (plan.grade || 5) + '_' + (plan.subjectKey || 'mon') + '_Tuan' + (plan.startWeek || 1) + '-' + (plan.endWeek || 1) + '_' + cleanTopic + '.doc';

  IntegrationService.exportToWord(integrationState.appliedLessons, filename);
  showToast('Đã tải xuống file Word thành công: ' + filename, 'success');
}

function renderFallbackLessonHtml(lesson) {
  return '<div style="padding: 1rem;"><h3>' + (lesson.title || 'Kế hoạch bài dạy') + '</h3><p>Đã tích hợp thành công.</p></div>';
}


/* ==========================================================================
   HELPER FUNCTIONS: SKELETON LOADING, EMPTY STATE, DYNAMIC FOOTER
   ========================================================================== */

// Skeleton loading khi data chưa sẵn sàng
function renderLoadingSkeletonHtml() {
  var skeletonCards = '';
  for (var i = 0; i < 6; i++) {
    skeletonCards +=
      '<div style="background:#fff;border:1px solid var(--border-color);border-radius:var(--radius-md);padding:1.15rem;animation:pulse 1.5s ease-in-out infinite;">' +
        '<div style="height:14px;background:#e2e8f0;border-radius:4px;margin-bottom:0.75rem;width:60%"></div>' +
        '<div style="height:12px;background:#f1f5f9;border-radius:4px;margin-bottom:0.5rem;width:90%"></div>' +
        '<div style="height:12px;background:#f1f5f9;border-radius:4px;margin-bottom:1rem;width:75%"></div>' +
        '<div style="height:36px;background:#e2e8f0;border-radius:6px;width:100%"></div>' +
      '</div>';
  }
  return '<div class="file-cards-grid">' + skeletonCards + '</div>';
}

// Empty state component tái sử dụng
function renderEmptyStateHtml(icon, title, desc) {
  return '<div style="grid-column:1/-1;text-align:center;padding:3.5rem 2rem;background:#fff;border-radius:var(--radius-md);border:1px dashed var(--border-color);">' +
    '<div style="width:80px;height:80px;border-radius:50%;background:var(--primary-light);display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;font-size:2rem;color:var(--primary);">' +
      '<i class="fa-solid ' + icon + '"></i>' +
    '</div>' +
    '<h3 style="color:var(--primary);font-size:1.1rem;margin-bottom:0.5rem;">' + title + '</h3>' +
    '<p style="color:var(--text-muted);font-size:0.85rem;max-width:400px;margin:0 auto;">' + desc + '</p>' +
  '</div>';
}

// Cập nhật số liệu footer động
function updateFooterCount() {
  var el = document.getElementById("footer-file-count");
  if (el && typeof DATABASE !== "undefined" && DATABASE.allFiles) {
    el.textContent = DATABASE.allFiles.length;
  }
}
