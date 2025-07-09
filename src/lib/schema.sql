-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS service_records;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS client_requests;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS clients;

-- Clients Table
CREATE TABLE clients (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    join_date DATE NOT NULL,
    avatar VARCHAR(255),
    penanggung_jawab_nama VARCHAR(255),
    penanggung_jawab_jabatan VARCHAR(255),
    treatment_history TEXT,
    preferences TEXT[], -- Stored as an array of strings
    location_address TEXT,
    location_lat DECIMAL(9, 6),
    location_lng DECIMAL(9, 6)
);

-- Inventory Table
CREATE TABLE inventory (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Device', 'Skincare')),
    quantity INTEGER NOT NULL,
    purchase_date DATE NOT NULL,
    warranty_end_date DATE,
    status VARCHAR(50) NOT NULL CHECK (status IN ('In Stock', 'Low Stock', 'Out of Stock')),
    image_url VARCHAR(255),
    description TEXT,
    client_id VARCHAR(255) REFERENCES clients(id) -- Foreign key to clients table
);

-- Service Records Table
CREATE TABLE service_records (
    id VARCHAR(255) PRIMARY KEY,
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
    duration VARCHAR(100)
);

-- Appointments Table
CREATE TABLE appointments (
    id VARCHAR(255) PRIMARY KEY,
    client_id VARCHAR(255) REFERENCES clients(id),
    client_name VARCHAR(255),
    service VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Confirmed', 'Pending', 'Cancelled'))
);

-- Client Requests Table
CREATE TABLE client_requests (
    id VARCHAR(255) PRIMARY KEY,
    client_id VARCHAR(255) REFERENCES clients(id),
    client_name VARCHAR(255),
    request_type VARCHAR(50) NOT NULL CHECK (request_type IN ('Service', 'Inquiry', 'Troubleshoot')),
    details TEXT,
    status VARCHAR(50) NOT NULL CHECK (status IN ('New', 'In Progress', 'Resolved')),
    date DATE NOT NULL
);


-- DUMMY DATA

-- Insert Clients
INSERT INTO clients (id, name, email, phone, join_date, avatar, penanggung_jawab_nama, penanggung_jawab_jabatan, treatment_history, preferences, location_address, location_lat, location_lng) VALUES
('cli-001', 'Dermaster Clinic', 'info@dermaster.com', '021-555-1111', '2022-05-15', 'https://placehold.co/100x100.png', 'Dr. Andreas', 'Kepala Cabang Kemang', 'Klien lama dengan beberapa cabang. Fokus utama pada perawatan HIFU, CoolSculpting, dan filler. Riwayat pembelian mencakup: 1x Sofwave™, 1x Vbeam Perfecta®, 1x Morpheus8. Pengiriman terakhir: Morpheus8 (Juni 2023). Membutuhkan pasokan rutin produk skincare.', ARRAY['HIFU', 'CoolSculpting', 'Filler', 'Botox'], 'Jl. Kemang Sel. No.99, RT.1/RW.2, Bangka, Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730', -6.262846, 106.812211),
('cli-002', 'Natasha Skin Clinic', 'contact@natasha-skin.com', '021-555-2222', '2021-09-01', 'https://placehold.co/100x100.png', 'Ibu Rina', 'Manajer Pembelian', 'Jaringan klinik besar dengan fokus pada perawatan laser dan produk skincare. Riwayat pembelian: 1x BiAxis QS™, 1x Divine Pro, 1x Laser Biaxis QS. Klien potensial untuk upgrade teknologi laser dan produk pendukungnya.', ARRAY['PRP', 'Laser CO₂', 'Skincare'], 'Jl. Boulevard Gading Serpong, Tangerang', -6.234900, 106.629400),
('cli-003', 'Profira Clinic Surabaya', 'info@profira-clinic.com', '031-555-3333', '2023-02-20', 'https://placehold.co/100x100.png', 'Dr. Liana', 'Pemilik', 'Klinik butik dengan spesialisasi anti-aging. Riwayat pembelian: 1x Indiba Deep Care. Klien setia yang menghargai kualitas dan hasil. Pengiriman alat berjalan lancar dan instalasi telah selesai pada Februari 2023.', ARRAY['Anti-Aging', 'Pigmentasi', 'Facial'], 'Jl. HR Muhammad No.41, Pradahkalikendal, Kec. Dukuhpakis, Surabaya, Jawa Timur 60226', -7.289200, 112.673200),
('cli-004', 'Miracle Aesthetic Clinic', 'bali@miracle-clinic.com', '0361-555-4444', '2023-11-10', 'https://placehold.co/100x100.png', 'Bapak Dewa', 'Direktur Operasional', 'Klinik populer di Bali dengan fokus pada prosedur invasif minimal. Riwayat pembelian: 1x PicoWay®. Menunjukkan minat pada teknologi thread lift. Pengiriman PicoWay® dilakukan pada November 2023.', ARRAY['Microneedling', 'Thread Lift', 'Laser'], 'Jl. Teuku Umar No.18A, Denpasar, Bali', -8.675600, 115.204000);

