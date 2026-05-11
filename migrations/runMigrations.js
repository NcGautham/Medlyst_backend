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
    throw err;
  } finally {
    await pool.end().catch((e) => console.error('pool.end:', e));
  }
}

run()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

