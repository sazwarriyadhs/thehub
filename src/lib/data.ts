import type { InventoryItem, ServiceRecord, Client, Appointment, ClientRequest } from '@/types';

export const inventoryItems: InventoryItem[] = [
  // Devices
  { id: 'inv-001', name: 'Sofwave™', type: 'Device', quantity: 3, purchaseDate: '2023-01-15', warrantyEndDate: '2025-01-15', status: 'In Stock', imageUrl: 'https://regenesis.co.id/wp-content/uploads/2023/06/Sofwave-1.png', description: 'From Sofwave Medical. 3D Ultrasound for face/neck lifting, fine lines, and cellulite.', clientId: 'cli-001' },
  { id: 'inv-002', name: 'Indiba Deep Care', type: 'Device', quantity: 1, purchaseDate: '2023-02-20', warrantyEndDate: '2025-02-20', status: 'In Stock', imageUrl: 'https://regenesis.co.id/wp-content/uploads/2023/06/Indiba-Deep-Care-1.png', description: 'From INDIBA®. Radio Frequency for body contouring, cellulite, post-surgery care, and circumference reduction.', clientId: 'cli-003' },
  { id: 'inv-003', name: 'Vbeam Perfecta®', type: 'Device', quantity: 2, purchaseDate: '2022-11-20', warrantyEndDate: '2024-11-20', status: 'In Stock', imageUrl: 'https://regenesis.co.id/wp-content/uploads/2023/06/Vbeam-Prima.png', description: 'From Candela. Pulsed-Dye Laser (PDL) for rosacea, vascular issues, pigmentation, acne scars, and keloids.' },
  { id: 'inv-004', name: 'PicoWay®', type: 'Device', quantity: 1, purchaseDate: '2023-08-01', warrantyEndDate: '2025-08-01', status: 'In Stock', imageUrl: 'https://aspmedica.com/wp-content/uploads/2023/11/PicoWay-1.jpg', description: 'From Candela. Picosecond Laser for pigmentation (melasma, nevi), tattoo removal, and collagen remodeling.', clientId: 'cli-004' },
  { id: 'inv-005', name: 'BiAxis QS™', type: 'Device', quantity: 1, purchaseDate: '2023-09-10', warrantyEndDate: '2025-09-10', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'From BiAxis. Q-switched Laser for acne scars, freckles, pigmentation, and tattoo removal.' },
  { id: 'inv-006', name: 'Ultra V', type: 'Device', quantity: 100, purchaseDate: '2024-04-01', warrantyEndDate: 'N/A', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'Benang polydioxanone (PDO) untuk nose augmentation, volumizing, dan stimulasi kolagen.' },
  { id: 'inv-007', name: 'Morpheus8', type: 'Device', quantity: 2, purchaseDate: '2023-06-12', warrantyEndDate: '2025-06-12', status: 'In Stock', imageUrl: 'https://regenesis.co.id/wp-content/uploads/2023/06/Morpheus8-1.png', description: 'From InMode. RF Microneedling for wrinkles, skin laxity, and cellulite.', clientId: 'cli-001' },
  { id: 'inv-008', name: 'Frax Pro', type: 'Device', quantity: 2, purchaseDate: '2024-03-01', warrantyEndDate: '2026-03-01', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'From Ellipse / Candela. Non-ablative fractional laser for skin resurfacing, improving texture, and collagen stimulation.' },
  { id: 'inv-009', name: 'Divine Pro', type: 'Device', quantity: 1, purchaseDate: '2024-05-10', warrantyEndDate: '2026-05-10', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'From Pollogen / Lumenis. Multi-treatment platform for facial rejuvenation, dermal volumizing, and skin firming.' },
  { id: 'inv-010', name: 'OxyGeneo & Pollogen', type: 'Device', quantity: 3, purchaseDate: '2024-06-20', warrantyEndDate: '2026-06-20', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'From Pollogen / Lumenis. Combines Oxygenation, RF, and Ultrasound for skin brightening, pigmentation, and anti-aging.' },
  { id: 'inv-011', name: 'BiAxis Pico™', type: 'Device', quantity: 2, purchaseDate: '2024-07-01', warrantyEndDate: '2026-07-01', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'From BiAxis. Picosecond Laser for pigmentation (melasma, nevi), tattoo, and collagen remodeling.' },
  { id: 'inv-012', name: 'Laser Biaxis QS', type: 'Device', quantity: 1, purchaseDate: '2024-02-15', warrantyEndDate: '2026-02-15', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'From BiAxis. Laser for improving melasma, pigmentation, and tattoo removal with minimal downtime.', clientId: 'cli-002' },

  // Skincare and Consumables
  { id: 'inv-101', name: 'Geneskin® Serum', type: 'Skincare', quantity: 8, purchaseDate: '2024-03-01', warrantyEndDate: '2025-03-01', status: 'Low Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'Skincare product for post-procedure care.' },
  { id: 'inv-102', name: 'Vitamin C Cleanser', type: 'Skincare', quantity: 50, purchaseDate: '2024-02-18', warrantyEndDate: '2025-02-18', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'A gentle cleanser with Vitamin C to brighten and refresh the skin.' },
  { id: 'inv-103', name: 'Retinol Cream', type: 'Skincare', quantity: 0, purchaseDate: '2024-01-05', warrantyEndDate: '2025-01-05', status: 'Out of Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'A powerful retinol cream for anti-aging and skin renewal.' },
];

export const serviceRecords: ServiceRecord[] = [
  {
    id: 'ser-001',
    equipment: 'Sofwave™',
    serviceType: 'Maintenance',
    date: '2024-06-15',
    technician: 'John Doe',
    cost: 250,
    status: 'Scheduled',
    clientName: 'Dermaster Clinic',
    clientLocation: 'Jl. Kemang Sel. No.99, Jakarta Selatan',
    problemIdentification: 'Klien meminta perawatan rutin tahunan sesuai jadwal.',
    solution: 'Pemeriksaan standar, pembersihan filter, dan pembaruan perangkat lunak telah dijadwalkan.',
    duration: '3 jam'
  },
  {
    id: 'ser-002',
    equipment: 'Vbeam Perfecta®',
    serviceType: 'Calibration',
    date: '2024-05-20',
    technician: 'Jane Smith',
    cost: 180,
    status: 'Completed',
    clientName: 'Profira Clinic Surabaya',
    clientLocation: 'Jl. HR Muhammad No.41, Surabaya',
    problemIdentification: 'Output energi laser sedikit di bawah ambang batas yang ditentukan setelah 1 tahun penggunaan.',
    solution: 'Kalibrasi ulang output daya laser. Pengujian setelah kalibrasi menunjukkan tingkat energi yang optimal. Membersihkan optik.',
    duration: '2 jam'
  },
  {
    id: 'ser-003',
    equipment: 'Morpheus8',
    serviceType: 'Repair',
    date: '2024-06-01',
    technician: 'Mike Johnson',
    cost: 500,
    status: 'In Progress',
    clientName: 'Dermaster Clinic',
    clientLocation: 'Jl. Kemang Sel. No.99, Jakarta Selatan',
    problemIdentification: 'Layar sentuh tidak merespons di bagian kanan bawah. Klien telah mencoba me-restart mesin beberapa kali.',
    solution: 'Tim teknisi sedang dalam proses mendiagnosis apakah ini masalah perangkat keras (digitizer) atau perangkat lunak. Penggantian layar mungkin diperlukan.',
    duration: 'Berkelanjutan'
  },
  {
    id: 'ser-004',
    equipment: 'Sofwave™',
    serviceType: 'Maintenance',
    date: '2023-12-15',
    technician: 'John Doe',
    cost: 250,
    status: 'Completed',
    clientName: 'Dermaster Clinic',
    clientLocation: 'Jl. Kemang Sel. No.99, Jakarta Selatan',
    problemIdentification: 'Perawatan rutin preventif sesuai jadwal pabrikan.',
    solution: 'Semua sistem diperiksa, filter diganti, dan perangkat lunak diperbarui ke versi terbaru. Mesin berfungsi sesuai spesifikasi.',
    duration: '4 jam'
  },
  {
    id: 'ser-005',
    equipment: 'PicoWay®',
    serviceType: 'Maintenance',
    date: '2024-07-01',
    technician: 'Jane Smith',
    cost: 300,
    status: 'Scheduled',
    clientName: 'Miracle Aesthetic Clinic',
    clientLocation: 'Jl. Teuku Umar No.18A, Denpasar, Bali',
    problemIdentification: 'Jadwal pemeliharaan 6 bulan untuk memastikan kinerja puncak.',
    solution: 'Akan dilakukan pembersihan optik, pemeriksaan sistem pendingin, dan verifikasi output energi.',
    duration: '3 jam'
  },
];

export const clients: Client[] = [
  {
    id: 'cli-001',
    name: 'Dermaster Clinic',
    email: 'info@dermaster.com',
    phone: '021-555-1111',
    joinDate: '2022-05-15',
    avatar: 'https://placehold.co/600x400.png',
    treatmentHistory: 'Jaringan luas di Jakarta, Bandung, Surabaya, dan Bali. Fokus utama pada perawatan HIFU, CoolSculpting, filler, dan botox. Menggunakan teknologi modern dengan dokter berpengalaman.',
    preferences: ['HIFU', 'CoolSculpting', 'Filler', 'Botox'],
    location: { address: 'Jl. Kemang Sel. No.99, RT.1/RW.2, Bangka, Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730', lat: -6.262846, lng: 106.812211 }
  },
  {
    id: 'cli-002',
    name: 'Natasha Skin Clinic',
    email: 'contact@natasha-skin.com',
    phone: '021-555-2222',
    joinDate: '2021-09-01',
    avatar: 'https://placehold.co/100x100.png',
    treatmentHistory: 'Memiliki banyak cabang di area Jabodetabek. Menawarkan solusi estetika all-in-one, termasuk PRP, laser CO₂, serta produk skincare untuk klinik dan homecare. Klien ini telah membeli mesin Laser Biaxis QS dari distributor.',
    preferences: ['PRP', 'Laser CO₂', 'Skincare'],
    location: { address: 'Jl. Boulevard Gading Serpong, Tangerang', lat: -6.2349, lng: 106.6294 }
  },
  {
    id: 'cli-003',
    name: 'Profira Clinic Surabaya',
    email: 'info@profira-clinic.com',
    phone: '031-555-3333',
    joinDate: '2023-02-20',
    avatar: 'https://placehold.co/100x100.png',
    treatmentHistory: 'Spesialis dalam perawatan anti-penuaan, seperti kerutan, pigmentasi, dan penghilangan tahi lalat. Sangat direkomendasikan untuk perawatan facial dan anti-aging.',
    preferences: ['Anti-Aging', 'Pigmentasi', 'Facial'],
    location: { address: 'Jl. HR Muhammad No.41, Pradahkalikendal, Kec. Dukuhpakis, Surabaya, Jawa Timur 60226', lat: -7.2892, lng: 112.6732 }
  },
  {
    id: 'cli-004',
    name: 'Miracle Aesthetic Clinic',
    email: 'bali@miracle-clinic.com',
    phone: '0361-555-4444',
    joinDate: '2023-11-10',
    avatar: 'https://placehold.co/100x100.png',
    treatmentHistory: 'Cabang di Bali dan Batam. Populer untuk layanan microneedling dan thread lift (tarik benang).',
    preferences: ['Microneedling', 'Thread Lift'],
    location: { address: 'Jl. Teuku Umar No.18A, Denpasar, Bali', lat: -8.6756, lng: 115.2040 }
  },
];

export const appointments: Appointment[] = [
  { id: 'apt-001', clientName: 'Dermaster Clinic', clientId: 'cli-001', service: 'Demo Divine Pro', date: '2024-07-20', time: '10:00 AM', status: 'Confirmed' },
  { id: 'apt-002', clientName: 'Natasha Skin Clinic', clientId: 'cli-002', service: 'Pelatihan Laser Biaxis QS', date: '2024-07-21', time: '02:00 PM', status: 'Confirmed' },
  { id: 'apt-003', clientName: 'Profira Clinic Surabaya', clientId: 'cli-003', service: 'Konsultasi Perangkat Anti-Aging', date: '2024-07-22', time: '11:00 AM', status: 'Pending' },
  { id: 'apt-004', clientName: 'Miracle Aesthetic Clinic', clientId: 'cli-004', service: 'Training Morpheus8', date: '2024-07-22', time: '03:30 PM', status: 'Confirmed' },
  { id: 'apt-005', clientName: 'Dermaster Clinic', clientId: 'cli-001', service: 'Maintenance Perangkat Sofwave™', date: '2024-08-01', time: '09:00 AM', status: 'Cancelled' },
];

export const clientRequests: ClientRequest[] = [
  { id: 'req-001', clientName: 'Dermaster Clinic', clientId: 'cli-001', requestType: 'Service', details: 'Request for annual maintenance on Sofwave™.', status: 'New', date: '2024-07-28' },
  { id: 'req-002', clientName: 'Natasha Skin Clinic', clientId: 'cli-002', requestType: 'Troubleshoot', details: 'Laser Biaxis QS is showing an error code E-05.', status: 'New', date: '2024-07-27' },
  { id: 'req-003', clientName: 'Miracle Aesthetic Clinic', clientId: 'cli-004', requestType: 'Inquiry', details: 'Question about Ultra V thread compatibility with new procedure.', status: 'In Progress', date: '2024-07-26' },
  { id: 'req-004', clientName: 'Profira Clinic Surabaya', clientId: 'cli-003', requestType: 'Service', details: 'Indiba Deep Care handpiece is not heating correctly.', status: 'New', date: '2024-07-28' },
  { id: 'req-005', clientName: 'Dermaster Clinic', clientId: 'cli-001', requestType: 'Service', details: 'Service for Morpheus8: The screen is flickering during use.', status: 'New', date: '2024-07-29' },
];

export const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 5500 },
  ];

export const clientDemographicsData = [
    { ageGroup: '18-25', value: 25 },
    { ageGroup: '26-35', value: 45 },
    { ageGroup: '36-45', value: 20 },
    { ageGroup: '46plus', value: 10 },
];

export const inventoryStatusData = [
    { name: 'Devices', inStock: 18, lowStock: 0, outOfStock: 0 },
    { name: 'Skincare', inStock: 50, lowStock: 8, outOfStock: 1 },
];
