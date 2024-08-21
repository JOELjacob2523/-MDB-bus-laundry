/* This is for MySQL */
CREATE TABLE users (
  user_id BIGINT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NULL,
  last_name VARCHAR(255) NULL,
  email VARCHAR(255) NULL,
  password VARCHAR(255) NULL,
  token TEXT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE students (
  student_id BIGINT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NULL,
  last_name VARCHAR(255) NULL,
  age VARCHAR(255) NULL,
  address1 VARCHAR(255) NULL,
  address2 VARCHAR(255) NULL,
  city VARCHAR(255) NULL,
  state VARCHAR(255) NULL,
  zip_code VARCHAR(255) NULL,
  token TEXT NULL,
  PRIMARY KEY (student_id)
);

CREATE TABLE zman_goal (
  zman_goal_id BIGINT NOT NULL AUTO_INCREMENT,
  zman VARCHAR(255),
  zman_starts_ends JSON NULL,
  closed_weeks JSON NULL,
  bus_price VARCHAR (255) NULL,
  wash_price VARCHAR (255) NULL,
  total_zman_weeks VARCHAR (255) NULL,
  total_zman_goal VARCHAR (255) NULL,
  total_bus_goal VARCHAR (255) NULL,
  total_wash_goal VARCHAR (255) NULL,
  PRIMARY KEY (zman_goal_id)
);

CREATE TABLE payments (
  payment_id BIGINT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (255) NULL,
  last_name VARCHAR (255) NULL,
  payment_type VARCHAR (255) NULL,
  bus VARCHAR (255) NULL,
  wash VARCHAR (255) NULL,
  bus_wash VARCHAR (255) NULL,
  cash VARCHAR (255) NULL,
  checks VARCHAR (255) NULL,
  credit_card VARCHAR (255) NULL,
  total_paid VARCHAR (255) NULL,
  pay_date VARCHAR (255) NULL,
  token TEXT NULL,
  student_id BIGINT,
  FOREIGN KEY(student_id) REFERENCES students(student_id),
  PRIMARY KEY (payment_id)
);

CREATE TABLE Withdrawals (
  withdrawal_id BIGINT NOT NULL AUTO_INCREMENT,
  amount VARCHAR(255) NULL,
  withdrawal_to VARCHAR (255) NULL,
  date DATE NULL,
  hebrew_date VARCHAR (255) NULL,
  user_id BIGINT,
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  PRIMARY KEY (Withdrawal_id)
);

CREATE TABLE orderitems (
  orderitemsId BIGINT NOT NULL AUTO_INCREMENT,
  amount VARCHAR (255) NULL,
  productdesc VARCHAR (255) NULL,
  qty VARCHAR (255) NULL,
  price VARCHAR (255) NULL,
  totalrowprice VARCHAR (255) NULL,
  date DATETIME NULL,
  vendorId BIGINT,
  orderId BIGINT,
  FOREIGN KEY(orderId) REFERENCES orders(orderId),
  FOREIGN KEY(vendorId) REFERENCES vendors(vendorId),
  PRIMARY KEY (orderitemsId)
);

CREATE TABLE old_students (
  student_id BIGINT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NULL,
  last_name VARCHAR(255) NULL,
  age VARCHAR(255) NULL,
  address1 VARCHAR(255) NULL,
  address2 VARCHAR(255) NULL,
  city VARCHAR(255) NULL,
  state VARCHAR(255) NULL,
  zip_code VARCHAR(255) NULL,
  token TEXT NULL,
  PRIMARY KEY (student_id)
);

CREATE TABLE old_zman_goal (
  zman_goal_id BIGINT NOT NULL AUTO_INCREMENT,
  zman VARCHAR(255),
  zman_starts_ends JSON NULL,
  closed_weeks JSON NULL,
  bus_price VARCHAR (255) NULL,
  wash_price VARCHAR (255) NULL,
  total_zman_weeks VARCHAR (255) NULL,
  total_zman_goal VARCHAR (255) NULL,
  total_bus_goal VARCHAR (255) NULL,
  total_wash_goal VARCHAR (255) NULL,
  PRIMARY KEY (zman_goal_id)
);

CREATE TABLE old_payments (
  payment_id BIGINT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (255) NULL,
  last_name VARCHAR (255) NULL,
  payment_type VARCHAR (255) NULL,
  bus VARCHAR (255) NULL,
  wash VARCHAR (255) NULL,
  bus_wash VARCHAR (255) NULL,
  cash VARCHAR (255) NULL,
  checks VARCHAR (255) NULL,
  credit_card VARCHAR (255) NULL,
  total_paid VARCHAR (255) NULL,
  pay_date VARCHAR (255) NULL,
  token TEXT NULL,
  student_id BIGINT,
  FOREIGN KEY(student_id) REFERENCES students(student_id),
  PRIMARY KEY (payment_id)
);