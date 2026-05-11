// db/index.js
// Render (and some hosts) cannot reach Supabase over IPv6; DNS often returns AAAA first → ENETUNREACH
const dns = require('node:dns');
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

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
