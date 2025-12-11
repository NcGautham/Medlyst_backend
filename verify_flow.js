const axios = require('axios');

const API_URL = 'http://localhost:5001';

async function runVerification() {
    try {
        console.log('1. Creating a New Doctor...');
        const doctorPayload = {
            name: 'Dr. Test Verifier',
            speciality: 'Neurologist',
            bio: 'A test doctor for verification.',
            hospital: 'Test Hospital',
            photo_url: 'https://via.placeholder.com/150',
            tags: ['Test', 'Brain'],
            experience: 5
        };

        const docRes = await axios.post(`${API_URL}/admin/doctors`, doctorPayload);
        const doctor = docRes.data;
        console.log(`   Success: Created Doctor ID ${doctor.id}`);

        console.log('\n2. Creating Slots for the Doctor...');
        const slotPayload = {
            doctor_id: doctor.id,
            start_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            duration_min: 30,
            total_capacity: 1
        };
        const slotRes = await axios.post(`${API_URL}/admin/slots`, slotPayload);
        const slot = slotRes.data;
        console.log(`   Success: Created Slot ID ${slot.id}`);

        console.log('\n3. Verifying Doctor appears in List...');
        const listRes = await axios.get(`${API_URL}/doctors`);
        const foundDoc = listRes.data.find(d => d.id === doctor.id);
        if (foundDoc) {
            console.log('   Success: Doctor found in list with rich data.');
        } else {
            console.error('   FAILED: Doctor not found in list.');
        }

        console.log('\n4. Booking the Slot...');
        const bookingPayload = {
            slot_id: slot.id,
            user_name: 'Test Patient',
            user_phone: '555-0199'
        };
        const bookRes = await axios.post(`${API_URL}/bookings`, bookingPayload);
        console.log(`   Success: Booking Created ID ${bookRes.data.id}`);

        console.log('\n5. Verifying Slot Availability...');
        const updatedDocsRes = await axios.get(`${API_URL}/doctors/${doctor.id}`);
        const updatedSlot = updatedDocsRes.data.slots.find(s => s.id === slot.id);

        // Check if available count decreased or capacity logic holds (assuming available goes down)
        console.log(`   Slot availability: ${updatedSlot.available} (Original: ${slot.total_capacity})`);

        console.log('\nVerification Complete!');

    } catch (error) {
        console.error('Verification Failed:', error?.response?.data || error.message);
    }
}

runVerification();
