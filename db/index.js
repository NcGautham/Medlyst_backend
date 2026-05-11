// db/index.js
const { Pool } = require('pg');
require('dotenv').config();

const conn = process.env.DATABASE_URL || '';
// Supabase and most cloud Postgres require TLS even when NODE_ENV is unset on first deploy
const needsSsl =
  process.env.NODE_ENV === 'production' || conn.includes('supabase.co');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: needsSsl ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
