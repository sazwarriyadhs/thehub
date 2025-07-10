-- Create Admin Users Table
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar VARCHAR(255)
);

-- Create Clients Table
CREATE TABLE clients (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    join_date DATE NOT NULL,
    avatar VARCHAR(255),
    penanggung_jawab_nama VARCHAR(255),
    penanggung_jawab_jabatan VARCHAR(255),
    treatment_history TEXT,
    preferences TEXT[],
    location_address TEXT,
    location_lat REAL,
    location_lng REAL
);

-- Create Inventory Table
CREATE TABLE inventory (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    purchase_date DATE NOT NULL,
    warranty_end_date DATE,
    status VARCHAR(50) NOT NULL,
    image_url TEXT,
    description TEXT,
    client_id VARCHAR(50) REFERENCES clients(id)
);

-- Create Service Records Table
CREATE TABLE service_records (
    id VARCHAR(50) PRIMARY KEY,
    equipment VARCHAR(255) NOT NULL,
    service_type VARCHAR(100),
    date DATE,
    technician VARCHAR(255),
    cost NUMERIC(10, 2),
    status VARCHAR(50),
    client_name VARCHAR(255),
    client_location TEXT,
    problem_identification TEXT,
    solution TEXT,
    duration VARCHAR(100),
    technician_notes TEXT,
    photo_proof_url TEXT,
    inventory_id VARCHAR(50) REFERENCES inventory(id)
);

-- Create Appointments Table
CREATE TABLE appointments (
    id VARCHAR(50) PRIMARY KEY,
    client_id VARCHAR(50) REFERENCES clients(id),
    client_name VARCHAR(255),
    service VARCHAR(255),
    date DATE,
    time VARCHAR(50),
    status VARCHAR(50)
);

-- Create Client Requests Table
CREATE TABLE client_requests (
    id VARCHAR(50) PRIMARY KEY,
    client_id VARCHAR(50) REFERENCES clients(id),
    client_name VARCHAR(255),
    request_type VARCHAR(50),
    details TEXT,
    status VARCHAR(50),
    date DATE
);


-- SEED DATA

-- Seed Admin User
INSERT INTO admin_users (name, email, avatar) VALUES
('Admin User', 'admin@aestheticare.pro', 'https://placehold.co/100x100.png');

-- Seed Clients
INSERT INTO clients (id, name, email, phone, join_date, avatar, penanggung_jawab_nama, penanggung_jawab_jabatan, treatment_history, preferences, location_address, location_lat, location_lng) VALUES
('cli-001', 'Dermaster Clinic', 'info@dermaster.com', '021-555-1111', '2021-05-12', 'https://placehold.co/100x100.png', 'Dr. Andreas', 'Kepala Cabang', 'Fokus utama pada perawatan laser dan peremajaan kulit. Telah membeli Sofwave dan beberapa produk Geneskin. Memiliki basis pelanggan yang besar untuk perawatan anti-aging. Sangat puas dengan hasil Sofwave. Pengiriman terakhir: 2 karton Geneskin Serum pada 1 Agustus 2023.', '{"HIFU", "Botox", "Filler"}', 'Jl. Metro Pondok Indah No.1, Jakarta Selatan', -6.262846, 106.784576),
('cli-002', 'Miracle Aesthetic Clinic', 'contact@miracle-clinic.com', '031-444-2222', '2020-11-02', 'https://placehold.co/100x100.png', 'Dr. Lanny Junita', 'Direktur Medis', 'Klien lama dengan fokus pada perawatan vaskular dan pigmentasi. Membeli Vbeam Perfecta pada tahun 2022. Membutuhkan dukungan teknis berkala dan pelatihan staf baru. Terakhir kali meminta penawaran untuk laser picosecond.', '{"Vascular Laser", "Chemical Peels"}', 'Tunjungan Plaza 4, Jl. Jenderal Basuki Rachmat No.8-12, Surabaya', -7.2612, 112.7412),
('cli-003', 'Erha Clinic', 'support@erha.co.id', '021-333-5555', '2022-01-20', 'https://placehold.co/100x100.png', 'Ibu Ratna', 'Manajer Pembelian', 'Jaringan klinik besar dengan banyak cabang. Tertarik pada teknologi terbaru. Membeli PicoWay untuk salah satu cabang premium mereka. Menunjukkan minat pada Morpheus8 untuk perluasan layanan.', '{"Pico Laser", "Acne Treatment"}', 'Jl. Kemanggisan Utama Raya No.10, Jakarta Barat', -6.2023, 106.7825);

