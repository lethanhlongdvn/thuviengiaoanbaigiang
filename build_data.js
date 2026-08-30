const fs = require('fs');

const cache = JSON.parse(fs.readFileSync('real_drive_cache.json', 'utf8'));

// Subjects map
const subjectsMap = {
  TOAN: { id: "TOAN", name: "Toán", icon: "fa-calculator", color: "#2563eb", bgColor: "#eff6ff" },
  TIENG_VIET: { id: "TIENG_VIET", name: "Tiếng Việt", icon: "fa-book-open", color: "#ea580c", bgColor: "#fff7ed" },
  TIENG_ANH: { id: "TIENG_ANH", name: "Tiếng Anh", icon: "fa-globe", color: "#0284c7", bgColor: "#f0f9ff" },
  TNXH: { id: "TNXH", name: "Tự nhiên & Xã hội", icon: "fa-seedling", color: "#16a34a", bgColor: "#f0fdf4" },
  KHOA_HOC: { id: "KHOA_HOC", name: "Khoa học", icon: "fa-flask-vial", color: "#7c3aed", bgColor: "#f5f3ff" },
  LICH_SU_DIA_LY: { id: "LICH_SU_DIA_LY", name: "Lịch sử & Địa lý", icon: "fa-map-location-dot", color: "#b45309", bgColor: "#fffbeb" },
  TIN_HOC: { id: "TIN_HOC", name: "Tin học", icon: "fa-laptop-code", color: "#0d9488", bgColor: "#f0fdfa" },
  CONG_NGHE: { id: "CONG_NGHE", name: "Công nghệ", icon: "fa-gears", color: "#475569", bgColor: "#f1f5f9" },
  DAO_DUC: { id: "DAO_DUC", name: "Đạo đức", icon: "fa-heart", color: "#db2777", bgColor: "#fdf2f8" },
  HDTN: { id: "HDTN", name: "Hoạt động trải nghiệm", icon: "fa-compass", color: "#f59e0b", bgColor: "#fffbeb" },
  HAT_NHAC: { id: "HAT_NHAC", name: "Âm nhạc", icon: "fa-music", color: "#9333ea", bgColor: "#faf5ff" },
  MI_THUAT: { id: "MI_THUAT", name: "Mĩ thuật", icon: "fa-palette", color: "#06b6d4", bgColor: "#ecfeff" },
  GDTC: { id: "GDTC", name: "Giáo dục thể chất", icon: "fa-volleyball", color: "#65a30d", bgColor: "#f7fee7" },
  KHAC: { id: "KHAC", name: "Tài liệu Khác", icon: "fa-folder-open", color: "#64748b", bgColor: "#f8fafc" }
};

const output = `/**
 * DATA STORE & LIVE CACHE TỪ GOOGLE DRIVE THỰC TẾ
 * Thư viện Bài giảng & Kế hoạch bài dạy Tiểu học - Lê Thành Long
 * 102 Thư mục & 26+ Tệp tin thật từ Google Drive
 */

const SUBJECTS_CONFIG = ${JSON.stringify(subjectsMap, null, 2)};

const GRADES_CONFIG = [
  { grade: 1, name: "Khối 1", color: "#ef4444", bg: "#fef2f2", totalWeeks: 35 },
  { grade: 2, name: "Khối 2", color: "#f97316", bg: "#fff7ed", totalWeeks: 35 },
  { grade: 3, name: "Khối 3", color: "#10b981", bg: "#ecfdf5", totalWeeks: 35 },
  { grade: 4, name: "Khối 4", color: "#3b82f6", bg: "#eff6ff", totalWeeks: 35 },
  { grade: 5, name: "Khối 5", color: "#8b5cf6", bg: "#f5f3ff", totalWeeks: 35 }
];

const REAL_DRIVE_DATA = ${JSON.stringify(cache, null, 2)};

// Cơ sở dữ liệu hoạt động
const DATABASE = {
  tree: REAL_DRIVE_DATA.tree,
  rootFolderId: REAL_DRIVE_DATA.rootFolderId,
  realFolders: REAL_DRIVE_DATA.realFolders,
  realFiles: REAL_DRIVE_DATA.realFiles,
  pptxList: [],
  khbdList: []
};

// Chuyển đổi tệp thật thành danh mục chuẩn
REAL_DRIVE_DATA.realFiles.forEach(f => {
  const isPptx = f.name.toLowerCase().endsWith('.pptx') || f.name.toLowerCase().endsWith('.ppt');
  const isWord = f.name.toLowerCase().endsWith('.docx') || f.name.toLowerCase().endsWith('.doc');

  // Trích xuất Khối lớp & Môn học từ đường dẫn thư mục
  let grade = 5;
  if (f.folderPath.includes('KHOI_1')) grade = 1;
  else if (f.folderPath.includes('KHOI_2')) grade = 2;
  else if (f.folderPath.includes('KHOI_3')) grade = 3;
  else if (f.folderPath.includes('KHOI_4')) grade = 4;
  else if (f.folderPath.includes('KHOI_5')) grade = 5;

  let subjectId = 'KHAC';
  if (f.folderPath.includes('TOAN')) subjectId = 'TOAN';
  else if (f.folderPath.includes('TIENG_VIET')) subjectId = 'TIENG_VIET';
  else if (f.folderPath.includes('TIENG_ANH')) subjectId = 'TIENG_ANH';
  else if (f.folderPath.includes('TNXH')) subjectId = 'TNXH';
  else if (f.folderPath.includes('KHOA_HOC')) subjectId = 'KHOA_HOC';
  else if (f.folderPath.includes('LICH_SU') || f.folderPath.includes('DIA_LY')) subjectId = 'LICH_SU_DIA_LY';
  else if (f.folderPath.includes('TIN_HOC')) subjectId = 'TIN_HOC';
  else if (f.folderPath.includes('CONG_NGHE')) subjectId = 'CONG_NGHE';
  else if (f.folderPath.includes('DAO_DUC')) subjectId = 'DAO_DUC';
  else if (f.folderPath.includes('HDTN')) subjectId = 'HDTN';
  else if (f.folderPath.includes('HAT_NHAC')) subjectId = 'HAT_NHAC';
  else if (f.folderPath.includes('MI_THUAT')) subjectId = 'MI_THUAT';
  else if (f.folderPath.includes('GDTC')) subjectId = 'GDTC';

  const sub = SUBJECTS_CONFIG[subjectId] || SUBJECTS_CONFIG.KHAC;

  const item = {
    id: f.id,
    type: isPptx ? "PPTX" : (isWord ? "KHBD" : "OTHER"),
    grade: grade,
    week: 1,
    subjectId: subjectId,
    subjectName: sub.name,
    title: f.name.replace(/\\.[^/.]+$/, ""),
    topic: f.folderPath || "Tài liệu trường học",
    fileFormat: f.extension ? ("." + f.extension) : "",
    fileSize: f.size,
    folderId: f.folderId,
    drivePath: f.folderPath + "/" + f.name,
    driveEmbedUrl: f.previewUrl,
    downloadUrl: f.downloadUrl,
    contributor: f.contributor || "Thầy Lê Thành Long",
    updatedAt: f.updatedAt,
    isFree: true
  };

  if (isPptx) DATABASE.pptxList.push(item);
  if (isWord) DATABASE.khbdList.push(item);
});
`;

fs.writeFileSync('js/data.js', output, 'utf8');
console.log('js/data.js generated successfully!');
