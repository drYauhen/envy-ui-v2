import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db: Database.Database | null = null;

export function initDatabase() {
  const dbPath = join(__dirname, 'database.sqlite');
  db = new Database(dbPath);
  
  // Включить foreign keys
  db.pragma('foreign_keys = ON');
  
  // Инициализировать схему
  const schema = readFileSync(join(__dirname, 'init.sql'), 'utf-8');
  db.exec(schema);
  
  console.log('✅ Database initialized at:', dbPath);
  return db;
}

export function getDatabase(): Database.Database {
  if (!db) {
    return initDatabase();
  }
  return db;
}

// Методы для работы с секциями
export const sectionQueries = {
  getAll: (db: Database.Database) => {
    return db.prepare('SELECT * FROM navigation_sections ORDER BY order_index ASC').all();
  },
  getByKey: (db: Database.Database, key: string) => {
    return db.prepare('SELECT * FROM navigation_sections WHERE key = ?').get(key);
  },
  create: (db: Database.Database, data: { key: string; title?: string; orderIndex?: number }) => {
    const stmt = db.prepare(`
      INSERT INTO navigation_sections (key, title, order_index)
      VALUES (?, ?, ?)
    `);
    return stmt.run(data.key, data.title || null, data.orderIndex || 0);
  },
  update: (db: Database.Database, key: string, data: { title?: string; orderIndex?: number }) => {
    const stmt = db.prepare(`
      UPDATE navigation_sections 
      SET title = COALESCE(?, title), 
          order_index = COALESCE(?, order_index),
          updated_at = CURRENT_TIMESTAMP
      WHERE key = ?
    `);
    return stmt.run(data.title || null, data.orderIndex ?? null, key);
  },
};

// Методы для работы с элементами меню
export const itemQueries = {
  getBySection: (db: Database.Database, sectionKey: string) => {
    return db.prepare(`
      SELECT * FROM navigation_items 
      WHERE section_key = ? AND is_active = 1
      ORDER BY order_index ASC
    `).all(sectionKey);
  },
  create: (db: Database.Database, data: {
    sectionKey: string;
    key: string;
    label: string;
    icon?: string;
    badge?: string;
    routePath?: string;
    orderIndex?: number;
    isActive?: boolean;
    isDisabled?: boolean;
  }) => {
    const stmt = db.prepare(`
      INSERT INTO navigation_items 
      (section_key, key, label, icon, badge, route_path, order_index, is_active, is_disabled)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      data.sectionKey,
      data.key,
      data.label,
      data.icon || null,
      data.badge || null,
      data.routePath || null,
      data.orderIndex || 0,
      data.isActive !== undefined ? (data.isActive ? 1 : 0) : 1,
      data.isDisabled !== undefined ? (data.isDisabled ? 1 : 0) : 0
    );
  },
  update: (db: Database.Database, id: number, data: {
    label?: string;
    icon?: string;
    badge?: string;
    routePath?: string;
    isActive?: boolean;
    isDisabled?: boolean;
    orderIndex?: number;
  }) => {
    const stmt = db.prepare(`
      UPDATE navigation_items 
      SET label = COALESCE(?, label),
          icon = COALESCE(?, icon),
          badge = COALESCE(?, badge),
          route_path = COALESCE(?, route_path),
          is_active = COALESCE(?, is_active),
          is_disabled = COALESCE(?, is_disabled),
          order_index = COALESCE(?, order_index),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    return stmt.run(
      data.label || null,
      data.icon || null,
      data.badge || null,
      data.routePath || null,
      data.isActive ?? null,
      data.isDisabled ?? null,
      data.orderIndex ?? null,
      id
    );
  },
  delete: (db: Database.Database, id: number) => {
    return db.prepare('DELETE FROM navigation_items WHERE id = ?').run(id);
  },
};

