const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM doctors ORDER BY id');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get doctor by id with slots
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const doctorRes = await pool.query('SELECT * FROM doctors WHERE id = $1', [id]);

        if (doctorRes.rows.length === 0) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        const doctor = doctorRes.rows[0];

        // Fetch slots
        const slotsRes = await pool.query(
            'SELECT * FROM slots WHERE doctor_id = $1 AND start_time > NOW() ORDER BY start_time',
            [id]
        );

        res.json({ ...doctor, slots: slotsRes.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
