const axios = require("axios");

const BASE_URL = process.env.BASE_URL || "http://localhost:5001";
const SLOT_ID = parseInt(process.env.SLOT_ID || 1);
const CONCURRENT = parseInt(process.env.CONCURRENT || 10);

async function tryBooking(i) {
  try {
    const res = await axios.post(`${BASE_URL}/bookings`, {
      slot_id: SLOT_ID,
      user_name: `User_${i}`,
      user_phone: `90000000${i}`
    });
    const status = res.data.status;
    if (status === "CONFIRMED") return "CONFIRMED";
    if (status === "FAILED") return "FAILED";
    return "UNKNOWN";
  } catch (err) {
    console.error("BOOKING ERROR:", err.response?.data || err.message);
    if (err.response?.data?.status === "FAILED") return "FAILED";
    return "ERROR";
  }
}

(async () => {
  const requests = [];
  for (let i = 0; i < CONCURRENT; i++) {
    requests.push(tryBooking(i));
  }

  const results = await Promise.all(requests);

  const summary = {
    total: results.length,
    confirmed: results.filter(r => r === "CONFIRMED").length,
    failed: results.filter(r => r === "FAILED").length,
    errors: results.filter(r => r === "ERROR").length,
    raw: results
  };

  console.log(summary);
})();
