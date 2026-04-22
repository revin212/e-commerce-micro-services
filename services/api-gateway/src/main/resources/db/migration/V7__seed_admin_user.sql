-- Local/dev convenience seed user.
-- Uses a bcrypt hash so it works with the normal auth flow.
INSERT INTO users (id, first_name, last_name, email, password_hash, role, phone)
VALUES (
  'u_admin',
  'Admin',
  'User',
  'revin@example.com',
  '$2b$10$mh5dRnHt1SUqnaM1zsWVauI939xoKqpHp.LXIfUshit6T2C/iofB.',
  'ADMIN',
  '+1 212 555 0100'
)
ON CONFLICT (email) DO UPDATE
SET
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  phone = EXCLUDED.phone;
