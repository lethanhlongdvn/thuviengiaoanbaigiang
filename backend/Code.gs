/**
 * BACKEND GOOGLE APPS SCRIPT - THƯ VIỆN GIÁO VIÊN
 * Triển khai trực tiếp trên Google Apps Script (script.google.com)
 * Kết nối 100% dữ liệu thật với Google Drive.
 */

// ==========================================
// CẤU HÌNH HỆ THỐNG
// ==========================================
// 1. Dán ID thư mục "THU_VIEN" trên Google Drive của bạn vào đây:
const ROOT_FOLDER_ID = "105t-KCmXmjNd61i9A3o713Kn4joUZVF5";

// 2. Mật khẩu Quản trị viên mặc định (Có thể đổi trực tiếp trên web và lưu vào Script Properties):
const DEFAULT_ADMIN_PASSWORD = "admin@thuvien123";

/**
 * Lấy mật khẩu Quản trị viên hiện tại (từ Script Properties hoặc mặc định)
 */
function getAdminPassword() {
  try {
    const customPass = PropertiesService.getScriptProperties().getProperty("ADMIN_PASSWORD");
    return customPass || DEFAULT_ADMIN_PASSWORD;
  } catch (e) {
    return DEFAULT_ADMIN_PASSWORD;
  }
}

/**
 * Lưu mật khẩu Quản trị viên mới vào Script Properties
 */
function setAdminPassword(newPassword) {
  PropertiesService.getScriptProperties().setProperty("ADMIN_PASSWORD", newPassword);
}

// 3. Giới hạn dung lượng tệp tải lên (MB) - Tăng lên 50MB
const MAX_UPLOAD_MB = 50;

// ==========================================
// XỬ LÝ YÊU CẦU GET (Duyệt thư mục, Tìm kiếm, Kiểm tra quyền)
// ==========================================
function doGet(e) {
  try {
    const params = e.parameter || {};
    const action = params.action || "list";

    let result = {};

    switch (action) {
      case "preload_all":
        const rootId = params.folderId || ROOT_FOLDER_ID;
        result = getFullLibraryTree(rootId);
        break;

      case "list":
        const targetFolderId = params.folderId || ROOT_FOLDER_ID;
        result = getFolderContents(targetFolderId);
        break;

      case "search":
        const query = params.query || "";
        result = searchFiles(query);
        break;

      case "verify_admin":
        const pass = params.password || "";
        const currentPass = getAdminPassword();
        result = {
          success: pass === currentPass,
          message: pass === currentPass ? "Xác thực Admin thành công!" : "Mật khẩu Admin không chính xác!"
        };
        break;

      case "change_password":
        result = handleChangePassword(params);
        break;

      case "update_contributor":
        result = handleUpdateContributor(params);
        break;

      default:
        result = { success: false, error: "Hành động không hợp lệ" };
    }

    return createJsonResponse(result);
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() });
  }
}

// ==========================================
// XỬ LÝ YÊU CẦU POST (Tải lên, Xóa tệp, Tạo thư mục)
// ==========================================
function doPost(e) {
  try {
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter || {};
    }

    const action = data.action || "";
    let result = {};

    switch (action) {
      case "upload":
        result = handleUpload(data);
        break;

      case "delete":
        result = handleDelete(data);
        break;

      case "create_folder":
        result = handleCreateFolder(data);
        break;

      case "update_contributor":
        result = handleUpdateContributor(data);
        break;

      case "change_password":
        result = handleChangePassword(data);
        break;

      default:
        result = { success: false, error: "Hành động POST không hợp lệ" };
    }

    return createJsonResponse(result);
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() });
  }
}

// ==========================================
// CÁC HÀM XỬ LÝ DỮ LIỆU GOOGLE DRIVE
// ==========================================

/**
 * Nạp toàn bộ cây thư mục THU_VIEN trong 1 lần duy nhất để web chạy siêu tốc 0ms
 */
