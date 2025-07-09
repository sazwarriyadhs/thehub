-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS service_records;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS inventory_items;
DROP TABLE IF EXISTS clients;

-- Create clients table
CREATE TABLE clients (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    join_date DATE,
    avatar VARCHAR(255),
    treatment_history TEXT,
    preferences TEXT[],
    address TEXT,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION
);

-- Create inventory_items table
CREATE TABLE inventory_items (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    purchase_date DATE,
    warranty_end_date DATE,
    status VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    description TEXT,
    client_id VARCHAR(255) REFERENCES clients(id)
);

-- Create appointments table
CREATE TABLE appointments (
    id VARCHAR(255) PRIMARY KEY,
    client_id VARCHAR(255) REFERENCES clients(id),
    client_name VARCHAR(255),
    service VARCHAR(255) NOT NULL,
    date DATE,
    time TIME,
    status VARCHAR(50) NOT NULL
);

-- Create service_records table
CREATE TABLE service_records (
    id VARCHAR(255) PRIMARY KEY,
    equipment VARCHAR(255),
    service_type VARCHAR(50),
    date DATE,
    technician VARCHAR(255),
    cost NUMERIC(10, 2),
    status VARCHAR(50),
    client_name VARCHAR(255),
    client_location TEXT,
    problem_identification TEXT,
    solution TEXT,
    duration VARCHAR(100)
);


-- Insert dummy data for clients
INSERT INTO clients (id, name, email, phone, join_date, avatar, treatment_history, preferences, address, lat, lng) VALUES
('cli-001', 'Dermaster Clinic', 'info@dermaster.com', '021-555-1111', '2022-05-15', 'https://placehold.co/100x100.png', 'Jaringan luas di Jakarta, Bandung, Surabaya, dan Bali. Fokus utama pada perawatan HIFU, CoolSculpting, filler, dan botox.', '{"HIFU", "CoolSculpting", "Filler", "Botox"}', 'Jl. Kemang Sel. No.99, RT.1/RW.2, Bangka, Kec. Mampang Prpt., Kota Jakarta Selatan', -6.262846, 106.812211),
('cli-002', 'Natasha Skin Clinic', 'contact@natasha-skin.com', '021-555-2222', '2021-09-01', 'https://placehold.co/100x100.png', 'Memiliki banyak cabang di area Jabodetabek. Menawarkan solusi estetika all-in-one, termasuk PRP, laser CO₂, serta produk skincare.', '{"PRP", "Laser CO₂", "Skincare"}', 'Jl. Boulevard Gading Serpong, Tangerang', -6.2349, 106.6294),
('cli-003', 'Profira Clinic Surabaya', 'info@profira-clinic.com', '031-555-3333', '2023-02-20', 'https://placehold.co/100x100.png', 'Spesialis dalam perawatan anti-penuaan, seperti kerutan, pigmentasi, dan penghilangan tahi lalat.', '{"Anti-Aging", "Pigmentasi", "Facial"}', 'Jl. HR Muhammad No.41, Pradahkalikendal, Kec. Dukuhpakis, Surabaya', -7.2892, 112.6732),
('cli-004', 'Miracle Aesthetic Clinic', 'bali@miracle-clinic.com', '0361-555-4444', '2023-11-10', 'https://placehold.co/100x100.png', 'Cabang di Bali dan Batam. Populer untuk layanan microneedling dan thread lift (tarik benang).', '{"Microneedling", "Thread Lift"}', 'Jl. Teuku Umar No.18A, Denpasar, Bali', -8.6756, 115.2040),
('cli-005', 'Zap Clinic', 'care@zap.co.id', '021-555-5555', '2022-08-20', 'https://placehold.co/100x100.png', 'Fokus pada perawatan hair removal dan photo facial. Memiliki banyak outlet di mal-mal besar.', '{"Hair Removal", "Photo Facial"}', 'Pacific Place Mall, Lantai B1, Jl. Jenderal Sudirman, Jakarta', -6.224, 106.8095),
('cli-006', 'Erha Clinic', 'contact@erha.co.id', '021-555-6666', '2020-01-10', 'https://placehold.co/100x100.png', 'Salah satu klinik dermatologi terbesar dengan produk yang diformulasikan oleh dermatologis.', '{"Acne Treatment", "Anti-Aging", "Skincare Products"}', 'Jl. Cimanuk No. 5, Bandung', -6.902, 107.618),
('cli-007', 'Click House', 'info@clickhouse.co.id', '021-555-7777', '2023-01-05', 'https://placehold.co/100x100.png', 'Klinik modern yang menawarkan perawatan laser untuk berbagai masalah kulit.', '{"Laser Black Doll", "Acne Laser"}', 'Jl. Melawai Raya No. 27, Jakarta Selatan', -6.2443, 106.7997),
('cli-008', 'Bamed Skin Care', 'care@bamed.id', '021-555-8888', '2022-11-30', 'https://placehold.co/100x100.png', 'Menyediakan layanan dermatologi anak dan dewasa dengan pendekatan medis.', '{"Pediatric Dermatology", "Clinical Dermatology"}', 'Jl. Dharmawangsa Raya No. 8, Jakarta Selatan', -6.258, 106.802),
('cli-009', 'Hayyu Syar''i Skin Clinic', 'salam@hayyu.id', '021-555-9999', '2023-04-12', 'https://placehold.co/100x100.png', 'Klinik kecantikan dengan konsep syar''i untuk wanita muslimah.', '{"Halal Facial", "Syari Treatment"}', 'Jl. Margonda Raya No. 30, Depok', -6.37, 106.831),
('cli-010', 'Oskincare Clinic', 'info@oskincare.com', '021-555-0000', '2023-09-01', 'https://placehold.co/100x100.png', 'Klinik dengan fokus pada perawatan premium dan personal.', '{"Oxygeneo", "Ultherapy"}', 'Senayan City, Lantai 2, Jl. Asia Afrika, Jakarta', -6.227, 106.797);

