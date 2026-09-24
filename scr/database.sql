CREATE DATABASE IF NOT EXISTS edumap
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE edumap;

DROP TABLE IF EXISTS schools;

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  level ENUM('Mầm non','Tiểu học','THCS','THPT','Cao đẳng','Đại học') NOT NULL,
  address VARCHAR(500) NOT NULL,
  province VARCHAR(150),
  district VARCHAR(150),
  ward VARCHAR(150),
  latitude DECIMAL(12,9) NOT NULL,
  longitude DECIMAL(12,9) NOT NULL,
  phone VARCHAR(30),
  email VARCHAR(150),
  website VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO schools
(name, level, address, province, latitude, longitude, phone)
VALUES
('Trường Mầm non Hoa Sen','Mầm non','510 Đ. Đồng Khởi, Tam Hiệp, Thành phố Đồng Nai','Thành phố Đồng Nai',10.958297,106.857833,'02513822962'),
('Trường Tiểu học Nguyễn Huệ','Tiểu học','XW73+P5M, Ngô Sỹ Liên, Long Bình, Thành phố Đồng Nai','Thành phố Đồng Nai',10.964344,106.902924,'0613881591'),
('Trường THCS Trần Hưng Đạo','THCS','372 Ba Mươi Tháng Tư, Trấn Biên, Thành phố Đồng Nai','Thành phố Đồng Nai',10.955763,106.828267,'02513822039'),
('Trường THPT Ngô Quyền','THPT','XR3G+MG8, 61 Ba Mươi Tháng Tư, Khu phố 2, Trấn Biên, Thành phố Đồng Nai','Thành phố Đồng Nai',10.954195,106.826022,'02513829029'),
('Trường Cao đẳng FPT Polytechnic cơ sở Đồng Nai','Cao đẳng','193 Đỗ Văn Thi, phường Trấn Biên, Thành phố Đồng Nai','Thành phố Đồng Nai',10.937691,106.834898,'0345690031'),
('Trường Đại học Lạc Hồng','Đại học','10 Huỳnh Văn Nghệ, Trấn Biên, Đồng Nai, Việt Nam','Đồng Nai',10.953035,106.802255,'0941731973');
