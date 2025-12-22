const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

async function getDb() {
  // Use DB_PATH from environment or fallback to default
  const dbPath = process.env.DB_PATH || 'server/database.sqlite';
  const fullDbPath = path.resolve(__dirname, '..', dbPath);

  // Ensure database directory exists
  const dbDir = path.dirname(fullDbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log(`✓ Created database directory: ${dbDir}`);
  }

  const db = await open({
    filename: fullDbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY, 
      title TEXT, 
      category TEXT, 
      date TEXT, 
      summary TEXT, 
      image TEXT, 
      content TEXT
    );

    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY, 
      title TEXT, 
      type TEXT, 
      location TEXT, 
      time TEXT, 
      exp TEXT, 
      department TEXT
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY, 
      title TEXT, 
      category TEXT, 
      description TEXT, 
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS pages (
      id TEXT PRIMARY KEY, 
      slug TEXT UNIQUE, 
      title TEXT, 
      content TEXT, 
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY, 
      name TEXT, 
      surname TEXT, 
      email TEXT, 
      phone TEXT, 
      message TEXT, 
      date TEXT
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      id TEXT PRIMARY KEY,
      ckey TEXT UNIQUE,
      value TEXT,
      group_name TEXT,
      type TEXT
    );

    CREATE TABLE IF NOT EXISTS menu_items (
      id TEXT PRIMARY KEY,
      label TEXT,
      url TEXT,
      order_index INTEGER
    );

    CREATE TABLE IF NOT EXISTS home_features (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      icon TEXT,
      order_index INTEGER
    );

    CREATE TABLE IF NOT EXISTS home_services (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      icon TEXT,
      link TEXT,
      order_index INTEGER
    );

    CREATE TABLE IF NOT EXISTS infrastructure_features (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      icon TEXT,
      points TEXT,
      order_index INTEGER
    );

    CREATE TABLE IF NOT EXISTS tech_partners (
      id TEXT PRIMARY KEY,
      name TEXT,
      icon TEXT,
      order_index INTEGER
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      name TEXT,
      title TEXT,
      quote TEXT,
      image TEXT,
      order_index INTEGER
    );

    CREATE TABLE IF NOT EXISTS career_values (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      icon TEXT,
      order_index INTEGER
    );

    CREATE TABLE IF NOT EXISTS career_tech_stack (
      id TEXT PRIMARY KEY,
      name TEXT,
      icon TEXT,
      order_index INTEGER
    );

    CREATE TABLE IF NOT EXISTS legal_sections (
      id TEXT PRIMARY KEY,
      title TEXT,
      content TEXT,
      anchor TEXT,
      order_index INTEGER
    );
  `);

  return db;
}

module.exports = getDb;