function getFullLibraryTree(rootFolderId) {
  const targetId = rootFolderId || ROOT_FOLDER_ID;
  if (!targetId || targetId === "YOUR_THU_VIEN_FOLDER_ID_HERE") {
    return { success: false, error: "Chưa cấu hình ROOT_FOLDER_ID!" };
  }

  const root = DriveApp.getFolderById(targetId);
  const folderTree = {};

  function scanFolder(folder, pathCrumbs) {
    const fId = folder.getId();
    const fName = folder.getName();
    const currentCrumbs = pathCrumbs.concat([{ id: fId, name: fName }]);

    const subFolders = [];
    const files = [];

    // 1. Thư mục con
    const fIter = folder.getFolders();
    while (fIter.hasNext()) {
      const sf = fIter.next();
      subFolders.push({
        id: sf.getId(),
        name: sf.getName(),
        type: "folder",
        updatedAt: Utilities.formatDate(sf.getLastUpdated(), "GMT+7", "dd/MM/yyyy HH:mm")
      });
    }
    subFolders.sort((a, b) => a.name.localeCompare(b.name, 'vi', { numeric: true }));

    // 2. Tệp tin
    const fileIter = folder.getFiles();
    while (fileIter.hasNext()) {
      const file = fileIter.next();
      const fileName = file.getName();
      if (isIgnoredLibraryFile(fileName)) continue;

      const desc = file.getDescription() || "";
      let contributor = "";
      if (desc.startsWith("Người đóng góp: ")) {
        contributor = desc.replace("Người đóng góp: ", "");
      } else if (desc.trim() !== "") {
        contributor = desc;
      }

      files.push({
        id: file.getId(),
        name: file.getName(),
        type: "file",
        extension: getFileExtension(file.getName()),
        mimeType: file.getMimeType(),
        size: formatFileSize(file.getSize()),
        sizeBytes: file.getSize(),
        contributor: contributor,
        updatedAt: Utilities.formatDate(file.getLastUpdated(), "GMT+7", "dd/MM/yyyy HH:mm"),
        previewUrl: `https://drive.google.com/file/d/${file.getId()}/preview`,
        viewUrl: file.getUrl(),
        downloadUrl: `https://drive.google.com/uc?export=download&id=${file.getId()}`
      });
    }
    files.sort((a, b) => a.name.localeCompare(b.name, 'vi', { numeric: true }));

    folderTree[fId] = {
      folder: { id: fId, name: fName, isRoot: fId === targetId },
      breadcrumbs: currentCrumbs,
      path: currentCrumbs.map(c => c.name).join("/"),
      folders: subFolders,
      files: files,
      totalItems: subFolders.length + files.length
    };

    // Đệ quy quét các thư mục con
    const subIter = folder.getFolders();
    while (subIter.hasNext()) {
      scanFolder(subIter.next(), currentCrumbs);
    }
  }

  scanFolder(root, []);

  // Xây dựng bản đồ đường dẫn chính xác tuyệt đối (Path -> Folder ID)
  const pathToIdMap = {};
  for (const id in folderTree) {
    const item = folderTree[id];
    if (item.breadcrumbs) {
      // Lưu các biến thể đường dẫn để tra cứu chính xác
      const fullPath = item.breadcrumbs.map(c => c.name).join("/");
      pathToIdMap[fullPath] = id;
      
      if (item.breadcrumbs.length >= 2) {
        const relPath = item.breadcrumbs.slice(1).map(c => c.name).join("/");
        pathToIdMap[relPath] = id;
      }
      if (item.breadcrumbs.length >= 3) {
        const shortPath = item.breadcrumbs.slice(2).map(c => c.name).join("/");
        pathToIdMap[shortPath] = id;
      }
    }
  }

  return {
    success: true,
    rootFolderId: targetId,
    tree: folderTree,
    pathToIdMap: pathToIdMap
  };
}