-- Insert Inventory
INSERT INTO inventory (id, name, type, quantity, purchase_date, warranty_end_date, status, image_url, description, client_id) VALUES
('inv-001', 'Sofwave™', 'Device', 3, '2023-01-15', '2025-01-15', 'In Stock', 'https://regenesis.co.id/wp-content/uploads/2023/06/Sofwave-1.png', 'From Sofwave Medical. 3D Ultrasound for face/neck lifting, fine lines, and cellulite.', 'cli-001'),
('inv-002', 'Indiba Deep Care', 'Device', 1, '2023-02-20', '2025-02-20', 'In Stock', 'https://regenesis.co.id/wp-content/uploads/2023/06/Indiba-Deep-Care-1.png', 'From INDIBA®. Radio Frequency for body contouring, cellulite, post-surgery care, and circumference reduction.', 'cli-003'),
('inv-003', 'Vbeam Perfecta®', 'Device', 2, '2022-11-20', '2024-11-20', 'In Stock', 'https://regenesis.co.id/wp-content/uploads/2023/06/Vbeam-Prima.png', 'From Candela. Pulsed-Dye Laser (PDL) for rosacea, vascular issues, pigmentation, acne scars, and keloids.', 'cli-001'),
('inv-004', 'PicoWay®', 'Device', 1, '2023-08-01', '2025-08-01', 'In Stock', 'https://aspmedica.com/wp-content/uploads/2023/11/PicoWay-1.jpg', 'From Candela. Picosecond Laser for pigmentation (melasma, nevi), tattoo removal, and collagen remodeling.', 'cli-004'),
('inv-005', 'BiAxis QS™', 'Device', 1, '2023-09-10', '2025-09-10', 'In Stock', 'https://placehold.co/600x400.png', 'From BiAxis. Q-switched Laser for acne scars, freckles, pigmentation, and tattoo removal.', 'cli-002'),
('inv-006', 'Ultra V', 'Device', 100, '2024-04-01', NULL, 'In Stock', 'https://placehold.co/600x400.png', 'Benang polydioxanone (PDO) untuk nose augmentation, volumizing, dan stimulasi kolagen.', NULL),
('inv-007', 'Morpheus8', 'Device', 2, '2023-06-12', '2025-06-12', 'In Stock', 'https://regenesis.co.id/wp-content/uploads/2023/06/Morpheus8-1.png', 'From InMode. RF Microneedling for wrinkles, skin laxity, and cellulite.', 'cli-001'),
('inv-008', 'Frax Pro', 'Device', 2, '2024-03-01', '2026-03-01', 'In Stock', 'https://placehold.co/600x400.png', 'From Ellipse / Candela. Non-ablative fractional laser for skin resurfacing, improving texture, and collagen stimulation.', NULL),
('inv-009', 'Divine Pro', 'Device', 1, '2024-05-10', '2026-05-10', 'In Stock', 'https://placehold.co/600x400.png', 'From Pollogen / Lumenis. Multi-treatment platform for facial rejuvenation, dermal volumizing, and skin firming.', 'cli-002'),
('inv-010', 'OxyGeneo & Pollogen', 'Device', 3, '2024-06-20', '2026-06-20', 'In Stock', 'https://placehold.co/600x400.png', 'From Pollogen / Lumenis. Combines Oxygenation, RF, and Ultrasound for skin brightening, pigmentation, and anti-aging.', NULL),
('inv-011', 'BiAxis Pico™', 'Device', 2, '2024-07-01', '2026-07-01', 'In Stock', 'https://placehold.co/600x400.png', 'From BiAxis. Picosecond Laser for pigmentation (melasma, nevi), tattoo, and collagen remodeling.', NULL),
('inv-012', 'Laser Biaxis QS', 'Device', 1, '2024-02-15', '2026-02-15', 'In Stock', 'https://placehold.co/600x400.png', 'From BiAxis. Laser for improving melasma, pigmentation, and tattoo removal with minimal downtime.', 'cli-002'),
('inv-101', 'Geneskin® Serum', 'Skincare', 8, '2024-03-01', '2025-03-01', 'Low Stock', 'https://placehold.co/600x400.png', 'Skincare product for post-procedure care.', NULL),
('inv-102', 'Vitamin C Cleanser', 'Skincare', 50, '2024-02-18', '2025-02-18', 'In Stock', 'https://placehold.co/600x400.png', 'A gentle cleanser with Vitamin C to brighten and refresh the skin.', NULL),
('inv-103', 'Retinol Cream', 'Skincare', 0, '2024-01-05', '2025-01-05', 'Out of Stock', 'https://placehold.co/600x400.png', 'A powerful retinol cream for anti-aging and skin renewal.', NULL);

