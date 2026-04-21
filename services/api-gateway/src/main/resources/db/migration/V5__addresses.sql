CREATE TABLE IF NOT EXISTS addresses (
  id VARCHAR(64) PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  line1 TEXT NOT NULL,
  city VARCHAR(120),
  state VARCHAR(120),
  postal_code VARCHAR(40),
  country VARCHAR(80)
);
