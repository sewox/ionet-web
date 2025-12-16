const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

async function getDb() {
  const db = await open({
    filename: path.resolve(__dirname, 'database.sqlite'),
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
  `);

  return db;
}

module.exports = getDb;
