const pool = require('../db');

async function attemptBooking(slotId, userName, userPhone) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const slotRes = await client.query(
      'SELECT id, available FROM slots WHERE id = $1 FOR UPDATE',
      [slotId]
    );

    if (slotRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return { status: 'FAILED', reason: 'slot not found' };
    }

    const available = slotRes.rows[0].available;

    if (available <= 0) {
      await client.query('ROLLBACK');
      return { status: 'FAILED', reason: 'no availability' };
    }

    await client.query(
      'UPDATE slots SET available = available - 1 WHERE id = $1',
      [slotId]
    );

    const bookingRes = await client.query(
      `INSERT INTO bookings (slot_id, user_name, user_phone, status)
       VALUES ($1, $2, $3, 'CONFIRMED') RETURNING id, status`,
      [slotId, userName, userPhone]
    );

    await client.query('COMMIT');

    return { status: 'CONFIRMED', booking: bookingRes.rows[0] };

  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    return { status: 'FAILED', reason: 'server error' };
  } finally {
    client.release();
  }
}

async function getBookingById(id) {
  const { rows } = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
  return rows[0];
}

module.exports = { attemptBooking, getBookingById };

