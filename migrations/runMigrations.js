const fs = require('fs');
const path = require('path');
const pool = require('../db');

async function run() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'init.sql')).toString();
    await pool.query(sql);
    console.log('Migration completed.');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    pool.end();
  }
}

run();