-- Insert dummy data for inventory_items
INSERT INTO inventory_items (id, name, type, quantity, purchase_date, warranty_end_date, status, image_url, description, client_id) VALUES
('inv-001', 'Sofwave™', 'Device', 3, '2023-01-15', '2025-01-15', 'In Stock', 'https://placehold.co/600x400.png', 'Ultrasonik non-invasif untuk skin lifting.', 'cli-001'),
('inv-002', 'Indiba Deep Care', 'Device', 1, '2023-02-20', '2025-02-20', 'In Stock', 'https://placehold.co/600x400.png', 'Radio-frequency untuk perawatan tubuh.', 'cli-003'),
('inv-003', 'Vbeam Perfecta®', 'Device', 2, '2022-11-20', '2024-11-20', 'In Stock', 'https://placehold.co/600x400.png', 'Laser PDL untuk perawatan pigmentasi.', NULL),
('inv-004', 'PicoWay®', 'Device', 1, '2023-08-01', '2025-08-01', 'In Stock', 'https://placehold.co/600x400.png', 'Laser pico-second untuk melasma dan hapus tato.', 'cli-004'),
('inv-005', 'BiAxis QS™', 'Device', 1, '2023-09-10', '2025-09-10', 'In Stock', 'https://placehold.co/600x400.png', 'Laser multidimensional untuk pigmen dan tato.', NULL),
('inv-006', 'Ultra V', 'Device', 100, '2024-04-01', NULL, 'In Stock', 'https://placehold.co/600x400.png', 'Benang polydioxanone (PDO) untuk nose augmentation.', NULL),
('inv-007', 'Morpheus8', 'Device', 2, '2023-06-12', '2025-06-12', 'In Stock', '/images/Morpheus-8.png', 'Kombinasi microneedling dan RF.', 'cli-001'),
('inv-008', 'Coolfase', 'Device', 1, '2023-10-25', '2025-10-25', 'In Stock', 'https://placehold.co/600x400.png', 'Monopolar RF dengan teknologi pendinginan langsung.', NULL),
('inv-009', 'Lipodefine™', 'Device', 1, '2023-11-30', '2025-11-30', 'In Stock', 'https://placehold.co/600x400.png', 'Teknologi endolifting untuk kontur wajah.', NULL),
('inv-010', 'Laser Biaxis QS', 'Device', 1, '2024-02-15', '2026-02-15', 'In Stock', 'https://placehold.co/600x400.png', 'Laser untuk perbaikan melasma dan pigmentasi.', 'cli-002'),
('inv-011', 'Hydrafacial', 'Device', 2, '2024-07-01', '2026-07-01', 'In Stock', 'https://placehold.co/600x400.png', 'A multi-step facial treatment.', NULL),
('inv-012', 'Pico Laser', 'Device', 3, '2024-07-15', '2026-07-15', 'In Stock', 'https://placehold.co/600x400.png', 'Advanced pico-second laser.', 'cli-005'),
('inv-101', 'Geneskin® Serum', 'Skincare', 8, '2024-03-01', '2025-03-01', 'Low Stock', 'https://placehold.co/600x400.png', 'Skincare product for post-procedure care.', NULL),
('inv-102', 'Vitamin C Cleanser', 'Skincare', 50, '2024-02-18', '2025-02-18', 'In Stock', 'https://placehold.co/600x400.png', 'A gentle cleanser with Vitamin C.', NULL),
('inv-103', 'Retinol Cream', 'Skincare', 0, '2024-01-05', '2025-01-05', 'Out of Stock', 'https://placehold.co/600x400.png', 'A powerful retinol cream for anti-aging.', NULL),
('inv-104', 'Hyaluronic Acid Serum', 'Skincare', 120, '2024-05-10', '2026-05-10', 'In Stock', 'https://placehold.co/600x400.png', 'Deeply hydrating serum for all skin types.', NULL),
('inv-105', 'Sunscreen SPF 50+', 'Skincare', 200, '2024-06-20', '2026-06-20', 'In Stock', 'https://placehold.co/600x400.png', 'Broad-spectrum sun protection.', NULL),
('inv-106', 'Morpheus8 Tips (12 pin)', 'Skincare', 75, '2024-06-12', NULL, 'In Stock', 'https://placehold.co/600x400.png', 'Consumable tips for Morpheus8 device.', NULL),
('inv-107', 'Hydrafacial Active-4 Serum', 'Skincare', 40, '2024-07-01', NULL, 'In Stock', 'https://placehold.co/600x400.png', 'Cleansing serum for Hydrafacial machine.', NULL),
('inv-108', 'Cooling Gel', 'Skincare', 30, '2024-03-15', '2025-09-15', 'In Stock', 'https://placehold.co/600x400.png', 'Conductive gel for RF and laser treatments.', NULL);