-- Seed Inventory
INSERT INTO inventory (id, name, type, quantity, purchase_date, warranty_end_date, status, image_url, description, client_id) VALUES
('inv-001', 'Sofwave™', 'Device', 5, '2023-01-15', '2025-01-15', 'In Stock', '/images/sofwave.jpeg', '3D Ultrasound for face/neck lifting, fine lines, and cellulite.', 'cli-001'),
('inv-002', 'Vbeam Perfecta®', 'Device', 2, '2022-11-20', '2024-11-20', 'Low Stock', 'https://aspmedica.com/wp-content/uploads/2021/01/vbeam-perfecta-1.png', 'Pulsed-Dye Laser (PDL) for rosacea, vascular issues, and pigmentation.', 'cli-002'),
('inv-003', 'Geneskin® Serum', 'Skincare', 50, '2023-08-01', NULL, 'In Stock', 'https://regenesis.co.id/wp-content/uploads/2020/12/GENESKIN-LIFT-SERUM-28ML.jpg', 'Skincare product for post-procedure care.', NULL),
('inv-004', 'PicoWay®', 'Device', 0, '2023-03-10', '2025-03-10', 'Out of Stock', 'https://placehold.co/600x400.png', 'Picosecond Laser for pigmentation, tattoo removal, and collagen remodeling.', 'cli-003'),
('inv-005', 'Morpheus8', 'Device', 3, '2023-05-22', '2025-05-22', 'In Stock', 'https://placehold.co/600x400.png', 'RF Microneedling for wrinkles, skin laxity, and cellulite.', NULL);

-- Seed Service Records
INSERT INTO service_records (id, inventory_id, equipment, service_type, date, technician, cost, status, client_name, client_location, problem_identification, solution, duration) VALUES
('ser-001', 'inv-001', 'Sofwave™', 'Maintenance', '2023-07-22', 'Andi Wijaya', 250, 'Completed', 'Dermaster Clinic', 'Pondok Indah, Jakarta Selatan', 'Unit requires annual preventive maintenance as per service agreement. No operational issues reported by the client. Standard check-up and system calibration needed.', 'Completed full diagnostic scan using manufacturer software. All parameters are within normal range. Cleaned all optical components and air filters. Re-calibrated the energy output to ensure accuracy. Provided a brief training refresher to the on-site operator. The machine is in optimal working condition.', '4 hours'),
('ser-002', 'inv-002', 'Vbeam Perfecta®', 'Repair', '2023-09-05', 'Budi Santoso', 800, 'In Progress', 'Miracle Aesthetic Clinic', 'Tunjungan Plaza, Surabaya', 'Client reported "Error 23 - Handpiece Cooling Failure" on the main display. The device is non-operational. Initial phone support was unable to resolve the issue.', 'On-site diagnosis confirmed a faulty cooling pump within the handpiece assembly. The pump was not circulating coolant, causing the system to overheat and trigger the error. Replaced the entire handpiece cooling module with a new part (Part #VB-HP-C4). Flushed and refilled the cooling system. Ran multiple test cycles successfully. The error is now cleared.', '6 hours'),
('ser-003', 'inv-004', 'PicoWay®', 'Calibration', '2023-10-11', 'Andi Wijaya', 350, 'Scheduled', 'Erha Clinic', 'Kemanggisan, Jakarta Barat', 'Scheduled bi-annual energy output calibration. Client has noted a slight perceived decrease in treatment efficacy, requesting a full system check.', 'Technician is scheduled to visit the site on the specified date. A power meter and beam profiler will be used to measure and adjust the laser output for all available wavelengths and spot sizes. The optical path will also be inspected and cleaned.', 'Scheduled');

-- Seed Appointments
INSERT INTO appointments (id, client_id, client_name, service, date, time, status) VALUES
('apt-001', 'cli-001', 'Dermaster Clinic', 'Product Demo: Morpheus8', '2023-11-15', '10:00 AM', 'Confirmed'),
('apt-002', 'cli-002', 'Miracle Aesthetic Clinic', 'Staff Training: Vbeam Perfecta', '2023-11-20', '02:00 PM', 'Pending'),
('apt-003', 'cli-003', 'Erha Clinic', 'Consultation: Business Expansion', '2023-11-05', '11:00 AM', 'Cancelled'),
('apt-004', 'cli-001', 'Dermaster Clinic', 'Follow-up: Sofwave Performance', '2023-12-01', '03:00 PM', 'Confirmed');

-- Seed Client Requests
INSERT INTO client_requests (id, client_id, client_name, request_type, details, status, date) VALUES
('req-001', 'cli-001', 'Dermaster Clinic', 'Service', 'Service for Sofwave™: Annual maintenance required.', 'New', '2023-11-01'),
('req-002', 'cli-002', 'Miracle Aesthetic Clinic', 'Troubleshoot', 'Troubleshoot Vbeam Perfecta®: Handpiece cooling failure reported.', 'In Progress', '2023-10-30'),
('req-003', 'cli-003', 'Erha Clinic', 'Inquiry', 'Inquiry: Requesting quote for Morpheus8 device.', 'Resolved', '2023-10-28');