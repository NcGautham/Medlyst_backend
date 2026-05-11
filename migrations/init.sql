CREATE TABLE IF NOT EXISTS doctors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  speciality TEXT,
  bio TEXT,
  hospital TEXT,
  photo_url TEXT,
  tags TEXT,
  experience INTEGER DEFAULT 0,
  rating REAL DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Upgrade older DBs that only had the minimal doctors row (idempotent)
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS hospital TEXT;
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS tags TEXT;
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS experience INTEGER DEFAULT 0;
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS rating REAL DEFAULT 5.0;
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

CREATE TABLE IF NOT EXISTS slots (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE,
  start_time TIMESTAMP NOT NULL,
  duration_min INTEGER NOT NULL,
  total_capacity INTEGER NOT NULL,
  available INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  slot_id INTEGER REFERENCES slots(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_phone TEXT,
  status TEXT NOT NULL CHECK (status IN ('PENDING','CONFIRMED','FAILED')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  expires_at TIMESTAMP
);