-- Insert Service Records
INSERT INTO service_records (id, equipment, service_type, date, technician, cost, status, client_name, client_location, problem_identification, solution, duration) VALUES
('ser-001', 'Sofwave™', 'Maintenance', '2024-06-15', 'John Doe', 250.00, 'Scheduled', 'Dermaster Clinic', 'Jl. Kemang Sel. No.99, Jakarta Selatan', 'Klien meminta perawatan rutin tahunan sesuai jadwal.', 'Pemeriksaan standar, pembersihan filter, dan pembaruan perangkat lunak telah dijadwalkan.', '3 jam'),
('ser-002', 'Vbeam Perfecta®', 'Calibration', '2024-05-20', 'Jane Smith', 180.00, 'Completed', 'Profira Clinic Surabaya', 'Jl. HR Muhammad No.41, Surabaya', 'Output energi laser sedikit di bawah ambang batas yang ditentukan setelah 1 tahun penggunaan.', 'Kalibrasi ulang output daya laser. Pengujian setelah kalibrasi menunjukkan tingkat energi yang optimal. Membersihkan optik.', '2 jam'),
('ser-003', 'Morpheus8', 'Repair', '2024-06-01', 'Mike Johnson', 500.00, 'In Progress', 'Dermaster Clinic', 'Jl. Kemang Sel. No.99, Jakarta Selatan', 'Layar sentuh tidak merespons di bagian kanan bawah. Klien telah mencoba me-restart mesin beberapa kali.', 'Tim teknisi sedang dalam proses mendiagnosis apakah ini masalah perangkat keras (digitizer) atau perangkat lunak. Penggantian layar mungkin diperlukan.', 'Berkelanjutan'),
('ser-004', 'Sofwave™', 'Maintenance', '2023-12-15', 'John Doe', 250.00, 'Completed', 'Dermaster Clinic', 'Jl. Kemang Sel. No.99, Jakarta Selatan', 'Perawatan rutin preventif sesuai jadwal pabrikan.', 'Semua sistem diperiksa, filter diganti, dan perangkat lunak diperbarui ke versi terbaru. Mesin berfungsi sesuai spesifikasi.', '4 jam'),
('ser-005', 'PicoWay®', 'Maintenance', '2024-07-01', 'Jane Smith', 300.00, 'Scheduled', 'Miracle Aesthetic Clinic', 'Jl. Teuku Umar No.18A, Denpasar, Bali', 'Jadwal pemeliharaan 6 bulan untuk memastikan kinerja puncak.', 'Akan dilakukan pembersihan optik, pemeriksaan sistem pendingin, dan verifikasi output energi.', '3 jam');