-- Insert dummy data for appointments
INSERT INTO appointments (id, client_id, client_name, service, date, time, status) VALUES
('apt-001', 'cli-001', 'Dermaster Clinic', 'Demo Coolfase', '2024-07-20', '10:00:00', 'Confirmed'),
('apt-002', 'cli-002', 'Natasha Skin Clinic', 'Pelatihan Laser Biaxis QS', '2024-07-21', '14:00:00', 'Confirmed'),
('apt-003', 'cli-003', 'Profira Clinic Surabaya', 'Konsultasi Perangkat Anti-Aging', '2024-07-22', '11:00:00', 'Pending'),
('apt-004', 'cli-004', 'Miracle Aesthetic Clinic', 'Training Morpheus8', '2024-07-22', '15:30:00', 'Confirmed'),
('apt-005', 'cli-001', 'Dermaster Clinic', 'Maintenance Perangkat Sofwave™', '2024-08-01', '09:00:00', 'Cancelled'),
('apt-006', 'cli-005', 'Zap Clinic', 'Demo Pico Laser', '2024-08-05', '10:00:00', 'Confirmed'),
('apt-007', 'cli-006', 'Erha Clinic', 'Product Skincare Consultation', '2024-08-06', '13:00:00', 'Pending'),
('apt-008', 'cli-007', 'Click House', 'Follow-up Training Laser', '2024-08-08', '14:00:00', 'Confirmed'),
('apt-009', 'cli-010', 'Oskincare Clinic', 'Ultherapy Device Demo', '2024-08-10', '10:30:00', 'Confirmed'),
('apt-010', 'cli-001', 'Dermaster Clinic', 'New Filler Product Intro', '2024-08-12', '11:00:00', 'Pending'),
('apt-011', 'cli-002', 'Natasha Skin Clinic', 'Quarterly Business Review', '2024-08-15', '16:00:00', 'Confirmed'),
('apt-012', 'cli-003', 'Profira Clinic Surabaya', 'Service Appointment Indiba', '2024-08-18', '09:30:00', 'Confirmed'),
('apt-013', 'cli-008', 'Bamed Skin Care', 'Pediatric Dermatology Device Demo', '2024-08-20', '13:00:00', 'Pending'),
('apt-014', 'cli-009', 'Hayyu Syar''i Skin Clinic', 'Consultation for Halal Skincare Line', '2024-08-22', '10:00:00', 'Confirmed'),
('apt-015', 'cli-004', 'Miracle Aesthetic Clinic', 'Advanced Thread Lift Technique Workshop', '2024-08-25', '09:00:00', 'Confirmed'),
('apt-016', 'cli-005', 'Zap Clinic', 'Review on Pico Laser Usage', '2024-09-02', '11:00:00', 'Pending'),
('apt-017', 'cli-001', 'Dermaster Clinic', 'Demo of New Microneedling Device', '2024-09-05', '14:00:00', 'Confirmed'),
('apt-018', 'cli-010', 'Oskincare Clinic', 'Maintenance for Ultherapy Machine', '2024-09-10', '10:00:00', 'Scheduled'),
('apt-019', 'cli-006', 'Erha Clinic', 'Renewal of Skincare Supply Contract', '2024-09-15', '15:00:00', 'Confirmed'),
('apt-020', 'cli-007', 'Click House', 'Inquiry about device upgrade options', '2024-09-18', '11:30:00', 'Pending');

