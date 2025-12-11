require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Log and keep process alive on unexpected errors
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
});

const adminRoutes = require('./routes/admin');
const slotRoutes = require('./routes/slots');
const bookingRoutes = require('./routes/bookings');
const doctorRoutes = require('./routes/doctors');

const app = express();

console.log('Medlyst backend starting…');
app.use(cors());
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/slots', slotRoutes);
app.use('/bookings', bookingRoutes);
app.use('/doctors', doctorRoutes);

app.get('/', (req, res) => res.send('Medlyst backend running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
