CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  first_name VARCHAR(120) NOT NULL,
  last_name VARCHAR(120) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(40) NOT NULL DEFAULT 'USER',
  phone VARCHAR(40)
);

INSERT INTO users (id, first_name, last_name, email, password_hash, role, phone)
VALUES ('u_1', 'Revin', 'Dennis', 'revin@example.com', '$2a$10$1nJcaFQQ8ILg6JMSM6AlyelZFPd0M6Dh10fJITVEWilR92pT9XyM6', 'ADMIN', '+1 212 555 0100')
ON CONFLICT (email) DO NOTHING;