/**
 * Lấy danh sách thư mục con và tệp tin bên trong một thư mục
 */
function getFolderContents(folderId) {
  const targetId = folderId || ROOT_FOLDER_ID;

  if (!targetId || targetId === "YOUR_THU_VIEN_FOLDER_ID_HERE" || targetId.trim() === "") {
    return {
      success: false,
      error: "Bạn chưa điền ID thư mục THU_VIEN vào dòng số 10 trong Google Apps Script!"
    };
  }

  let currentFolder;
  try {
    currentFolder = DriveApp.getFolderById(targetId);
  } catch (e) {
    return {
      success: false,
      error: "Không tìm thấy thư mục trên Google Drive! Vui lòng kiểm tra lại ID thư mục."
    };
  }
  
  // Thông tin thư mục hiện tại & đường dẫn breadcrumb
  const folderInfo = {
    id: currentFolder.getId(),
    name: currentFolder.getName(),
    isRoot: currentFolder.getId() === ROOT_FOLDER_ID
  };

  // 1. Lấy danh sách thư mục con
  const folders = [];
  const folderIterator = currentFolder.getFolders();
  while (folderIterator.hasNext()) {
    const f = folderIterator.next();
    // Đếm số lượng con bên trong thư mục
    let childCount = 0;
    try {
      const subF = f.getFolders();
      const subFiles = f.getFiles();
      while (subF.hasNext()) { childCount++; subF.next(); }
      while (subFiles.hasNext()) { childCount++; subFiles.next(); }
    } catch(err) {}

    folders.push({
      id: f.getId(),
      name: f.getName(),
      type: "folder",
      updatedAt: Utilities.formatDate(f.getLastUpdated(), "GMT+7", "dd/MM/yyyy HH:mm"),
      childCount: childCount
    });
  }

  // Sắp xếp thư mục theo tên A-Z (đảm bảo 01., 02., 03. lên đầu)
  folders.sort((a, b) => a.name.localeCompare(b.name, 'vi', { numeric: true }));

  // 2. Lấy danh sách tệp tin
  const files = [];
  const fileIter = currentFolder.getFiles();
  while (fileIter.hasNext()) {
    const file = fileIter.next();
    const fileName = file.getName();
    if (isIgnoredLibraryFile(fileName)) continue;

    const desc = file.getDescription() || "";
    let contributor = "";
    if (desc.startsWith("Người đóng góp: ")) {
      contributor = desc.replace("Người đóng góp: ", "");
    } else if (desc.trim() !== "") {
      contributor = desc;
    }

    files.push({
      id: file.getId(),
      name: file.getName(),
      type: "file",
      extension: getFileExtension(file.getName()),
      mimeType: file.getMimeType(),
      size: formatFileSize(file.getSize()),
      sizeBytes: file.getSize(),
      contributor: contributor,
      updatedAt: Utilities.formatDate(file.getLastUpdated(), "GMT+7", "dd/MM/yyyy HH:mm"),
      previewUrl: `https://drive.google.com/file/d/${file.getId()}/preview`,
      viewUrl: file.getUrl(),
      downloadUrl: `https://drive.google.com/uc?export=download&id=${file.getId()}`
    });
  }
  files.sort((a, b) => a.name.localeCompare(b.name, 'vi', { numeric: true }));

  // 3. Xây dựng cây cha (Breadcrumb)
  const breadcrumbs = getBreadcrumbs(currentFolder);

  return {
    success: true,
    folder: folderInfo,
    breadcrumbs: breadcrumbs,
    folders: folders,
    files: files,
    totalItems: folders.length + files.length
  };
}

/**
 * Xử lý tải tệp tin lên Google Drive
 */
