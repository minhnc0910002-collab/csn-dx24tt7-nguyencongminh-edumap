CREATE DATABASE IF NOT EXISTS edumap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE edumap;

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  level ENUM('Mầm non','Tiểu học','THCS','THPT','Cao đẳng','Đại học') NOT NULL,
  address VARCHAR(500) NOT NULL,
  province VARCHAR(150),
  district VARCHAR(150),
  ward VARCHAR(150),
  latitude DECIMAL(10,7) NOT NULL,
  longitude DECIMAL(10,7) NOT NULL,
  phone VARCHAR(30),
  email VARCHAR(150),
  website VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schools
(name,level,address,province,latitude,longitude,phone)
VALUES
('Trường Mầm non Hoa Sen','Mầm non','Phường Trấn Biên, Thành phố Đồng Nai','Thành phố Đồng Nai',10.9508,106.8171,'0251 0000 0001'),
('Trường Tiểu học Nguyễn Du','Tiểu học','Phường Quyết Thắng, Thành phố Đồng Nai','Thành phố Đồng Nai',10.9520,106.8225,'0251 0000 0002'),
('Trường THCS Trần Văn Ơn','THCS','Phường Tam Hiệp, Thành phố Đồng Nai','Thành phố Đồng Nai',10.9485,106.8300,'0251 0000 0003'),
('Trường THPT Ngô Quyền','THPT','Phường Trung Dũng, Thành phố Đồng Nai','Thành phố Đồng Nai',10.9550,106.8180,'0251 0000 0004'),
('Cao đẳng Mỹ thuật trang trí Đồng Nai','Cao đẳng','Phường Trung Dũng, Thành phố Đồng Nai','Thành phố Đồng Nai',10.9535,106.8250,'0251 0000 0005'),
('Đại học Đồng Nai','Đại học','Phường Tân Hiệp, Thành phố Đồng Nai','Thành phố Đồng Nai',10.9600,106.8350,'0251 0000 0006');
