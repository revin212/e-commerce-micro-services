INSERT INTO products (id, slug, name, description, price_amount, currency, image_urls, rating_average, rating_count, badges)
VALUES
  ('p_1', 'atelier-lamp', 'Atelier Lamp', 'Soft architectural task light', 189, 'USD', '/fixtures/lamp.png,/fixtures/lamp-2.png,/fixtures/lamp-3.png', 4.8, 112, 'new'),
  ('p_2', 'contour-vase', 'Contour Vase', 'Hand-finished matte ceramic vase', 59, 'USD', '/fixtures/vase.png', 4.4, 68, ''),
  ('p_3', 'woven-rug', 'Woven Rug', 'Textured accent rug for modern interiors', 129, 'USD', '/fixtures/rug.png', 4.6, 48, 'bestseller')
ON CONFLICT (id) DO NOTHING;

INSERT INTO product_variants (id, product_id, color, size, in_stock)
VALUES
  ('v1', 'p_1', 'Sand', 'S', true),
  ('v2', 'p_1', 'Sand', 'M', true),
  ('v3', 'p_1', 'Graphite', 'L', false),
  ('v4', 'p_2', 'Bone', 'One Size', true),
  ('v5', 'p_3', 'Natural', 'Large', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO inventory (product_id, sku, on_hand, reserved)
VALUES
  ('p_1', 'ATL-001', 22, 0),
  ('p_2', 'CON-204', 4, 0),
  ('p_3', 'RUG-101', 0, 0)
ON CONFLICT (product_id) DO NOTHING;

INSERT INTO orders (id, user_email, status, eta, total, address, timeline)
VALUES
  ('ord_1001', 'revin@example.com', 'shipped', 'Apr 25', 345, '29 Mercer St, New York, NY', 'processing,packed,shipped,delivered'),
  ('ord_1000', 'revin@example.com', 'delivered', 'Apr 18', 219, '29 Mercer St, New York, NY', 'processing,packed,shipped,delivered')
ON CONFLICT (id) DO NOTHING;
