import type { InventoryItem, ServiceRecord, Client, Appointment, Technician } from '@/types';

export const inventoryItems: InventoryItem[] = [
  // Devices
  { id: 'inv-001', name: 'Sofwave™', type: 'Device', quantity: 3, purchaseDate: '2023-01-15', warrantyEndDate: '2025-01-15', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'Ultrasonik non-invasif untuk skin lifting, penghapusan garis halus, dan pengencangan kulit, termasuk wajah dan leher.' },
  { id: 'inv-002', name: 'Indiba Deep Care', type: 'Device', quantity: 1, purchaseDate: '2023-02-20', warrantyEndDate: '2025-02-20', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'Radio-frequency untuk perawatan tubuh, membantu pengurangan lingkar tubuh & pemulihan lebih cepat.' },
  { id: 'inv-003', name: 'Vbeam Perfecta®', type: 'Device', quantity: 2, purchaseDate: '2022-11-20', warrantyEndDate: '2024-11-20', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'Laser PDL untuk perawatan pigmentasi, flek, bekas jerawat, rosacea, stretch mark, dan masih banyak lagi.' },
  { id: 'inv-004', name: 'PicoWay®', type: 'Device', quantity: 1, purchaseDate: '2023-08-01', warrantyEndDate: '2025-08-01', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'Laser pico-second untuk melasma, pigmentasi, dan hapus tato.' },
  { id: 'inv-005', name: 'BiAxis QS™', type: 'Device', quantity: 1, purchaseDate: '2023-09-10', warrantyEndDate: '2025-09-10', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'Laser multidimensional untuk pigmen, tato, peremajaan, dan hair removal.' },
  { id: 'inv-006', name: 'Ultra V', type: 'Device', quantity: 100, purchaseDate: '2024-04-01', warrantyEndDate: 'N/A', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'Benang polydioxanone (PDO) untuk nose augmentation, volumizing, dan stimulasi kolagen.' },
  { id: 'inv-007', name: 'Morpheus8', type: 'Device', quantity: 2, purchaseDate: '2023-06-12', warrantyEndDate: '2025-06-12', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'Kombinasi microneedling dan RF untuk mengatasi garis halus dan selulit.' },
  { id: 'inv-008', name: 'Coolfase', type: 'Device', quantity: 1, purchaseDate: '2023-10-25', warrantyEndDate: '2025-10-25', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'Monopolar RF dengan teknologi pendinginan langsung (Direct Cooling), untuk skin tightening dan contouring.' },
  { id: 'inv-009', name: 'Lipodefine™', type: 'Device', quantity: 1, purchaseDate: '2023-11-30', warrantyEndDate: '2025-11-30', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'Teknologi endolifting dengan metode melting fat dan stimulasi kolagen untuk double chin dan kontur wajah.' },
  { id: 'inv-010', name: 'Laser Biaxis QS', type: 'Device', quantity: 1, purchaseDate: '2024-02-15', warrantyEndDate: '2026-02-15', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'Laser untuk perbaikan melasma, pigmentasi, dan penghapusan tato dengan downtime minimal.' },
  
  // Skincare and Consumables
  { id: 'inv-101', name: 'Geneskin® Serum', type: 'Skincare', quantity: 8, purchaseDate: '2024-03-01', warrantyEndDate: '2025-03-01', status: 'Low Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'Skincare product for post-procedure care.' },
  { id: 'inv-102', name: 'Vitamin C Cleanser', type: 'Skincare', quantity: 50, purchaseDate: '2024-02-18', warrantyEndDate: '2025-02-18', status: 'In Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'A gentle cleanser with Vitamin C to brighten and refresh the skin.' },
  { id: 'inv-103', name: 'Retinol Cream', type: 'Skincare', quantity: 0, purchaseDate: '2024-01-05', warrantyEndDate: '2025-01-05', status: 'Out of Stock', imageUrl: 'https://placehold.co/600x400.png', description: 'A powerful retinol cream for anti-aging and skin renewal.' },
];

export const serviceRecords: ServiceRecord[] = [
  { id: 'ser-001', equipment: 'Sofwave™', serviceType: 'Maintenance', date: '2024-06-15', technician: 'John Doe', cost: 250, status: 'Scheduled' },
  { id: 'ser-002', equipment: 'Vbeam Perfecta®', serviceType: 'Calibration', date: '2024-05-20', technician: 'Jane Smith', cost: 180, status: 'Completed' },
  { id: 'ser-003', equipment: 'Morpheus8', serviceType: 'Repair', date: '2024-06-01', technician: 'Mike Johnson', cost: 500, status: 'In Progress' },
  { id: 'ser-004', equipment: 'Sofwave™', serviceType: 'Maintenance', date: '2023-12-15', technician: 'John Doe', cost: 250, status: 'Completed' },
  { id: 'ser-005', equipment: 'PicoWay®', serviceType: 'Maintenance', date: '2024-07-01', technician: 'Jane Smith', cost: 300, status: 'Scheduled' },
];

export const clients: Client[] = [
  { 
    id: 'cli-001', 
    name: 'Dermaster Clinic', 
    email: 'info@dermaster.com', 
    phone: '021-555-1111', 
    joinDate: '2022-05-15', 
    avatar: 'https://placehold.co/100x100', 
    treatmentHistory: 'Jaringan luas di kota-kota besar. Fokus utama pada perawatan HIFU, CoolSculpting, filler, dan botox. Menggunakan teknologi modern dengan dokter berpengalaman.', 
    preferences: ['HIFU', 'CoolSculpting', 'Filler', 'Botox'] 
  },
  { 
    id: 'cli-002', 
    name: 'Natasha Skin Clinic', 
    email: 'contact@natasha-skin.com', 
    phone: '021-555-2222', 
    joinDate: '2021-09-01', 
    avatar: 'https://placehold.co/100x100', 
    treatmentHistory: 'Memiliki banyak cabang di area Jabodetabek. Menawarkan solusi estetika all-in-one, termasuk PRP, laser CO₂, serta produk skincare untuk klinik dan homecare.', 
    preferences: ['PRP', 'Laser CO₂', 'Skincare'] 
  },
  { 
    id: 'cli-003', 
    name: 'Profira Clinic Surabaya', 
    email: 'info@profira-clinic.com', 
    phone: '031-555-3333', 
    joinDate: '2023-02-20', 
    avatar: 'https://placehold.co/100x100', 
    treatmentHistory: 'Spesialis dalam perawatan anti-penuaan, seperti kerutan, pigmentasi, dan penghilangan tahi lalat. Sangat direkomendasikan untuk perawatan facial dan anti-aging.', 
    preferences: ['Anti-Aging', 'Pigmentasi', 'Facial'] 
  },
  { 
    id: 'cli-004', 
    name: 'Miracle Aesthetic Clinic', 
    email: 'bali@miracle-clinic.com', 
    phone: '0361-555-4444', 
    joinDate: '2023-11-10', 
    avatar: 'https://placehold.co/100x100', 
    treatmentHistory: 'Cabang di Bali dan Batam. Populer untuk layanan microneedling dan thread lift (tarik benang).', 
    preferences: ['Microneedling', 'Thread Lift'] 
  },
];

export const appointments: Appointment[] = [
  { id: 'apt-001', clientName: 'Dermaster Clinic', clientId: 'cli-001', service: 'Demo Coolfase', date: '2024-07-20', time: '10:00 AM', status: 'Confirmed' },
  { id: 'apt-002', clientName: 'Natasha Skin Clinic', clientId: 'cli-002', service: 'Pelatihan Laser Biaxis QS', date: '2024-07-21', time: '02:00 PM', status: 'Confirmed' },
  { id: 'apt-003', clientName: 'Profira Clinic Surabaya', clientId: 'cli-003', service: 'Konsultasi Perangkat Anti-Aging', date: '2024-07-22', time: '11:00 AM', status: 'Pending' },
  { id: 'apt-004', clientName: 'Miracle Aesthetic Clinic', clientId: 'cli-004', service: 'Training Morpheus8', date: '2024-07-22', time: '03:30 PM', status: 'Confirmed' },
  { id: 'apt-005', clientName: 'Dermaster Clinic', clientId: 'cli-001', service: 'Maintenance Perangkat Sofwave™', date: '2024-08-01', time: '09:00 AM', status: 'Cancelled' },
];

export const technicians: Technician[] = [
    { id: 'tech-001', name: 'John Doe', position: { lat: 34.0522, lng: -118.2437 } },
    { id: 'tech-002', name: 'Jane Smith', position: { lat: 34.056, lng: -118.25 } },
    { id: 'tech-003', name: 'Mike Johnson', position: { lat: 34.048, lng: -118.24 } },
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
    { name: 'Devices', inStock: 13, lowStock: 0, outOfStock: 0 },
    { name: 'Skincare', inStock: 50, lowStock: 8, outOfStock: 1 },
];
