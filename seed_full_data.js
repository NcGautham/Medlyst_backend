const pool = require('./db');

const doctorsData = [
  {
    name: 'Dr. Sarah Mitchell',
    speciality: 'Cardiologist',
    rating: 4.9,
    review_count: 127,
    hospital: 'City Heart Center',
    bio: 'Dr. Sarah Mitchell is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.',
    photo_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    tags: ['Heart Health', 'Prevention', 'ECG'],
    experience: 15,
  },
  {
    name: 'Dr. Michael Chen',
    speciality: 'Dermatologist',
    rating: 4.8,
    review_count: 98,
    hospital: 'Skin & Beauty Clinic',
    bio: 'Dr. Michael Chen is a renowned dermatologist known for his expertise in cosmetic dermatology and skin cancer treatment. He combines traditional methods with cutting-edge technology.',
    photo_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    tags: ['Skin Care', 'Cosmetic', 'Laser'],
    experience: 12,
  },
  {
    name: 'Dr. Emily Rodriguez',
    speciality: 'Pediatrician',
    rating: 4.9,
    review_count: 215,
    hospital: 'Children\'s Wellness Center',
    bio: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence.',
    photo_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
    tags: ['Child Care', 'Vaccinations', 'Development'],
    experience: 10,
  },
  {
    name: 'Dr. James Wilson',
    speciality: 'Orthopedic Surgeon',
    rating: 4.7,
    review_count: 89,
    hospital: 'Joint & Spine Institute',
    bio: 'Dr. James Wilson is an orthopedic surgeon specializing in joint replacement and sports medicine. He has performed over 2,000 successful surgeries.',
    photo_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
    tags: ['Joint Pain', 'Sports Medicine', 'Surgery'],
    experience: 18,
  },
  {
    name: 'Dr. Lisa Thompson',
    speciality: 'Neurologist',
    rating: 4.8,
    review_count: 156,
    hospital: 'Brain & Spine Center',
    bio: 'Dr. Lisa Thompson is a neurologist with expertise in headache disorders, epilepsy, and neurodegenerative diseases. She is known for her patient-centered approach.',
    photo_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face',
    tags: ['Headache', 'Epilepsy', 'Memory'],
    experience: 14,
  },
  {
    name: 'Dr. Robert Kim',
    speciality: 'General Practitioner',
    rating: 4.6,
    review_count: 312,
    hospital: 'Family Health Clinic',
    bio: 'Dr. Robert Kim is a family medicine physician who provides comprehensive primary care for patients of all ages. He believes in building long-term relationships with his patients.',
    photo_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face',
    tags: ['Primary Care', 'Checkups', 'Chronic Care'],
    experience: 20,
  },
  {
    name: 'Dr. Amanda Foster',
    speciality: 'Psychiatrist',
    rating: 4.9,
    review_count: 178,
    hospital: 'Mental Wellness Center',
    bio: 'Dr. Amanda Foster is a psychiatrist specializing in anxiety, depression, and trauma-related disorders. She takes a holistic approach to mental health treatment.',
    photo_url: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop&crop=face',
    tags: ['Anxiety', 'Depression', 'Therapy'],
    experience: 11,
  },
  {
    name: 'Dr. David Martinez',
    speciality: 'Ophthalmologist',
    rating: 4.7,
    review_count: 94,
    hospital: 'Vision Care Center',
    bio: 'Dr. David Martinez is an ophthalmologist specializing in cataract surgery and LASIK. He has helped thousands of patients achieve better vision.',
    photo_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
    tags: ['Eye Care', 'LASIK', 'Cataract'],
    experience: 16,
  }
];

const alterTable = async () => {
    try {
        await pool.query('ALTER TABLE doctors ADD COLUMN IF NOT EXISTS rating NUMERIC DEFAULT 0');
        await pool.query('ALTER TABLE doctors ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0');
        await pool.query('ALTER TABLE doctors ADD COLUMN IF NOT EXISTS hospital TEXT');
        await pool.query('ALTER TABLE doctors ADD COLUMN IF NOT EXISTS bio TEXT');
        await pool.query('ALTER TABLE doctors ADD COLUMN IF NOT EXISTS photo_url TEXT');
        await pool.query('ALTER TABLE doctors ADD COLUMN IF NOT EXISTS tags TEXT[]');
        await pool.query('ALTER TABLE doctors ADD COLUMN IF NOT EXISTS experience INTEGER DEFAULT 0');
        console.log('Schema updated successfully');
    } catch (e) {
        console.error('Error updating schema', e);
    }
};

const generateSlots = (doctorId, startHour = 9, endHour = 17) => {
    const slots = [];
    const today = new Date();
    // Create slots for next 5 days
    for (let i = 1; i <= 5; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        // Skip Sundays
        if(date.getDay() === 0) continue;

        for (let h = startHour; h < endHour; h++) {
            // :00 and :30
            const times = [0, 30];
            for (let m of times) {
                // Randomly skip to look realistic
                if (Math.random() > 0.7) continue;
                
                const d = new Date(date);
                d.setHours(h, m, 0, 0);
                slots.push({
                   doctor_id: doctorId,
                   start_time: d,
                   duration_min: 30,
                   total_capacity: 1 
                });
            }
        }
    }
    return slots;
}

const seed = async () => {
    await alterTable();
    
    // Clear existing data to avoid dups for this demo
    await pool.query('DELETE FROM bookings');
    await pool.query('DELETE FROM slots');
    await pool.query('DELETE FROM doctors');

    for (const doc of doctorsData) {
        const { rows } = await pool.query(
            `INSERT INTO doctors 
            (name, speciality, rating, review_count, hospital, bio, photo_url, tags, experience) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
            [doc.name, doc.speciality, doc.rating, doc.review_count, doc.hospital, doc.bio, doc.photo_url, doc.tags, doc.experience]
        );
        const doctorId = rows[0].id;
        
        // Generate slots
        const slots = generateSlots(doctorId);
        for(const s of slots) {
            await pool.query(
                `INSERT INTO slots (doctor_id, start_time, duration_min, total_capacity, available)
                 VALUES ($1, $2, $3, $4, $4)`,
                 [s.doctor_id, s.start_time, s.duration_min, s.total_capacity]
            );
        }
    }
    console.log('Database seeded with rich data!');
    process.exit(0);
};

seed();
