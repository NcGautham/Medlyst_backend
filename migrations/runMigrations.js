require('dotenv').config();
const fs = require('fs');
const path = require('path');

if (!process.env.DATABASE_URL || !String(process.env.DATABASE_URL).trim()) {
  console.error('FATAL: DATABASE_URL is missing or empty. Add it in Render → Environment.');
  process.exit(1);
}

const pool = require('../db');

async function run() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'init.sql')).toString();
    await pool.query(sql);
    console.log('Migration completed.');
  } catch (err) {
    console.error('Migration error:', err);
    throw err;
  } finally {
    await pool.end().catch((e) => console.error('pool.end:', e));
  }
}

run()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

