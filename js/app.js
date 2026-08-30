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
      <div class="formal-hero-pill">
        <i class="fa-solid fa-award" style="color: #facc15;"></i> Chuẩn Chương trình GDPT 2018
      </div>
      <h1 class="formal-hero-title">Thư Viện Bài Giảng & Kế Hoạch Bài Dạy Tiểu Học</h1>
      <p class="formal-hero-desc">
        Hệ thống học liệu số cá nhân được quản trị và cấp quyền bởi <strong>Thầy Lê Thành Long</strong>. 
        Đang hiển thị <strong>${totalKhbd} KHBD</strong> & <strong>${totalPptx} Bài giảng điện tử</strong>.
      </p>
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="navigateTo('pptx')" style="background: #ffffff; color: var(--primary); box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <i class="fa-solid fa-file-powerpoint" style="color: var(--color-powerpoint);"></i> Duyệt Bài Giảng PPTX
        </button>
        <button class="btn btn-outline" style="color: #ffffff; border-color: rgba(255,255,255,0.4);" onclick="navigateTo('khbd')">
          <i class="fa-solid fa-file-word" style="color: #38bdf8;"></i> Kế Hoạch Bài Dạy (${totalKhbd} tệp)
        </button>
        <button class="btn btn-ai-header" onclick="navigateTo('ai-exam')">
          <i class="fa-solid fa-wand-magic-sparkles"></i> Trợ Lý AI Ra Đề (TT 27)
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
          <p>PowerPoint Tuần 1 - 4...</p>
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
      <div class="stat-box" onclick="navigateTo('ai-exam')" style="cursor: pointer;">
        <div class="stat-icon-wrap" style="background-color: #f5f3ff; color: #7c3aed;">
          <i class="fa-solid fa-brain"></i>
        </div>
        <div class="stat-data">
          <h4>AI 2026</h4>
          <p>Soạn Ma Trận Đề TT 27</p>
        </div>
      </div>
      <div class="stat-box" onclick="navigateTo('weekly')" style="cursor: pointer;">
        <div class="stat-icon-wrap" style="background-color: #fff7ed; color: #ea580c;">
          <i class="fa-solid fa-table-columns"></i>
        </div>
        <div class="stat-data">
          <h4>Tổng Hợp Tuần</h4>
          <p>Xem Song Song Word & PPTX</p>
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
   VIEW 5: TRỢ LÝ AI SOẠN ĐỀ KIỂM TRA
   ========================================================================== */
