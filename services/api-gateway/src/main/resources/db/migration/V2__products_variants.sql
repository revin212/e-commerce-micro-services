CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price_amount NUMERIC(12, 2) NOT NULL,
  currency VARCHAR(8) NOT NULL,
  image_urls TEXT,
  rating_average NUMERIC(5, 2),
  rating_count INTEGER,
  badges TEXT
);

CREATE TABLE IF NOT EXISTS product_variants (
  id VARCHAR(64) PRIMARY KEY,
  product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  color VARCHAR(80) NOT NULL,
  size VARCHAR(80) NOT NULL,
  in_stock BOOLEAN NOT NULL
);