function handleUpload(data) {
  if (!data || !data.base64Data || !data.fileName) {
    return { success: false, error: "Thiếu dữ liệu tệp tin cần tải lên!" };
  }

  const targetFolderId = data.folderId || ROOT_FOLDER_ID;
  const targetFolder = DriveApp.getFolderById(targetFolderId);

  // Giải mã Base64 sang dạng nhị phân Blob
  const decodedBytes = Utilities.base64Decode(data.base64Data);
  const blob = Utilities.newBlob(decodedBytes, data.mimeType || "application/octet-stream", data.fileName);

  // Kiểm tra kích thước (Byte -> MB)
  const sizeMb = blob.getBytes().length / (1024 * 1024);
  if (sizeMb > MAX_UPLOAD_MB) {
    return {
      success: false,
      error: `Tệp vượt quá dung lượng tối đa cho phép (${MAX_UPLOAD_MB}MB). Vui lòng nén bớt hình ảnh hoặc chuyển sang PDF.`
    };
  }

  // Tạo tệp trên Google Drive
  const newFile = targetFolder.createFile(blob);

  // Ghi nhận tên người đóng góp vào thông tin mô tả của tệp trên Drive
  const uploaderName = (data.uploaderName || "").trim();
  if (uploaderName) {
    newFile.setDescription("Người đóng góp: " + uploaderName);
  }

  return {
    success: true,
    message: "Tải tệp lên Google Drive thành công!",
    file: {
      id: newFile.getId(),
      name: newFile.getName(),
      size: formatFileSize(newFile.getSize()),
      previewUrl: `https://drive.google.com/file/d/${newFile.getId()}/preview`,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${newFile.getId()}`
    }
  };
}

/**
 * Xử lý xóa tệp hoặc thư mục (Yêu cầu Mật khẩu Quản trị viên)
 */
function handleDelete(data) {
  const targetId = data.id;
  const type = data.type || "file"; // 'file' hoặc 'folder'
  const adminPass = data.adminPassword;

  // Kiểm tra bảo mật Admin
  if (adminPass !== getAdminPassword()) {
    return { success: false, error: "Từ chối truy cập: Mật khẩu quản trị viên không chính xác!" };
  }

  if (!targetId) {
    return { success: false, error: "Không tìm thấy ID mục cần xóa!" };
  }

  // Không cho phép xóa thư mục gốc
  if (targetId === ROOT_FOLDER_ID) {
    return { success: false, error: "Không thể xóa thư mục gốc THU_VIEN!" };
  }

  if (type === "folder") {
    const folder = DriveApp.getFolderById(targetId);
    folder.setTrashed(true); // Đưa vào thùng rác Google Drive
  } else {
    const file = DriveApp.getFileById(targetId);
    file.setTrashed(true); // Đưa vào thùng rác Google Drive
  }

  return {
    success: true,
    message: `Đã xóa ${type === "folder" ? "thư mục" : "tệp"} thành công khỏi Google Drive!`
  };
}

/**
 * Xử lý tạo thư mục mới (Chỉ Admin)
 */
function handleCreateFolder(data) {
  const parentFolderId = data.parentFolderId || ROOT_FOLDER_ID;
  const folderName = data.name;
  const adminPass = data.adminPassword;

  if (adminPass !== getAdminPassword()) {
    return { success: false, error: "Từ chối: Cần mật khẩu Quản trị viên để tạo thư mục!" };
  }

  if (!folderName) {
    return { success: false, error: "Vui lòng nhập tên thư mục!" };
  }

  const parentFolder = DriveApp.getFolderById(parentFolderId);
  const newFolder = parentFolder.createFolder(folderName);

  return {
    success: true,
    message: "Tạo thư mục mới thành công!",
    folder: {
      id: newFolder.getId(),
      name: newFolder.getName()
    }
  };
}

/**
 * Xử lý cập nhật tên người đóng góp tài liệu lên Google Drive
 */
function handleUpdateContributor(data) {
  const fileId = data.fileId || data.id;
  const contributor = (data.contributor || "").trim();

  if (!fileId) {
    return { success: false, error: "Thiếu ID tệp cần cập nhật!" };
  }

  try {
    const file = DriveApp.getFileById(fileId);
    file.setDescription(contributor ? ("Người đóng góp: " + contributor) : "");
    return {
      success: true,
      message: "Đã lưu tên người đóng góp lên Google Drive thành công!",
      fileId: fileId,
      contributor: contributor
    };
  } catch (err) {
    return { success: false, error: "Lỗi lưu người đóng góp: " + err.toString() };
  }
}

/**
 * Xử lý đổi mật khẩu Quản trị viên (Lưu bền vững vào Script Properties)
 */
function handleChangePassword(data) {
  const oldPassword = (data.oldPassword || data.currentPassword || data.adminPassword || "").trim();
  const newPassword = (data.newPassword || "").trim();
  const currentPass = getAdminPassword();

  if (!oldPassword) {
    return { success: false, error: "Vui lòng nhập mật khẩu hiện tại!" };
  }

  if (oldPassword !== currentPass) {
    return { success: false, error: "Mật khẩu hiện tại không chính xác!" };
  }

  if (!newPassword || newPassword.length < 4) {
    return { success: false, error: "Mật khẩu mới phải có tối thiểu 4 ký tự!" };
  }

  setAdminPassword(newPassword);

  return {
    success: true,
    message: "Đổi mật khẩu Quản trị viên thành công!"
  };
}

/**
 * Tìm kiếm tệp tin theo tên
 */
function searchFiles(keyword) {
  if (!keyword || keyword.trim() === "") {
    return { success: true, files: [] };
  }

  const results = [];
  const sanitized = keyword.replace(/'/g, "\\'");
  const query = `title contains '${sanitized}' and trashed = false`;
  const fileIterator = DriveApp.searchFiles(query);

  let count = 0;
  while (fileIterator.hasNext() && count < 50) {
    const file = fileIterator.next();
    const fileName = file.getName();
    if (isIgnoredLibraryFile(fileName)) continue;

    const desc = file.getDescription() || "";
    let contributor = "";
    if (desc.startsWith("Người đóng góp: ")) {
      contributor = desc.replace("Người đóng góp: ", "");
    } else if (desc.trim() !== "") {
      contributor = desc;
    }

    results.push({
      id: file.getId(),
      name: file.getName(),
      type: "file",
      extension: getFileExtension(file.getName()),
      size: formatFileSize(file.getSize()),
      contributor: contributor,
      updatedAt: Utilities.formatDate(file.getLastUpdated(), "GMT+7", "dd/MM/yyyy HH:mm"),
      previewUrl: `https://drive.google.com/file/d/${file.getId()}/preview`,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${file.getId()}`
    });
    count++;
  }

  return {
    success: true,
    query: keyword,
    total: results.length,
    files: results
  };
}

// ==========================================
// HÀM TIỆN ÍCH
// ==========================================

function getBreadcrumbs(folder) {
  const crumbs = [];
  let current = folder;

  while (current) {
    crumbs.unshift({
      id: current.getId(),
      name: current.getName()
    });

    if (current.getId() === ROOT_FOLDER_ID) {
      break;
    }

    const parents = current.getParents();
    if (parents.hasNext()) {
      current = parents.next();
    } else {
      break;
    }
  }

  return crumbs;
}

function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return "0 KB";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function getFileExtension(filename) {
  if (!filename || filename.indexOf(".") === -1) return "";
  return filename.split(".").pop().toLowerCase();
}

function isIgnoredLibraryFile(name) {
  if (!name) return true;
  const lower = name.trim().toLowerCase();
  if (lower === "thu_vien" || lower === "thuvien" || lower === "thu vien" || lower === "thu_vien." || lower === "thu_vien.tmp" || lower === "thu_vien.file") {
    return true;
  }
  if (lower.startsWith(".") || lower === "desktop.ini" || lower === "thumbs.db" || lower === "icon\r") {
    return true;
  }
  return false;
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
