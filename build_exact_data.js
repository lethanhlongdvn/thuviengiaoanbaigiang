const fs = require('fs');

const khbdTree = JSON.parse(fs.readFileSync('khbd_exact_tree.json', 'utf8'));
const bgTree = JSON.parse(fs.readFileSync('bg_exact_tree.json', 'utf8'));

const khbdRootId = '1QfjzwxW68pIDgZ4PfDxg71GQZCC0f3o7';
const bgRootId = '1X7iIKONrOBCclAC3qbTwcT3LaZrsDKaK';

// Combined Tree
const combinedTree = { ...khbdTree.tree, ...bgTree.tree };

// Extract all real files
const allFiles = [];
const khbdFilesList = [];
const pptxFilesList = [];

// Helper to extract files from tree
function extractFromTree(tree, repoType) {
  for (const [folderId, node] of Object.entries(tree)) {
    if (node.files && node.files.length > 0) {
      node.files.forEach(f => {
        const item = {
          id: f.id,
          name: f.name,
          title: f.name.replace(/\.[^/.]+$/, ""),
          type: repoType,
          extension: f.extension || (f.name.split('.').pop() || ''),
          size: f.size || '1.0 MB',
          folderId: folderId,
          folderPath: node.path || node.folder.name,
          updatedAt: f.updatedAt || '17/08/2026',
          contributor: f.contributor || 'Thầy Lê Thành Long',
          previewUrl: f.previewUrl || `https://drive.google.com/file/d/${f.id}/preview`,
          downloadUrl: f.downloadUrl || `https://drive.google.com/uc?export=download&id=${f.id}`
        };

        allFiles.push(item);
        if (repoType === 'KHBD') khbdFilesList.push(item);
        if (repoType === 'PPTX') pptxFilesList.push(item);
      });
    }
  }
}

extractFromTree(khbdTree.tree, 'KHBD');
extractFromTree(bgTree.tree, 'PPTX');

console.log(`Extracted ${khbdFilesList.length} KHBD files, ${pptxFilesList.length} PPTX files, Total: ${allFiles.length}`);

// Generate js/data.js
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
 * DATA STORE & LIVE CACHE TỪ 2 KHO GOOGLE DRIVE THỰC TẾ
 * Thầy Lê Thành Long - 535 KHBD + 81 Bài giảng điện tử (Tổng cộng 616 tệp tin)
 */

const SUBJECTS_CONFIG = ${JSON.stringify(subjectsMap, null, 2)};

const GRADES_CONFIG = [
  { grade: 1, name: "Khối 1", color: "#ef4444", bg: "#fef2f2", totalWeeks: 35 },
  { grade: 2, name: "Khối 2", color: "#f97316", bg: "#fff7ed", totalWeeks: 35 },
  { grade: 3, name: "Khối 3", color: "#10b981", bg: "#ecfdf5", totalWeeks: 35 },
  { grade: 4, name: "Khối 4", color: "#3b82f6", bg: "#eff6ff", totalWeeks: 35 },
  { grade: 5, name: "Khối 5", color: "#8b5cf6", bg: "#f5f3ff", totalWeeks: 35 }
];

const DATABASE = {
  khbdRootId: "${khbdRootId}",
  bgRootId: "${bgRootId}",
  khbdTree: ${JSON.stringify(khbdTree.tree, null, 2)},
  bgTree: ${JSON.stringify(bgTree.tree, null, 2)},
  tree: ${JSON.stringify(combinedTree, null, 2)},
  allFiles: ${JSON.stringify(allFiles, null, 2)},
  khbdList: ${JSON.stringify(khbdFilesList, null, 2)},
  pptxList: ${JSON.stringify(pptxFilesList, null, 2)}
};
`;

fs.writeFileSync('js/data.js', output, 'utf8');
console.log('js/data.js created successfully!');