-- Insert Appointments
INSERT INTO appointments (id, client_id, client_name, service, date, time, status) VALUES
('apt-001', 'cli-001', 'Dermaster Clinic', 'Demo Divine Pro', '2024-07-20', '10:00:00', 'Confirmed'),
('apt-002', 'cli-002', 'Natasha Skin Clinic', 'Pelatihan Laser Biaxis QS', '2024-07-21', '14:00:00', 'Confirmed'),
('apt-003', 'cli-003', 'Profira Clinic Surabaya', 'Konsultasi Perangkat Anti-Aging', '2024-07-22', '11:00:00', 'Pending'),
('apt-004', 'cli-004', 'Miracle Aesthetic Clinic', 'Training Morpheus8', '2024-07-22', '15:30:00', 'Confirmed'),
('apt-005', 'cli-001', 'Dermaster Clinic', 'Maintenance Perangkat Sofwave™', '2024-08-01', '09:00:00', 'Cancelled');

-- Insert Client Requests
INSERT INTO client_requests (id, client_id, client_name, request_type, details, status, date) VALUES
('req-001', 'cli-001', 'Dermaster Clinic', 'Service', 'Request for annual maintenance on Sofwave™.', 'New', '2024-07-28'),
('req-002', 'cli-002', 'Natasha Skin Clinic', 'Troubleshoot', 'Laser Biaxis QS is showing an error code E-05.', 'New', '2024-07-27'),
('req-003', 'cli-004', 'Miracle Aesthetic Clinic', 'Inquiry', 'Question about Ultra V thread compatibility with new procedure.', 'In Progress', '2024-07-26'),
('req-004', 'cli-003', 'Profira Clinic Surabaya', 'Service', 'Indiba Deep Care handpiece is not heating correctly.', 'New', '2024-07-28'),
('req-005', 'cli-001', 'Dermaster Clinic', 'Service', 'Service for Morpheus8: The screen is flickering during use.', 'New', '2024-07-29');

-- Add more dummy data to reach over 100 entries if needed, by duplicating and modifying existing data.
-- For example, adding more appointments:
INSERT INTO appointments (id, client_id, client_name, service, date, time, status)
SELECT 
    'apt-' || LPAD((i+5)::text, 3, '0'),
    c.id,
    c.name,
    'Follow-up Consultation ' || i,
    CURRENT_DATE + (i * 7),
    '14:00:00',
    CASE (i % 3)
        WHEN 0 THEN 'Confirmed'
        WHEN 1 THEN 'Pending'
        ELSE 'Cancelled'
    END
FROM generate_series(1, 40) as i, (SELECT id, name FROM clients) c;

-- For example, adding more service records:
INSERT INTO service_records (id, equipment, service_type, date, technician, cost, status, client_name, client_location, problem_identification, solution, duration)
SELECT
    'ser-' || LPAD((i+5)::text, 3, '0'),
    iv.name,
    CASE (i % 3)
        WHEN 0 THEN 'Maintenance'
        WHEN 1 THEN 'Calibration'
        ELSE 'Repair'
    END,
    CURRENT_DATE - (i * 10),
    'Technician ' || (i%5 +1),
    150.00 + (i * 10),
    'Completed',
    c.name,
    c.location_address,
    'Routine check ' || i,
    'System verified ' || i,
    '2 hours'
FROM generate_series(1, 40) as i, (SELECT id, name, client_id FROM inventory WHERE type = 'Device' AND client_id IS NOT NULL) iv
JOIN clients c ON c.id = iv.client_id;
