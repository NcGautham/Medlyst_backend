const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT s.*, d.name as doctor_name, d.speciality
       FROM slots s
       JOIN doctors d ON s.doctor_id = d.id
       ORDER BY s.start_time`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

