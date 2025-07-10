-- Users table for authentication (future use)
-- CREATE TABLE users (
--   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL,
--   role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'client')),
--   client_id VARCHAR(255) -- Foreign key to clients table if role is 'client'
-- );

-- Clients table
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  join_date DATE NOT NULL,
  avatar VARCHAR(255),
  penanggung_jawab_nama VARCHAR(255),
  penanggung_jawab_jabatan VARCHAR(255),
  treatment_history TEXT,
  preferences TEXT[],
  location_address TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC
);

-- Inventory table
CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('Device', 'Skincare')),
  quantity INTEGER NOT NULL,
  purchase_date DATE NOT NULL,
  warranty_end_date DATE,
  status VARCHAR(50) NOT NULL CHECK (status IN ('In Stock', 'Low Stock', 'Out of Stock')),
  description TEXT,
  image_url VARCHAR(255),
  client_id INTEGER REFERENCES clients(id) ON DELETE SET NULL
);

-- Service Records table
CREATE TABLE service_records (
  id SERIAL PRIMARY KEY,
  equipment VARCHAR(255) NOT NULL,
  service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('Maintenance', 'Repair', 'Calibration')),
  date DATE NOT NULL,
  technician VARCHAR(255),
  cost NUMERIC(10, 2),
  status VARCHAR(50) NOT NULL CHECK (status IN ('Scheduled', 'In Progress', 'Completed')),
  client_name VARCHAR(255),
  client_location TEXT,
  problem_identification TEXT,
  solution TEXT,
  duration VARCHAR(100),
  technician_notes TEXT,
  photo_proof_url VARCHAR(255)
);

-- Appointments table
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR(255),
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  service VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('Confirmed', 'Pending', 'Cancelled'))
);

-- Client Requests table
CREATE TABLE client_requests (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR(255),
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  request_type VARCHAR(50) NOT NULL CHECK (request_type IN ('Service', 'Inquiry', 'Troubleshoot')),
  details TEXT NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('New', 'In Progress', 'Resolved')),
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);


-- MOCK DATA INSERTION
-- You can run these commands to populate your database with the initial mock data.

-- Insert Clients
INSERT INTO clients (name, email, phone, join_date, avatar, penanggung_jawab_nama, penanggung_jawab_jabatan, treatment_history, preferences, location_address, location_lat, location_lng) VALUES
('Dermaster Clinic', 'info@dermaster.com', '021-555-1111', '2022-05-15', 'https://placehold.co/100x100.png', 'Dr. Andreas', 'Kepala Cabang Kemang', 'Klien lama dengan beberapa cabang. Fokus utama pada perawatan HIFU, CoolSculpting, dan filler. Riwayat pembelian mencakup: 1x Sofwave™, 1x Vbeam Perfecta®, 1x Morpheus8. Pengiriman terakhir: Morpheus8 (Juni 2023). Membutuhkan pasokan rutin produk skincare.', '{"HIFU", "CoolSculpting", "Filler", "Botox"}', 'Jl. Kemang Sel. No.99, RT.1/RW.2, Bangka, Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730', -6.262846, 106.812211),
('Natasha Skin Clinic', 'contact@natasha-skin.com', '021-555-2222', '2021-09-01', 'https://placehold.co/100x100.png', 'Ibu Rina', 'Manajer Pembelian', 'Jaringan klinik besar dengan fokus pada perawatan laser dan produk skincare. Riwayat pembelian: 1x BiAxis QS™, 1x Divine Pro, 1x Laser Biaxis QS. Klien potensial untuk upgrade teknologi laser dan produk pendukungnya.', '{"PRP", "Laser CO₂", "Skincare"}', 'Jl. Boulevard Gading Serpong, Tangerang', -6.2349, 106.6294),
('Profira Clinic Surabaya', 'info@profira-clinic.com', '031-555-3333', '2023-02-20', 'https://placehold.co/100x100.png', 'Dr. Liana', 'Pemilik', 'Klinik butik dengan spesialisasi anti-aging. Riwayat pembelian: 1x Indiba Deep Care. Klien setia yang menghargai kualitas dan hasil. Pengiriman alat berjalan lancar dan instalasi telah selesai pada Februari 2023.', '{"Anti-Aging", "Pigmentasi", "Facial"}', 'Jl. HR Muhammad No.41, Pradahkalikendal, Kec. Dukuhpakis, Surabaya, Jawa Timur 60226', -7.2892, 112.6732),
('Miracle Aesthetic Clinic', 'bali@miracle-clinic.com', '0361-555-4444', '2023-11-10', 'https://placehold.co/100x100.png', 'Bapak Dewa', 'Direktur Operasional', 'Klinik populer di Bali dengan fokus pada prosedur invasif minimal. Riwayat pembelian: 1x PicoWay®. Menunjukkan minat pada teknologi thread lift. Pengiriman PicoWay® dilakukan pada November 2023.', '{"Microneedling", "Thread Lift", "Laser"}', 'Jl. Teuku Umar No.18A, Denpasar, Bali', -8.6756, 115.2040);

