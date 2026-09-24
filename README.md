# EduMap Đồng Nai

Website tra cứu và xác định vị trí các cơ sở giáo dục trên địa bàn Thành phố Đồng Nai.

## Chức năng
- Tìm kiếm cơ sở giáo dục theo tên, địa chỉ.
- Lọc theo 6 cấp học: Mầm non, Tiểu học, THCS, THPT, Cao đẳng, Đại học.
- Hiển thị vị trí trên Google Maps.
- Xem Google Street View.
- Chỉ đường nhanh bằng Google Maps.
- Xác định vị trí hiện tại của người dùng.
- Dữ liệu demo được đồng bộ giữa `app.js`, `schools.json` và `database.sql`.

## Chạy website
1. Giải nén thư mục.
2. Mở `index.html` bằng trình duyệt hoặc chạy bằng Live Server/XAMPP.
3. API Key Google Maps đã được giữ theo file mẫu đã cung cấp. Khi triển khai thật, nên giới hạn API Key theo tên miền/IP và bật các API cần thiết trong Google Cloud.
4. Nếu dùng MySQL, import `database.sql`.

## Lưu ý
`index.html` hiện dùng dữ liệu trong `app.js` để chạy bản demo độc lập. `database.sql` là cấu trúc dữ liệu để dùng khi nối PHP/MySQL ở bước tiếp theo.