function renderAiExamView(container) {
  var currentGradeNum = selectedGrade === "all" ? 5 : parseInt(selectedGrade);

  container.innerHTML = `
    <div class="section-header">
      <div>
        <h2 class="section-title">
          <i class="fa-solid fa-wand-magic-sparkles" style="color: #c084fc;"></i> 
          Trợ Lý AI Soạn Đề Kiểm Tra Thông Minh
        </h2>
        <p class="section-subtitle">
          Tạo ma trận đề và câu hỏi tự động chuẩn Thông tư 27/2020/TT-BGDĐT & Chuẩn Chương trình GDPT 2018
        </p>

      </div>
    </div>

    <div class="ai-layout-container">
      <div class="ai-ctrl-box">
        <div style="font-size: 0.76rem; font-weight: 700; color: #7c3aed; background: #f5f3ff; padding: 0.25rem 0.65rem; border-radius: var(--radius-full); display: inline-flex; align-items: center; gap: 0.35rem; margin-bottom: 0.85rem;">
          <i class="fa-solid fa-robot"></i> AI Sư Phạm Tiểu Học 2026
        </div>

        <div class="form-group">
          <label for="aiGradeSelect">1. Chọn Khối Lớp:</label>
          <select id="aiGradeSelect" class="form-select">
            <option value="1" ${currentGradeNum === 1 ? 'selected' : ''}>Khối 1</option>
            <option value="2" ${currentGradeNum === 2 ? 'selected' : ''}>Khối 2</option>
            <option value="3" ${currentGradeNum === 3 ? 'selected' : ''}>Khối 3</option>
            <option value="4" ${currentGradeNum === 4 ? 'selected' : ''}>Khối 4</option>
            <option value="5" ${currentGradeNum === 5 ? 'selected' : ''}>Khối 5</option>
          </select>
        </div>

        <div class="form-group">
          <label for="aiSubjectSelect">2. Chọn Môn Học:</label>
          <select id="aiSubjectSelect" class="form-select">
            <option value="TOAN">Toán</option>
            <option value="TIENG_VIET">Tiếng Việt</option>
            <option value="TIENG_ANH">Tiếng Anh</option>
            <option value="TNXH">Tự nhiên & Xã hội</option>
            <option value="KHOA_HOC">Khoa học</option>
            <option value="LICH_SU_DIA_LY">Lịch sử & Địa lý</option>
            <option value="TIN_HOC">Tin học</option>
          </select>
        </div>

        <div class="form-group">
          <label for="aiScopeSelect">3. Phạm Vi Đề Kiểm Tra:</label>
          <select id="aiScopeSelect" class="form-select">
            <option value="Kiểm tra ôn tập Tuần ${selectedWeek}">Theo Tuần ${selectedWeek}</option>
            <option value="Kiểm tra Định kỳ Giữa Học Kỳ I (Tuần 1 - 9)">Giữa Học Kỳ I (Tuần 1 - 9)</option>
            <option value="Kiểm tra Định kỳ Cuối Học Kỳ I (Tuần 1 - 18)">Cuối Học Kỳ I (Tuần 1 - 18)</option>
            <option value="Kiểm tra Định kỳ Giữa Học Kỳ II (Tuần 19 - 27)">Giữa Học Kỳ II (Tuần 19 - 27)</option>
            <option value="Kiểm tra Định kỳ Cuối Năm / Cả Năm (Tuần 1 - 35)">Cuối Năm / Cả Năm (Tuần 1 - 35)</option>
          </select>
        </div>

        <div class="form-group">
          <label for="aiQuestionCount">4. Số lượng câu hỏi trắc nghiệm:</label>
          <select id="aiQuestionCount" class="form-select">
            <option value="6">6 câu (Đề ngắn 20 phút)</option>
            <option value="8" selected>8 câu (Đề chuẩn 35 - 40 phút)</option>
            <option value="10">10 câu (Đề nâng cao)</option>
          </select>
        </div>

        <div class="form-group">
          <label style="display: flex; align-items: center; gap: 0.45rem; cursor: pointer;">
            <input type="checkbox" id="aiEssayCheck" checked> Bao gồm phần Tự luận & Lời văn
          </label>
        </div>

        <div style="background: #f8fafc; border-radius: var(--radius-sm); padding: 0.75rem; font-size: 0.78rem; display: flex; justify-content: space-between; border: 1px solid var(--border-color); margin-top: 0.5rem;">
          <div><i class="fa-solid fa-chart-pie" style="color: var(--primary);"></i> Ma trận TT 27:</div>
          <div><strong>40%</strong> Mức 1 • <strong>40%</strong> Mức 2 • <strong>20%</strong> Mức 3</div>
        </div>

        <button class="btn btn-primary" style="width: 100%; margin-top: 1.15rem; background: linear-gradient(135deg, #7c3aed, #c084fc);" onclick="triggerAiGenerate()">
          <i class="fa-solid fa-wand-magic-sparkles"></i> Bắt Đầu Soạn Đề Tự Động
        </button>
      </div>

      <div class="paper-preview-card" id="aiOutputContainer">
        <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <i class="fa-solid fa-file-circle-plus" style="font-size: 3rem; color: #c4b5fd; margin-bottom: 1rem;"></i>
          <h3>Sẵn sàng tạo đề kiểm tra</h3>
          <p style="font-size: 0.85rem;">Chọn các thông số bên trái và bấm <strong>"Bắt Đầu Soạn Đề Tự Động"</strong> để AI sinh đề và ma trận.</p>
        </div>
      </div>
    </div>
  `;
}

async function triggerAiGenerate() {
  var grade = document.getElementById("aiGradeSelect").value;
  var subjectId = document.getElementById("aiSubjectSelect").value;
  var scope = document.getElementById("aiScopeSelect").value;
  var questionCount = parseInt(document.getElementById("aiQuestionCount").value);
  var essayIncluded = document.getElementById("aiEssayCheck").checked;
  var outputEl = document.getElementById("aiOutputContainer");
  var apiKey = localStorage.getItem("tvth_gemini_api_key") || "";

  outputEl.innerHTML = `
    <div style="text-align: center; padding: 5rem 1rem;">
      <div class="spinner" style="border-top-color: #8b5cf6; margin: 0 auto 1.25rem;"></div>
      <h3 style="color: #7c3aed;">AI đang phân tích chương trình & soạn ma trận đề...</h3>
      <p style="color: var(--text-muted); font-size: 0.85rem;">Áp dụng chuẩn đánh giá Thông tư 27 & Chương trình GDPT 2018</p>
    </div>

  `;

  setTimeout(async function() {
    var exam = await AIService.generateExam({
      grade: grade,
      subjectId: subjectId,
      scope: scope,
      questionCount: questionCount,
      essayIncluded: essayIncluded,
      apiKey: apiKey
    });

    currentExamData = exam;
    renderExamOutput(exam, outputEl);
    showToast("Đã soạn đề kiểm tra thành công!", "success");
  }, 1000);
}