-- Insert dummy data for service_records
INSERT INTO service_records (id, equipment, service_type, date, technician, cost, status, client_name, client_location, problem_identification, solution, duration) VALUES
('ser-001', 'Sofwave™', 'Maintenance', '2024-06-15', 'John Doe', 250.00, 'Scheduled', 'Dermaster Clinic', 'Jl. Kemang Sel. No.99, Jakarta Selatan', 'Klien meminta perawatan rutin tahunan.', 'Pemeriksaan standar dijadwalkan.', '3 jam'),
('ser-002', 'Vbeam Perfecta®', 'Calibration', '2024-05-20', 'Jane Smith', 180.00, 'Completed', 'Profira Clinic Surabaya', 'Jl. HR Muhammad No.41, Surabaya', 'Output energi laser sedikit di bawah ambang batas.', 'Kalibrasi ulang output daya laser.', '2 jam'),
('ser-003', 'Morpheus8', 'Repair', '2024-06-01', 'Mike Johnson', 500.00, 'In Progress', 'Dermaster Clinic', 'Jl. Kemang Sel. No.99, Jakarta Selatan', 'Layar sentuh tidak merespons.', 'Tim teknisi sedang dalam proses mendiagnosis.', 'Berkelanjutan'),
('ser-004', 'Sofwave™', 'Maintenance', '2023-12-15', 'John Doe', 250.00, 'Completed', 'Dermaster Clinic', 'Jl. Kemang Sel. No.99, Jakarta Selatan', 'Perawatan rutin preventif.', 'Semua sistem diperiksa dan filter diganti.', '4 jam'),
('ser-005', 'PicoWay®', 'Maintenance', '2024-07-01', 'Jane Smith', 300.00, 'Scheduled', 'Miracle Aesthetic Clinic', 'Jl. Teuku Umar No.18A, Denpasar, Bali', 'Jadwal pemeliharaan 6 bulan.', 'Akan dilakukan pembersihan optik.', '3 jam'),
('ser-006', 'Laser Biaxis QS', 'Repair', '2024-07-10', 'Alex Ray', 450.00, 'Completed', 'Natasha Skin Clinic', 'Jl. Boulevard Gading Serpong, Tangerang', 'Error code E-05 displayed on screen.', 'Replaced faulty sensor and reset system.', '5 jam'),
('ser-007', 'Indiba Deep Care', 'Repair', '2024-07-12', 'Mike Johnson', 320.00, 'In Progress', 'Profira Clinic Surabaya', 'Jl. HR Muhammad No.41, Surabaya', 'Handpiece not heating up to required temperature.', 'Currently investigating the heating element and power supply.', 'Ongoing'),
('ser-008', 'Hydrafacial', 'Maintenance', '2024-07-18', 'Sarah Lee', 200.00, 'Scheduled', 'Zap Clinic', 'Pacific Place Mall, Jakarta', 'Regular 6-month check-up.', 'Scheduled for filter and tip replacement.', '2 jam'),
('ser-009', 'Coolfase', 'Calibration', '2024-07-25', 'John Doe', 220.00, 'Scheduled', 'Erha Clinic', 'Jl. Cimanuk No. 5, Bandung', 'Client reports inconsistent cooling.', 'Technician to check and calibrate cooling system.', '3 jam'),
('ser-010', 'Morpheus8', 'Maintenance', '2024-08-02', 'Jane Smith', 275.00, 'Scheduled', 'Dermaster Clinic', 'Jl. Kemang Sel. No.99, Jakarta Selatan', 'Annual checkup and software update.', 'Scheduled procedure.', '4 jam'),
('ser-011', 'Pico Laser', 'Repair', '2024-08-05', 'Mike Johnson', 600.00, 'In Progress', 'Zap Clinic', 'Pacific Place Mall, Jakarta', 'Laser beam is misaligned.', 'Technician dispatched to perform realignment.', 'Ongoing'),
('ser-012', 'Vbeam Perfecta®', 'Maintenance', '2024-08-10', 'Alex Ray', 180.00, 'Completed', 'Click House', 'Jl. Melawai Raya No. 27, Jakarta Selatan', 'Preventive maintenance.', 'Cleaned optics and verified power output.', '2 jam'),
('ser-013', 'Sofwave™', 'Repair', '2024-08-15', 'Sarah Lee', 750.00, 'In Progress', 'Oskincare Clinic', 'Senayan City, Lantai 2, Jakarta', 'Device not turning on.', 'Power supply unit failure suspected. Awaiting parts.', 'Ongoing'),
('ser-014', 'Laser Biaxis QS', 'Calibration', '2024-08-20', 'John Doe', 250.00, 'Completed', 'Natasha Skin Clinic', 'Jl. Boulevard Gading Serpong, Tangerang', 'Routine calibration post-repair.', 'Calibrated and tested for optimal performance.', '3 jam'),
('ser-015', 'Indiba Deep Care', 'Maintenance', '2024-08-25', 'Jane Smith', 200.00, 'Completed', 'Profira Clinic Surabaya', 'Jl. HR Muhammad No.41, Surabaya', 'Follow-up maintenance after repair.', 'Replaced handpiece and tested functionality.', '2 jam'),
('ser-016', 'PicoWay®', 'Maintenance', '2024-09-01', 'Mike Johnson', 300.00, 'Scheduled', 'Miracle Aesthetic Clinic', 'Jl. Teuku Umar No.18A, Denpasar, Bali', 'Annual maintenance.', 'Scheduled for a full system check.', '4 jam'),
('ser-017', 'Morpheus8', 'Repair', '2024-09-05', 'Alex Ray', 450.00, 'Completed', 'Hayyu Syar''i Skin Clinic', 'Jl. Margonda Raya No. 30, Depok', 'RF energy output is fluctuating.', 'Recalibrated RF module and updated firmware.', '5 jam'),
('ser-018', 'Hydrafacial', 'Repair', '2024-09-12', 'Sarah Lee', 350.00, 'In Progress', 'Bamed Skin Care', 'Jl. Dharmawangsa Raya No. 8, Jakarta Selatan', 'Vortex suction is weak.', 'Investigating pump and tubing for blockages.', 'Ongoing'),
('ser-019', 'Coolfase', 'Maintenance', '2024-09-18', 'John Doe', 220.00, 'Completed', 'Erha Clinic', 'Jl. Cimanuk No. 5, Bandung', 'Completed the scheduled maintenance.', 'Cooling system calibrated and working perfectly.', '3 jam'),
('ser-020', 'Pico Laser', 'Maintenance', '2024-09-25', 'Jane Smith', 280.00, 'Scheduled', 'Zap Clinic', 'Pacific Place Mall, Jakarta', 'Routine 6-month checkup.', 'Scheduled for system diagnostics.', '3 jam');
