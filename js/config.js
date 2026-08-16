/**
 * CẤU HÌNH KẾT NỐI WEBSITE VỚI GOOGLE DRIVE
 */
const CONFIG = {
  // 1. Dán URL Web App của Google Apps Script sau khi bạn triển khai vào đây:
  API_URL: "https://script.google.com/macros/s/AKfycbwE77NMgBFsOkNxB7T4oz56ersHIgW6FlqVKXFIpr53kCCXsGbhhCh7CUf9ZAxH6yMfqQ/exec",

  // 2. ID Thư mục gốc "THU_VIEN" trên Google Drive của bạn:
  ROOT_FOLDER_ID: "105t-KCmXmjNd61i9A3o713Kn4joUZVF5",

  // 3. Tên Thư viện hiển thị
  APP_NAME: "THƯ VIỆN GIÁO VIÊN TIỂU HỌC",

  // 4. Giới hạn dung lượng tải lên tối đa (MB) - Tăng lên 50MB để tải thoải mái giáo án nặng
  MAX_FILE_SIZE_MB: 50,

  // 5. Ngưỡng cảnh báo tệp PowerPoint (.pptx) nặng để bảo vệ dung lượng Drive 15GB miễn phí (MB)
  PPTX_WARN_SIZE_MB: 8,

  // 6. Thời gian lưu phiên đăng nhập Admin (phút)
  ADMIN_SESSION_MINUTES: 120,

  // 7. Chu kỳ tự động quét Drive nền (phút) - Mặc định 10 phút/lần để tiết kiệm tài nguyên
  AUTO_SYNC_INTERVAL_MINUTES: 10
};