function renderExamOutput(exam, container) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
      <div style="font-weight: 700; color: #16a34a; display: flex; align-items: center; gap: 0.4rem; font-size: 0.9rem;">
        <i class="fa-solid fa-circle-check"></i> Đã hoàn thành đề kiểm tra
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-sm btn-primary" onclick="AIService.exportToWord(currentExamData)">
          <i class="fa-solid fa-file-word"></i> Xuất File Word (.doc)
        </button>
        <button class="btn btn-sm btn-outline" onclick="window.print()">
          <i class="fa-solid fa-print"></i> In Đề
        </button>
      </div>
    </div>

    <div class="exam-paper-sheet">
      <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 0.85rem; margin-bottom: 1.25rem;">
        <div style="font-weight: 700; font-size: 0.82rem; line-height: 1.4;">
          TRƯỜNG TIỂU HỌC: .................................<br>
          TỔ CHUYÊN MÔN KHỐI ${exam.grade}
        </div>
        <div style="text-align: right; font-weight: 700; font-size: 0.82rem; line-height: 1.4;">
          KIỂM TRA ĐỊNH KỲ NĂM HỌC 2025 - 2026<br>
          Môn: ${exam.subjectName} - Lớp ${exam.grade}<br>
          <i>Thời gian: ${exam.duration}</i>
        </div>
      </div>

      <div style="text-align: center; font-size: 1.2rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.25rem;">
        ${exam.examTitle}
      </div>
      <div style="text-align: center; font-size: 0.82rem; font-style: italic; margin-bottom: 1rem;">
        (Phạm vi: ${exam.scopeDesc} • Bộ sách: ${exam.bookSeries})
      </div>

      <div style="border: 1px dashed #94a3b8; padding: 0.65rem 0.85rem; border-radius: 4px; margin-bottom: 1.25rem; display: flex; justify-content: space-between; font-size: 0.85rem;">
        <div>Họ và tên học sinh: ................................................................</div>
        <div>Lớp: ${exam.grade}.....</div>
      </div>

      <div style="font-weight: 800; font-size: 0.95rem; margin: 1.25rem 0 0.75rem; color: var(--primary);">
        I. PHẦN TRẮC NGHIỆM KHÁCH QUAN (${exam.multipleChoice.length} câu)
      </div>
      ${exam.multipleChoice.map(function(q) {
        return `
          <div style="margin-bottom: 1rem;">
            <div style="font-weight: 600; font-size: 0.88rem; margin-bottom: 0.35rem;">
              Câu ${q.num} (${q.score} điểm - ${q.level}): ${q.text}
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.4rem; padding-left: 0.85rem; font-size: 0.85rem;">
              ${q.options.map(function(opt) { return `<div>${opt}</div>`; }).join('')}
            </div>
          </div>
        `;
      }).join('')}

      ${exam.essaySection.length ? `
        <div style="font-weight: 800; font-size: 0.95rem; margin: 1.25rem 0 0.75rem; color: var(--primary);">
          II. PHẦN TỰ LUẬN
        </div>
        ${exam.essaySection.map(function(e) {
          return `<div style="margin-bottom: 0.85rem; white-space: pre-line; font-weight: 500; font-size: 0.85rem;">${e}</div>`;
        }).join('')}
      ` : ''}

      <div style="margin-top: 1.75rem; padding-top: 1.25rem; border-top: 2px dashed #cbd5e1;">
        <div style="font-weight: 800; font-size: 0.95rem; color: #2563eb; margin-bottom: 0.65rem;">
          ĐÁP ÁN & HƯỚNG DẪN CHẤM
        </div>
        <div style="font-size: 0.85rem; line-height: 1.8;">
          ${exam.multipleChoice.map(function(q) {
            return `<div><strong>Câu ${q.num}:</strong> Đáp án đúng: <span style="color: #16a34a; font-weight: 700;">${q.ans}</span> (${q.score}đ)</div>`;
          }).join('')}
        </div>
      </div>
    </div>
  `;
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

        <!-- Danh Sách Mã PIN -->
        <div style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-sm); overflow-x: auto;">
          <table class="formal-matrix-table" style="margin: 0;">
            <thead>
              <tr style="background: #f1f5f9;">
                <th style="width: 25%;">Mã PIN</th>
                <th style="width: 20%;">Phạm Vi Tải</th>
                <th style="width: 30%;">Ghi Chú</th>
                <th style="width: 25%; text-align: center;">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              ${pins.map(function(p) {
                var gradeLabel = p.grade === 'all' ? 'Tất cả 5 khối' : ('Khối ' + p.grade);
                return `
                  <tr>
                    <td>
                      <strong style="color: #1e3a8a; font-family: monospace; font-size: 0.95rem; background: #e0f2fe; padding: 0.2rem 0.5rem; border-radius: 4px;">
                        ${p.code}
                      </strong>
                    </td>
                    <td>
                      <span class="access-tag-free">${gradeLabel}</span>
                    </td>
                    <td style="font-size: 0.8rem; color: var(--text-muted);">
                      ${p.desc || 'Mã cấp bởi Thầy Long'}
                    </td>
                    <td style="text-align: center;">
                      <div style="display: flex; gap: 0.4rem; justify-content: center;">
                        <button class="btn btn-sm btn-outline" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;" onclick="copyPinShareMessage('${p.code}', '${p.grade}', '${p.desc || ''}')" title="Sao chép tin nhắn gửi qua Zalo / Facebook">
                          <i class="fa-solid fa-share-nodes" style="color: #0284c7;"></i> Gửi Zalo
                        </button>
                        ${isAdmin ? `
                          <button class="btn btn-sm btn-outline" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; color: #dc2626; border-color: #fca5a5;" onclick="AuthService.deletePin('${p.code}')" title="Thu hồi mã PIN này">
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
        <span><i class="fa-regular fa-clock"></i> ${file.updatedAt || 'Hôm nay'}</span>
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
