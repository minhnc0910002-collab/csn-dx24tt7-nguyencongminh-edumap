# EduMap – Website tra cứu cơ sở giáo dục

## Chức năng
- Tìm kiếm trường theo tên/địa chỉ.
- Lọc Mầm non, Tiểu học, THCS, THPT, Cao đẳng, Đại học.
- Hiển thị marker trên Google Maps.
- Xem Google Street View tại vị trí trường.
- Lấy vị trí hiện tại.
- Mở Google Maps để chỉ đường.
- Có sẵn `database.sql` cho MySQL.

## Cài đặt nhanh
1. Tạo Google Cloud Project.
2. Bật Maps JavaScript API và Street View Static/Dynamic API phù hợp với cách triển khai.
3. Tạo API key và giới hạn key theo domain.
4. Trong `index.html`, thay `YOUR_GOOGLE_MAPS_API_KEY` bằng API key.
5. Sửa `defaultCenter` trong `config.js` theo Thành phố Đồng Nai.
6. Mở website bằng localhost hoặc một web server. Không nên mở trực tiếp bằng `file://` khi phát triển.
7. Dữ liệu mẫu hiện nằm trong `app.js`. Khi nối backend, API có thể trả JSON từ bảng `schools` trong MySQL.

## Kiến trúc backend đề xuất
GET /api/schools?q=&level=
GET /api/schools/:id

Backend đọc MySQL và trả JSON. Frontend thay mảng `schools` trong `app.js` bằng `fetch('/api/schools?...')`.

## Lưu ý
- Google Maps Platform yêu cầu API key và có thể phát sinh chi phí theo mức sử dụng.
- Dữ liệu trường mẫu chỉ phục vụ demo; cần thay bằng dữ liệu chính xác của Thành phố Đồng Nai.
- Chức năng định vị yêu cầu HTTPS (hoặc localhost) và người dùng cấp quyền.