-- Insert Inventory
INSERT INTO inventory (name, type, quantity, purchase_date, warranty_end_date, status, image_url, description, client_id) VALUES
('Sofwave™', 'Device', 3, '2023-01-15', '2025-01-15', 'In Stock', 'https://regenesis.co.id/wp-content/uploads/2023/06/Sofwave-1.png', 'From Sofwave Medical. 3D Ultrasound for face/neck lifting, fine lines, and cellulite.', 1),
('Indiba Deep Care', 'Device', 1, '2023-02-20', '2025-02-20', 'In Stock', 'https://regenesis.co.id/wp-content/uploads/2023/06/Indiba-Deep-Care-1.png', 'From INDIBA®. Radio Frequency for body contouring, cellulite, post-surgery care, and circumference reduction.', 3),
('Vbeam Perfecta®', 'Device', 2, '2022-11-20', '2024-11-20', 'In Stock', 'https://regenesis.co.id/wp-content/uploads/2023/06/Vbeam-Prima.png', 'From Candela. Pulsed-Dye Laser (PDL) for rosacea, vascular issues, pigmentation, acne scars, and keloids.', 1),
('PicoWay®', 'Device', 1, '2023-08-01', '2025-08-01', 'In Stock', 'https://aspmedica.com/wp-content/uploads/2023/11/PicoWay-1.jpg', 'From Candela. Picosecond Laser for pigmentation (melasma, nevi), tattoo removal, and collagen remodeling.', 4),
('BiAxis QS™', 'Device', 1, '2023-09-10', '2025-09-10', 'In Stock', 'https://placehold.co/600x400.png', 'From BiAxis. Q-switched Laser for acne scars, freckles, pigmentation, and tattoo removal.', 2),
('Ultra V', 'Device', 100, '2024-04-01', NULL, 'In Stock', 'https://placehold.co/600x400.png', 'Benang polydioxanone (PDO) untuk nose augmentation, volumizing, dan stimulasi kolagen.', NULL),
('Morpheus8', 'Device', 2, '2023-06-12', '2025-06-12', 'In Stock', 'https://regenesis.co.id/wp-content/uploads/2023/06/Morpheus8-1.png', 'From InMode. RF Microneedling for wrinkles, skin laxity, and cellulite.', 1),
('Frax Pro', 'Device', 2, '2024-03-01', '2026-03-01', 'In Stock', 'https://placehold.co/600x400.png', 'From Ellipse / Candela. Non-ablative fractional laser for skin resurfacing, improving texture, and collagen stimulation.', NULL),
('Divine Pro', 'Device', 1, '2024-05-10', '2026-05-10', 'In Stock', 'https://placehold.co/600x400.png', 'From Pollogen / Lumenis. Multi-treatment platform for facial rejuvenation, dermal volumizing, and skin firming.', 2),
('OxyGeneo & Pollogen', 'Device', 3, '2024-06-20', '2026-06-20', 'In Stock', 'https://placehold.co/600x400.png', 'From Pollogen / Lumenis. Combines Oxygenation, RF, and Ultrasound for skin brightening, pigmentation, and anti-aging.', NULL),
('BiAxis Pico™', 'Device', 2, '2024-07-01', '2026-07-01', 'In Stock', 'https://placehold.co/600x400.png', 'From BiAxis. Picosecond Laser for pigmentation (melasma, nevi), tattoo, and collagen remodeling.', NULL),
('Laser Biaxis QS', 'Device', 1, '2024-02-15', '2026-02-15', 'In Stock', 'https://placehold.co/600x400.png', 'From BiAxis. Laser for improving melasma, pigmentation, and tattoo removal with minimal downtime.', 2),
('Geneskin® Serum', 'Skincare', 8, '2024-03-01', '2025-03-01', 'Low Stock', 'https://placehold.co/600x400.png', 'Skincare product for post-procedure care.', NULL),
('Vitamin C Cleanser', 'Skincare', 50, '2024-02-18', '2025-02-18', 'In Stock', 'https://placehold.co/600x400.png', 'A gentle cleanser with Vitamin C to brighten and refresh the skin.', NULL),
('Retinol Cream', 'Skincare', 0, '2024-01-05', '2025-01-05', 'Out of Stock', 'https://placehold.co/600x400.png', 'A powerful retinol cream for anti-aging and skin renewal.', NULL);

