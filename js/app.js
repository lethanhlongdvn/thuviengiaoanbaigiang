/**
 * MAIN APPLICATION CORE & ROUTER (CHUẨN 100% 7 PHÂN HỆ MENU)
 * Hỗ trợ Khóa/Mở toàn bộ kho và Chế độ "Ẩn với khách" cho từng tài liệu
 * Thư viện Bài giảng & Kế hoạch bài dạy Tiểu học - Lê Thành Long
 */

var currentView = "home";
var selectedGrade = "all";
var selectedWeek = 1;
var selectedSubject = "all";
var currentExamData = null;

// Biến dự phòng an toàn cho AI Integration nếu app.js nạp trước
if (typeof window !== "undefined") {
  window.integrationState = window.integrationState || {
    exportMode: 'subject',
    timetableRole: 'gvcn',
    gvbmConfig: { isMultiSubject: false }
  };
}
var integrationState = (typeof window !== "undefined" && window.integrationState) ? window.integrationState : {
  exportMode: 'subject',
  timetableRole: 'gvcn',
  gvbmConfig: { isMultiSubject: false }
};

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

// Khởi chạy khi DOM sẵn sàng (Hỗ trợ cả Trang chính và Trang độc lập)
function initApplication() {
  var pathname = (typeof window !== "undefined" && window.location && window.location.pathname ? window.location.pathname : "").toLowerCase();
  var isStandaloneIntegration = pathname.indexOf("ai-integration") !== -1 || (typeof document !== "undefined" && document.body && document.body.classList && document.body.classList.contains("page-ai-integration"));
  var isStandaloneExam = pathname.indexOf("ai-exam") !== -1 || (typeof document !== "undefined" && document.body && document.body.classList && document.body.classList.contains("page-ai-exam"));

  var searchStr = (typeof window !== "undefined" && window.location && window.location.search ? window.location.search : "").toLowerCase();
  var hashStr = (typeof window !== "undefined" && window.location && window.location.hash ? window.location.hash : "").toLowerCase();
  if (searchStr.indexOf("mode=timetable") !== -1 || hashStr.indexOf("timetable") !== -1) {
    integrationState.exportMode = "timetable";
  }
  if (searchStr.indexOf("role=gvbm_multi") !== -1 || searchStr.indexOf("role=damon") !== -1 || hashStr.indexOf("gvbm_multi") !== -1 || hashStr.indexOf("damon") !== -1) {
    integrationState.timetableRole = "gvbm";
    if (integrationState.gvbmConfig) integrationState.gvbmConfig.isMultiSubject = true;
  } else if (searchStr.indexOf("role=gvbm_single") !== -1 || hashStr.indexOf("gvbm_single") !== -1) {
    integrationState.timetableRole = "gvbm";
    if (integrationState.gvbmConfig) integrationState.gvbmConfig.isMultiSubject = false;
  } else if (searchStr.indexOf("role=gvbm") !== -1 || hashStr.indexOf("gvbm") !== -1) {
    integrationState.timetableRole = "gvbm";
  } else if (searchStr.indexOf("role=gvcn") !== -1 || hashStr.indexOf("gvcn") !== -1) {
    integrationState.timetableRole = "gvcn";
  }

  if (isStandaloneIntegration) {
    currentView = "ai-integration";
    var container = typeof document !== "undefined" ? document.getElementById("content-container") : null;
    if (container && typeof renderAiIntegrationView === "function") {
      renderAiIntegrationView(container);
    }
    return;
  }

  if (isStandaloneExam) {
    currentView = "ai-exam";
    var container = typeof document !== "undefined" ? document.getElementById("content-container") : null;
    if (container && typeof renderAiExamView === "function") {
      renderAiExamView(container);
    }
    return;
  }

  if (typeof AuthService !== "undefined" && AuthService.updateAuthUI) AuthService.updateAuthUI();
  if (typeof setupNavigationEvents === "function") setupNavigationEvents();
  if (typeof setupSearchEvents === "function") setupSearchEvents();
  if (typeof renderSidebarDocsNav === "function") renderSidebarDocsNav();

  // Xác định view ban đầu
  var hash = (typeof window !== "undefined" && window.location && window.location.hash ? window.location.hash.replace("#", "") : "") || "home";
  if (typeof navigateTo === "function") navigateTo(hash);

  // Cập nhật số liệu footer động
  if (typeof updateFooterCount === "function") updateFooterCount();

  if (typeof window !== "undefined") {
    window.addEventListener("hashchange", function() {
      var newHash = (window.location && window.location.hash ? window.location.hash.replace("#", "") : "") || "home";
      if (newHash !== currentView && typeof navigateTo === "function") {
        navigateTo(newHash);
      }
    });
  }
}

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
    "ai-integration": '<li><a href="javascript:void(0)" onclick="navigateTo(\'home\')"><i class="fa-solid fa-house"></i> Trang Chủ</a></li> <li><i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i></li> <li class="active">Xuất KHBD Có Tích Hợp (CV 2345)</li>',
    toolkit: '<li><a href="javascript:void(0)" onclick="navigateTo(\'home\')"><i class="fa-solid fa-house"></i> Trang Chủ</a></li> <li><i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i></li> <li class="active">Tiện Ích Giảng Dạy</li>',
    settings: '<li><a href="javascript:void(0)" onclick="navigateTo(\'home\')"><i class="fa-solid fa-house"></i> Trang Chủ</a></li> <li><i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i></li> <li class="active">Cấu Hình & Quản Trị</li>',
    search: '<li><a href="javascript:void(0)" onclick="navigateTo(\'home\')"><i class="fa-solid fa-house"></i> Trang Chủ</a></li> <li><i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i></li> <li class="active">Kết Quả Tìm Kiếm</li>'
  };

  container.innerHTML = viewTitles[currentView] || viewTitles.home;
}

