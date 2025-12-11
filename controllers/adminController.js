const pool = require('../db');

exports.createDoctor = async (req, res) => {
  const { name, speciality, bio, hospital, photo_url, tags, experience } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });

  try {
    const { rows } = await pool.query(
      `INSERT INTO doctors 
       (name, speciality, bio, hospital, photo_url, tags, experience, rating, review_count) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, 5.0, 0) RETURNING *`,
      [name, speciality || null, bio || null, hospital || null, photo_url || null, tags || null, experience || 0]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createSlot = async (req, res) => {
  const { doctor_id, start_time, duration_min, total_capacity } = req.body;
  if (!doctor_id || !start_time || !duration_min || !total_capacity)
    return res.status(400).json({ error: 'missing fields' });

  try {
    const { rows } = await pool.query(
      `INSERT INTO slots (doctor_id, start_time, duration_min, total_capacity, available)
       VALUES ($1, $2, $3, $4, $4) RETURNING *`,
      [doctor_id, start_time, duration_min, total_capacity]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.listAllSlots = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM slots ORDER BY start_time');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM doctors WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Doctor not found' });
    res.json({ message: 'Doctor deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

