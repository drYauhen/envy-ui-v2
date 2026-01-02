-- Таблица для секций меню
CREATE TABLE IF NOT EXISTS navigation_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  title TEXT,
  order_index INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Таблица для элементов меню
CREATE TABLE IF NOT EXISTS navigation_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_key TEXT NOT NULL,
  key TEXT NOT NULL,
  label TEXT NOT NULL,
  icon TEXT,
  badge TEXT,
  route_path TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  is_disabled BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (section_key) REFERENCES navigation_sections(key),
  UNIQUE(section_key, key)
);

-- Таблица для контента страниц
CREATE TABLE IF NOT EXISTS page_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  metadata TEXT, -- JSON для дополнительных данных (icon, section и т.д.)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (page_key) REFERENCES navigation_items(key)
);

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS idx_sections_order ON navigation_sections(order_index);
CREATE INDEX IF NOT EXISTS idx_items_section ON navigation_items(section_key);
CREATE INDEX IF NOT EXISTS idx_items_order ON navigation_items(section_key, order_index);
CREATE INDEX IF NOT EXISTS idx_page_content_key ON page_content(page_key);