// Render View tương ứng (An toàn tuyệt đối với modular loading)
function renderCurrentView() {
  var container = document.getElementById("content-container");
  if (!container) return;

  switch (currentView) {
    case "home":
      if (typeof renderHomeView === "function") renderHomeView(container);
      break;
    case "pptx":
      if (typeof renderPptxView === "function") renderPptxView(container);
      break;
    case "khbd":
      if (typeof renderKhbdView === "function") renderKhbdView(container);
      break;
    case "weekly":
      if (typeof renderWeeklyView === "function") renderWeeklyView(container);
      break;
    case "ai-exam":
      if (typeof renderAiExamView === "function") renderAiExamView(container);
      break;
    case "ai-integration":
      if (typeof renderAiIntegrationView === "function") renderAiIntegrationView(container);
      break;
    case "toolkit":
      if (typeof renderToolkitView === "function") renderToolkitView(container);
      break;
    case "settings":
      if (typeof renderSettingsView === "function") renderSettingsView(container);
      break;
    case "search":
      if (typeof renderSearchView === "function") renderSearchView(container);
      break;
    default:
      if (typeof renderHomeView === "function") renderHomeView(container);
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

// ==========================================
// WINDOW BINDINGS CHO APP CORE
// ==========================================
if (typeof window !== "undefined") {
  window.navigateTo = typeof navigateTo !== "undefined" ? navigateTo : null;
  window.refreshCurrentView = typeof refreshCurrentView !== "undefined" ? refreshCurrentView : null;
  window.toggleGradeTree = typeof toggleGradeTree !== "undefined" ? toggleGradeTree : null;
  window.navigateToSubject = typeof navigateToSubject !== "undefined" ? navigateToSubject : null;
  window.selectGradeAndNavigateTo = typeof selectGradeAndNavigateTo !== "undefined" ? selectGradeAndNavigateTo : null;
  window.filterByGrade = typeof filterByGrade !== "undefined" ? filterByGrade : null;
  window.toggleSidebarMenu = typeof toggleSidebarMenu !== "undefined" ? toggleSidebarMenu : null;
  window.syncDriveData = typeof syncDriveData !== "undefined" ? syncDriveData : null;
  window.showToast = typeof showToast !== "undefined" ? showToast : null;
  window.escapeHtml = typeof escapeHtml !== "undefined" ? escapeHtml : null;
}

// XSS Prevention: hàm mã hóa ký tự đặc biệt cho chuỗi đầu vào
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
if (typeof window !== "undefined") {
  window.escapeHtml = escapeHtml;
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

// Bắt lỗi toàn cục có kiểm soát, tránh sập giao diện âm thầm
if (typeof window !== "undefined") {
  window.addEventListener("error", function(e) {
    if (e && e.message) {
      if (e.message.indexOf("ResizeObserver") !== -1 || e.message.indexOf("Script error") !== -1) return;
      console.warn("Global UI Notice:", e.message, "at", e.filename, ":", e.lineno);
    }
  });

  window.addEventListener("unhandledrejection", function(e) {
    if (e && e.reason) {
      console.warn("Unhandled Async Notice:", e.reason);
    }
  });
}

// Khởi tạo ứng dụng sau khi toàn bộ script & biến số đã nạp đầy đủ
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApplication);
  } else {
    initApplication();
  }
}