-- Insert Service Records
INSERT INTO service_records (equipment, service_type, date, technician, cost, status, client_name, client_location, problem_identification, solution, duration, technician_notes) VALUES
('Sofwave™', 'Maintenance', '2024-06-15', 'John Doe', 250, 'Scheduled', 'Dermaster Clinic', 'Jl. Kemang Sel. No.99, Jakarta Selatan', 'Klien meminta perawatan rutin tahunan sesuai jadwal.', 'Pemeriksaan standar, pembersihan filter, dan pembaruan perangkat lunak telah dijadwalkan.', '3 jam', 'Menunggu jadwal konfirmasi dari klien.'),
('Vbeam Perfecta®', 'Calibration', '2024-05-20', 'Jane Smith', 180, 'Completed', 'Profira Clinic Surabaya', 'Jl. HR Muhammad No.41, Surabaya', 'Output energi laser sedikit di bawah ambang batas yang ditentukan setelah 1 tahun penggunaan.', 'Kalibrasi ulang output daya laser. Pengujian setelah kalibrasi menunjukkan tingkat energi yang optimal. Membersihkan optik.', '2 jam', 'Kalibrasi berhasil, alat berfungsi normal. Tidak ada masalah lebih lanjut yang dilaporkan oleh klien.'),
('Morpheus8', 'Repair', '2024-06-01', 'Mike Johnson', 500, 'In Progress', 'Dermaster Clinic', 'Jl. Kemang Sel. No.99, Jakarta Selatan', 'Layar sentuh tidak merespons di bagian kanan bawah. Klien telah mencoba me-restart mesin beberapa kali.', 'Tim teknisi sedang dalam proses mendiagnosis apakah ini masalah perangkat keras (digitizer) atau perangkat lunak. Penggantian layar mungkin diperlukan.', 'Berkelanjutan', 'Suku cadang layar telah dipesan, menunggu pengiriman. Diperkirakan tiba dalam 5 hari kerja.'),
('Sofwave™', 'Maintenance', '2023-12-15', 'John Doe', 250, 'Completed', 'Dermaster Clinic', 'Jl. Kemang Sel. No.99, Jakarta Selatan', 'Perawatan rutin preventif sesuai jadwal pabrikan.', 'Semua sistem diperiksa, filter diganti, dan perangkat lunak diperbarui ke versi terbaru. Mesin berfungsi sesuai spesifikasi.', '4 jam', 'Perawatan selesai tanpa kendala. Klien puas.'),
('PicoWay®', 'Maintenance', '2024-07-01', 'Jane Smith', 300, 'Scheduled', 'Miracle Aesthetic Clinic', 'Jl. Teuku Umar No.18A, Denpasar, Bali', 'Jadwal pemeliharaan 6 bulan untuk memastikan kinerja puncak.', 'Akan dilakukan pembersihan optik, pemeriksaan sistem pendingin, dan verifikasi output energi.', '3 jam', NULL);

-- Insert Appointments
INSERT INTO appointments (client_name, client_id, service, date, time, status) VALUES
('Dermaster Clinic', 1, 'Demo Divine Pro', '2024-07-20', '10:00 AM', 'Confirmed'),
('Natasha Skin Clinic', 2, 'Pelatihan Laser Biaxis QS', '2024-07-21', '02:00 PM', 'Confirmed'),
('Profira Clinic Surabaya', 3, 'Konsultasi Perangkat Anti-Aging', '2024-07-22', '11:00 AM', 'Pending'),
('Miracle Aesthetic Clinic', 4, 'Training Morpheus8', '2024-07-22', '03:30 PM', 'Confirmed'),
('Dermaster Clinic', 1, 'Maintenance Perangkat Sofwave™', '2024-08-01', '09:00 AM', 'Cancelled');

-- Insert Client Requests
INSERT INTO client_requests (client_name, client_id, request_type, details, status, date) VALUES
('Dermaster Clinic', 1, 'Service', 'Request for annual maintenance on Sofwave™.', 'New', '2024-07-28'),
('Natasha Skin Clinic', 2, 'Troubleshoot', 'Laser Biaxis QS is showing an error code E-05.', 'New', '2024-07-27'),
('Miracle Aesthetic Clinic', 4, 'Inquiry', 'Question about Ultra V thread compatibility with new procedure.', 'In Progress', '2024-07-26'),
('Profira Clinic Surabaya', 3, 'Service', 'Indiba Deep Care handpiece is not heating correctly.', 'New', '2024-07-28'),
('Dermaster Clinic', 1, 'Service', 'Service for Morpheus8: The screen is flickering during use.', 'New', '2024-07-29');
