const bookingService = require('../services/bookingService');

exports.createBooking = async (req, res) => {
  const { slot_id, user_name, user_phone } = req.body;

  if (!slot_id || !user_name)
    return res.status(400).json({ error: 'slot_id and user_name required' });

  const result = await bookingService.attemptBooking(slot_id, user_name, user_phone);

  if (result.status === 'CONFIRMED')
    return res.status(201).json({ id: result.booking.id, status: 'CONFIRMED' });

  return res.status(409).json({ status: 'FAILED', reason: result.reason });
};

exports.getBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await bookingService.getBookingById(id);

  if (!booking) return res.status(404).json({ error: 'Not found' });

  res.json(booking);
};

