-- Angeldust seed — workspace aacd5519-8009-434b-8bd9-a7524b5cbb20
-- Run this against the QuickDash production Neon DB.
-- Images are left null — add via QuickDash admin panel.

-- ─── Categories ──────────────────────────────────────────────────────────────

INSERT INTO categories (id, workspace_id, name, slug, sort_order) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Makeup',      'makeup',    1),
  ('c1000000-0000-0000-0000-000000000002', 'aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Skincare',    'skincare',  2),
  ('c1000000-0000-0000-0000-000000000003', 'aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Fragrance',   'fragrance', 3),
  ('c1000000-0000-0000-0000-000000000004', 'aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Hair',        'hair',      4),
  ('c1000000-0000-0000-0000-000000000005', 'aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Bath & Body', 'bath',      5)
ON CONFLICT (slug) DO NOTHING;

-- ─── Featured Products (20) ───────────────────────────────────────────────────

INSERT INTO products (workspace_id, name, slug, price, is_active, is_featured, category_id, tags, images) VALUES

  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Matte Revolution Lipstick',         'matte-revolution-lipstick',        '890.00',  true, true,  'c1000000-0000-0000-0000-000000000001', '["lipstick","charlotte tilbury","lips"]',   '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Natural Radiant Longwear Foundation','natural-radiant-foundation',       '1250.00', true, true,  'c1000000-0000-0000-0000-000000000001', '["foundation","nars","face"]',              '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Soft Pinch Liquid Blush',           'soft-pinch-liquid-blush',          '720.00',  true, true,  'c1000000-0000-0000-0000-000000000001', '["blush","rare beauty","cheeks"]',          '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Pro Filt''r Concealer',             'pro-filtr-concealer',              '680.00',  true, true,  'c1000000-0000-0000-0000-000000000001', '["concealer","fenty beauty","face"]',       '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Studio Fix Powder',                 'studio-fix-powder',                '780.00',  true, true,  'c1000000-0000-0000-0000-000000000001', '["powder","mac","face"]',                  '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Naked Midnight Palette',            'naked-midnight-palette',           '1890.00', true, true,  'c1000000-0000-0000-0000-000000000001', '["eyeshadow","urban decay","eyes","palette"]','[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'They''re Real Mascara',             'theyre-real-mascara',              '650.00',  true, true,  'c1000000-0000-0000-0000-000000000001', '["mascara","benefit","eyes"]',             '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Better Than Sex Foundation',        'better-than-sex-foundation',       '1100.00', true, true,  'c1000000-0000-0000-0000-000000000001', '["foundation","too faced","face"]',         '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', '35O Eyeshadow Palette',             '35o-eyeshadow-palette',            '950.00',  true, true,  'c1000000-0000-0000-0000-000000000001', '["eyeshadow","morphe","eyes","palette"]',   '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Soft Matte Lip Cream',              'soft-matte-lip-cream',             '290.00',  true, true,  'c1000000-0000-0000-0000-000000000001', '["lip cream","nyx","lips"]',               '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Hollywood Glow Highlighter',        'hollywood-glow-highlighter',       '1350.00', true, true,  'c1000000-0000-0000-0000-000000000001', '["highlighter","charlotte tilbury","cheeks"]','[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Eyeliner Stylo',                    'eyeliner-stylo',                   '580.00',  true, true,  'c1000000-0000-0000-0000-000000000001', '["eyeliner","nars","eyes"]',               '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Gloss Bomb Lip Gloss',              'gloss-bomb-lip-gloss',             '490.00',  true, true,  'c1000000-0000-0000-0000-000000000001', '["lip gloss","fenty beauty","lips"]',      '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Liquid Touch Foundation',           'liquid-touch-foundation',          '980.00',  true, true,  'c1000000-0000-0000-0000-000000000001', '["foundation","rare beauty","face"]',      '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Ruby Woo Lipstick',                 'ruby-woo-lipstick',                '520.00',  true, true,  'c1000000-0000-0000-0000-000000000001', '["lipstick","mac","lips"]',                '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'All Nighter Setting Spray',         'all-nighter-setting-spray',        '760.00',  true, true,  'c1000000-0000-0000-0000-000000000001', '["setting spray","urban decay","face"]',   '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Hoola Bronzer',                     'hoola-bronzer',                    '840.00',  true, true,  'c1000000-0000-0000-0000-000000000001', '["bronzer","benefit","cheeks"]',           '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Natural Eyes Palette',              'natural-eyes-palette',             '1150.00', true, true,  'c1000000-0000-0000-0000-000000000001', '["eyeshadow","too faced","eyes","palette"]','[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Vegan Brush Set',                   'vegan-brush-set',                  '1050.00', true, true,  'c1000000-0000-0000-0000-000000000001', '["brushes","morphe","tools"]',             '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Studio Perfect Primer',             'studio-perfect-primer',            '340.00',  true, true,  'c1000000-0000-0000-0000-000000000001', '["primer","nyx","face"]',                  '[]')

ON CONFLICT (slug) DO NOTHING;

-- ─── New Arrivals (12) ────────────────────────────────────────────────────────

INSERT INTO products (workspace_id, name, slug, price, is_active, is_featured, category_id, tags, images) VALUES

  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Sublime Perfection Foundation', 'sublime-perfection-foundation', '1890.00', true, false, 'c1000000-0000-0000-0000-000000000001', '["foundation","pat mcgrath","face"]',          '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Ambient Lighting Powder',       'ambient-lighting-powder',       '1650.00', true, false, 'c1000000-0000-0000-0000-000000000001', '["powder","hourglass","face"]',                '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Super Serum Skin Tint',         'super-serum-skin-tint',         '1100.00', true, false, 'c1000000-0000-0000-0000-000000000002', '["skin tint","ilia","skincare","face"]',        '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'ShineOn Lip Jelly',             'shineon-lip-jelly',             '480.00',  true, false, 'c1000000-0000-0000-0000-000000000001', '["lip gloss","tower 28","lips"]',              '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Bionic Blush',                  'bionic-blush',                  '720.00',  true, false, 'c1000000-0000-0000-0000-000000000001', '["blush","milk makeup","cheeks"]',             '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Luxury Eye Palette',            'luxury-eye-palette',            '2100.00', true, false, 'c1000000-0000-0000-0000-000000000001', '["eyeshadow","charlotte tilbury","eyes","palette"]','[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Perfect Strokes Concealer',     'perfect-strokes-concealer',     '790.00',  true, false, 'c1000000-0000-0000-0000-000000000001', '["concealer","rare beauty","face"]',           '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Trophy Wife Highlighter',       'trophy-wife-highlighter',       '680.00',  true, false, 'c1000000-0000-0000-0000-000000000001', '["highlighter","fenty beauty","cheeks"]',      '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Rouge Dior Lipstick',           'rouge-dior-lipstick',           '1350.00', true, false, 'c1000000-0000-0000-0000-000000000001', '["lipstick","dior","lips"]',                   '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Lip Gloss',                     'lip-gloss-tom-ford',            '1480.00', true, false, 'c1000000-0000-0000-0000-000000000001', '["lip gloss","tom ford","lips"]',              '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Loulou Lipstick',               'loulou-lipstick',               '980.00',  true, false, 'c1000000-0000-0000-0000-000000000001', '["lipstick","ysl","lips"]',                    '[]'),
  ('aacd5519-8009-434b-8bd9-a7524b5cbb20', 'Monsieur Big Mascara',          'monsieur-big-mascara',          '890.00',  true, false, 'c1000000-0000-0000-0000-000000000001', '["mascara","lancome","eyes"]',                 '[]')

ON CONFLICT (slug) DO NOTHING;
