-- Default doctors (same data as frontend src/data/doctors.ts).
-- Run in Supabase → SQL Editor after doctors table exists.
-- Safe to re-run: deletes prior seed rows by name match, then inserts.

DELETE FROM bookings
WHERE slot_id IN (
  SELECT id FROM slots
  WHERE doctor_id IN (
    SELECT id FROM doctors WHERE name IN (
      'Dr. Sarah Mitchell', 'Dr. Michael Chen', 'Dr. Emily Rodriguez', 'Dr. James Wilson',
      'Dr. Lisa Thompson', 'Dr. Robert Kim', 'Dr. Amanda Foster', 'Dr. David Martinez'
    )
  )
);
DELETE FROM slots
WHERE doctor_id IN (
  SELECT id FROM doctors WHERE name IN (
    'Dr. Sarah Mitchell', 'Dr. Michael Chen', 'Dr. Emily Rodriguez', 'Dr. James Wilson',
    'Dr. Lisa Thompson', 'Dr. Robert Kim', 'Dr. Amanda Foster', 'Dr. David Martinez'
  )
);
DELETE FROM doctors
WHERE name IN (
  'Dr. Sarah Mitchell', 'Dr. Michael Chen', 'Dr. Emily Rodriguez', 'Dr. James Wilson',
  'Dr. Lisa Thompson', 'Dr. Robert Kim', 'Dr. Amanda Foster', 'Dr. David Martinez'
);

INSERT INTO doctors (name, speciality, bio, hospital, photo_url, tags, experience, rating, review_count)
VALUES
(
  'Dr. Sarah Mitchell',
  'Cardiologist',
  'Dr. Sarah Mitchell is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.',
  'City Heart Center',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
  NULL,
  15,
  4.9,
  127
),
(
  'Dr. Michael Chen',
  'Dermatologist',
  'Dr. Michael Chen is a renowned dermatologist known for his expertise in cosmetic dermatology and skin cancer treatment. He combines traditional methods with cutting-edge technology.',
  'Skin & Beauty Clinic',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
  NULL,
  12,
  4.8,
  98
),
(
  'Dr. Emily Rodriguez',
  'Pediatrician',
  'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence.',
  'Children''s Wellness Center',
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
  NULL,
  10,
  4.9,
  215
),
(
  'Dr. James Wilson',
  'Orthopedic Surgeon',
  'Dr. James Wilson is an orthopedic surgeon specializing in joint replacement and sports medicine. He has performed over 2,000 successful surgeries.',
  'Joint & Spine Institute',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
  NULL,
  18,
  4.7,
  89
),
(
  'Dr. Lisa Thompson',
  'Neurologist',
  'Dr. Lisa Thompson is a neurologist with expertise in headache disorders, epilepsy, and neurodegenerative diseases. She is known for her patient-centered approach.',
  'Brain & Spine Center',
  'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face',
  NULL,
  14,
  4.8,
  156
),
(
  'Dr. Robert Kim',
  'General Practitioner',
  'Dr. Robert Kim is a family medicine physician who provides comprehensive primary care for patients of all ages. He believes in building long-term relationships with his patients.',
  'Family Health Clinic',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face',
  NULL,
  20,
  4.6,
  312
),
(
  'Dr. Amanda Foster',
  'Psychiatrist',
  'Dr. Amanda Foster is a psychiatrist specializing in anxiety, depression, and trauma-related disorders. She takes a holistic approach to mental health treatment.',
  'Mental Wellness Center',
  'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop&crop=face',
  NULL,
  11,
  4.9,
  178
),
(
  'Dr. David Martinez',
  'Ophthalmologist',
  'Dr. David Martinez is an ophthalmologist specializing in cataract surgery and LASIK. He has helped thousands of patients achieve better vision.',
  'Vision Care Center',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
  NULL,
  16,
  4.7,
  94
);
