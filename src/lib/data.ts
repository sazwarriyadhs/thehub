import type { InventoryItem, ServiceRecord, Client, Appointment, DeployedMachine, ClientRequest } from '@/types';

export const inventoryItems: InventoryItem[] = [
  {
    id: 'inv-001',
    name: 'Sofwave™',
    type: 'Device',
    quantity: 5,
    purchase_date: '2023-01-15',
    warranty_end_date: '2025-01-15',
    status: 'In Stock',
    image_url: '/images/sofwave.jpeg',
    description: '3D Ultrasound for face/neck lifting, fine lines, and cellulite.',
    client_id: 'cli-001',
  },
  {
    id: 'inv-002',
    name: 'Vbeam Perfecta®',
    type: 'Device',
    quantity: 2,
    purchase_date: '2022-11-20',
    warranty_end_date: '2024-11-20',
    status: 'Low Stock',
    image_url: 'https://aspmedica.com/wp-content/uploads/2021/01/vbeam-perfecta-1.png',
    description: 'Pulsed-Dye Laser (PDL) for rosacea, vascular issues, and pigmentation.',
    client_id: 'cli-002',
  },
  {
    id: 'inv-003',
    name: 'Geneskin® Serum',
    type: 'Skincare',
    quantity: 50,
    purchase_date: '2023-08-01',
    warranty_end_date: 'N/A',
    status: 'In Stock',
    image_url: 'https://regenesis.co.id/wp-content/uploads/2020/12/GENESKIN-LIFT-SERUM-28ML.jpg',
    description: 'Skincare product for post-procedure care.',
  },
  {
    id: 'inv-004',
    name: 'PicoWay®',
    type: 'Device',
    quantity: 0,
    purchase_date: '2023-03-10',
    warranty_end_date: '2025-03-10',
    status: 'Out of Stock',
    image_url: 'https://placehold.co/600x400.png',
    description: 'Picosecond Laser for pigmentation, tattoo removal, and collagen remodeling.',
    client_id: 'cli-003',
  },
    {
    id: 'inv-005',
    name: 'Morpheus8',
    type: 'Device',
    quantity: 3,
    purchase_date: '2023-05-22',
    warranty_end_date: '2025-05-22',
    status: 'In Stock',
    image_url: 'https://placehold.co/600x400.png',
    description: 'RF Microneedling for wrinkles, skin laxity, and cellulite.',
  },
];

export const serviceRecords: ServiceRecord[] = [
  {
    id: 'ser-001',
    equipment: 'Sofwave™',
    service_type: 'Maintenance',
    date: '2023-07-22',
    technician: 'Andi Wijaya',
    cost: 250,
    status: 'Completed',
    client_name: 'Dermaster Clinic',
    client_location: 'Pondok Indah, Jakarta Selatan',
    problem_identification: 'Unit requires annual preventive maintenance as per service agreement. No operational issues reported by the client. Standard check-up and system calibration needed.',
    solution: 'Completed full diagnostic scan using manufacturer software. All parameters are within normal range. Cleaned all optical components and air filters. Re-calibrated the energy output to ensure accuracy. Provided a brief training refresher to the on-site operator. The machine is in optimal working condition.',
    duration: '4 hours',
  },
  {
    id: 'ser-002',
    equipment: 'Vbeam Perfecta®',
    service_type: 'Repair',
    date: '2023-09-05',
    technician: 'Budi Santoso',
    cost: 800,
    status: 'In Progress',
    client_name: 'Miracle Aesthetic Clinic',
    client_location: 'Tunjungan Plaza, Surabaya',
    problem_identification: 'Client reported "Error 23 - Handpiece Cooling Failure" on the main display. The device is non-operational. Initial phone support was unable to resolve the issue.',
    solution: 'On-site diagnosis confirmed a faulty cooling pump within the handpiece assembly. The pump was not circulating coolant, causing the system to overheat and trigger the error. Replaced the entire handpiece cooling module with a new part (Part #VB-HP-C4). Flushed and refilled the cooling system. Ran multiple test cycles successfully. The error is now cleared.',
    duration: '6 hours',
  },
  {
    id: 'ser-003',
    equipment: 'PicoWay®',
    service_type: 'Calibration',
    date: '2023-10-11',
    technician: 'Andi Wijaya',
    cost: 350,
    status: 'Scheduled',
    client_name: 'Erha Clinic',
    client_location: 'Kemanggisan, Jakarta Barat',
    problem_identification: 'Scheduled bi-annual energy output calibration. Client has noted a slight perceived decrease in treatment efficacy, requesting a full system check.',
    solution: 'Technician is scheduled to visit the site on the specified date. A power meter and beam profiler will be used to measure and adjust the laser output for all available wavelengths and spot sizes. The optical path will also be inspected and cleaned.',
    duration: 'Scheduled',
  },
];

export const clients: Client[] = [
  {
    id: 'cli-001',
    name: 'Dermaster Clinic',
    email: 'info@dermaster.com',
    phone: '021-555-1111',
    join_date: '2021-05-12',
    avatar: 'https://placehold.co/100x100.png',
    penanggung_jawab: {
        nama: 'Dr. Andreas',
        jabatan: 'Kepala Cabang'
    },
    treatment_history: 'Fokus utama pada perawatan laser dan peremajaan kulit. Telah membeli Sofwave dan beberapa produk Geneskin. Memiliki basis pelanggan yang besar untuk perawatan anti-aging. Sangat puas dengan hasil Sofwave. Pengiriman terakhir: 2 karton Geneskin Serum pada 1 Agustus 2023.',
    preferences: ['HIFU', 'Botox', 'Filler'],
    location: {
        address: 'Jl. Metro Pondok Indah No.1, Jakarta Selatan',
        lat: -6.262846,
        lng: 106.784576,
    }
  },
  {
    id: 'cli-002',
    name: 'Miracle Aesthetic Clinic',
    email: 'contact@miracle-clinic.com',
    phone: '031-444-2222',
    join_date: '2020-11-02',
    avatar: 'https://placehold.co/100x100.png',
     penanggung_jawab: {
        nama: 'Dr. Lanny Junita',
        jabatan: 'Direktur Medis'
    },
    treatment_history: 'Klien lama dengan fokus pada perawatan vaskular dan pigmentasi. Membeli Vbeam Perfecta pada tahun 2022. Membutuhkan dukungan teknis berkala dan pelatihan staf baru. Terakhir kali meminta penawaran untuk laser picosecond.',
    preferences: ['Vascular Laser', 'Chemical Peels'],
     location: {
        address: 'Tunjungan Plaza 4, Jl. Jenderal Basuki Rachmat No.8-12, Surabaya',
        lat: -7.2612,
        lng: 112.7412
    }
  },
  {
    id: 'cli-003',
    name: 'Erha Clinic',
    email: 'support@erha.co.id',
    phone: '021-333-5555',
    join_date: '2022-01-20',
    avatar: 'https://placehold.co/100x100.png',
     penanggung_jawab: {
        nama: 'Ibu Ratna',
        jabatan: 'Manajer Pembelian'
    },
    treatment_history: 'Jaringan klinik besar dengan banyak cabang. Tertarik pada teknologi terbaru. Membeli PicoWay untuk salah satu cabang premium mereka. Menunjukkan minat pada Morpheus8 untuk perluasan layanan.',
    preferences: ['Pico Laser', 'Acne Treatment'],
     location: {
        address: 'Jl. Kemanggisan Utama Raya No.10, Jakarta Barat',
        lat: -6.2023,
        lng: 106.7825
    }
  },
];

export const appointments: Appointment[] = [
  {
    id: 'apt-001',
    client_id: 'cli-001',
    client_name: 'Dermaster Clinic',
    service: 'Product Demo: Morpheus8',
    date: '2023-11-15',
    time: '10:00 AM',
    status: 'Confirmed',
  },
  {
    id: 'apt-002',
    client_id: 'cli-002',
    client_name: 'Miracle Aesthetic Clinic',
    service: 'Staff Training: Vbeam Perfecta',
    date: '2023-11-20',
    time: '02:00 PM',
    status: 'Pending',
  },
  {
    id: 'apt-003',
    client_id: 'cli-003',
    client_name: 'Erha Clinic',
    service: 'Consultation: Business Expansion',
    date: '2023-11-05',
    time: '11:00 AM',
    status: 'Cancelled',
  },
  {
    id: 'apt-004',
    client_id: 'cli-001',
    client_name: 'Dermaster Clinic',
    service: 'Follow-up: Sofwave Performance',
    date: '2023-12-01',
    time: '03:00 PM',
    status: 'Confirmed',
  },
];

export const deployedMachines: DeployedMachine[] = [
  {
    id: 'inv-001',
    name: 'Sofwave™',
    clientName: 'Dermaster Clinic',
    location: {
        address: 'Jl. Metro Pondok Indah No.1, Jakarta Selatan',
        lat: -6.262846,
        lng: 106.784576,
    }
  },
  {
    id: 'inv-002',
    name: 'Vbeam Perfecta®',
    clientName: 'Miracle Aesthetic Clinic',
    location: {
        address: 'Tunjungan Plaza 4, Jl. Jenderal Basuki Rachmat No.8-12, Surabaya',
        lat: -7.2612,
        lng: 112.7412
    }
  },
  {
    id: 'inv-004',
    name: 'PicoWay®',
    clientName: 'Erha Clinic',
    location: {
        address: 'Jl. Kemanggisan Utama Raya No.10, Jakarta Barat',
        lat: -6.2023,
        lng: 106.7825
    }
  }
];

export const clientRequests: ClientRequest[] = [
    {
        id: 'req-001',
        clientId: 'cli-001',
        clientName: 'Dermaster Clinic',
        requestType: 'Service',
        details: 'Service for Sofwave™: Annual maintenance required.',
        status: 'New',
        date: '2023-11-01',
    },
    {
        id: 'req-002',
        clientId: 'cli-002',
        clientName: 'Miracle Aesthetic Clinic',
        requestType: 'Troubleshoot',
        details: 'Troubleshoot Vbeam Perfecta®: Handpiece cooling failure reported.',
        status: 'In Progress',
        date: '2023-10-30',
    },
     {
        id: 'req-003',
        clientId: 'cli-003',
        clientName: 'Erha Clinic',
        requestType: 'Inquiry',
        details: 'Inquiry: Requesting quote for Morpheus8 device.',
        status: 'Resolved',
        date: '2023-10-28',
    },
];

// --- CHART DATA (MOCK) ---

export const revenueData = [
  { month: 'May', revenue: 1800 },
  { month: 'Jun', revenue: 2300 },
  { month: 'Jul', revenue: 2100 },
  { month: 'Aug', revenue: 3200 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 3800 },
];

export const clientDemographicsData = [
    { ageGroup: '18-25', value: 250 },
    { ageGroup: '26-35', value: 400 },
    { ageGroup: '36-45', value: 300 },
    { ageGroup: '46plus', value: 200 },
];

export const inventoryStatusData = [
  { name: 'PicoWay®', inStock: 3, lowStock: 1, outOfStock: 1 },
  { name: 'Sofwave™', inStock: 5, lowStock: 2, outOfStock: 0 },
  { name: 'Morpheus8', inStock: 8, lowStock: 0, outOfStock: 0 },
  { name: 'Vbeam', inStock: 2, lowStock: 3, outOfStock: 2 },
  { name: 'Geneskin®', inStock: 50, lowStock: 15, outOfStock: 0 },
];

// --- MOCK FETCH FUNCTIONS ---
export async function fetchAllInventoryItems(): Promise<InventoryItem[]> {
  return Promise.resolve(inventoryItems);
}

export async function fetchInventoryItemById(id: string): Promise<InventoryItem | undefined> {
  return Promise.resolve(inventoryItems.find(item => item.id === id));
}

export async function fetchAllClients(): Promise<Client[]> {
  return Promise.resolve(clients);
}

export async function fetchClientById(id: string): Promise<Client | undefined> {
  return Promise.resolve(clients.find(c => c.id === id));
}

export async function fetchAllServiceRecords(): Promise<ServiceRecord[]> {
    return Promise.resolve(serviceRecords);
}

export async function fetchServiceRecordById(id: string): Promise<ServiceRecord | undefined> {
    return Promise.resolve(serviceRecords.find(record => record.id === id));
}

export async function fetchAllAppointments(): Promise<Appointment[]> {
    return Promise.resolve(appointments);
}

export async function fetchAppointmentsByClientId(clientId: string): Promise<Appointment[]> {
    return Promise.resolve(appointments.filter(apt => apt.client_id === clientId));
}

export async function fetchAllClientRequests(): Promise<ClientRequest[]> {
    return Promise.resolve(clientRequests);
}

export async function fetchClientRequestsForClient(clientId: string): Promise<ClientRequest[]> {
    return Promise.resolve(clientRequests.filter(req => req.clientId === clientId));
}

export async function fetchDeployedMachines(): Promise<DeployedMachine[]> {
    const machinesWithClientInfo = inventoryItems
        .filter(item => item.client_id && item.type === 'Device')
        .map(item => {
            const client = clients.find(c => c.id === item.client_id);
            return {
                id: item.id,
                name: item.name,
                clientName: client ? client.name : 'Unknown Client',
                location: client ? client.location : { address: 'N/A', lat: 0, lng: 0 }
            }
        });
    return Promise.resolve(machinesWithClientInfo);
}

export async function fetchDeployedMachinesForClient(clientId: string): Promise<InventoryItem[]> {
    return Promise.resolve(inventoryItems.filter(item => item.client_id === clientId));
}

export async function fetchCardData() {
    const totalRevenue = serviceRecords
        .filter(r => r.status === 'Completed')
        .reduce((sum, r) => sum + r.cost, 0);
    const totalClients = clients.length;
    const totalInventory = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);
    const pendingServices = serviceRecords.filter(r => r.status === 'In Progress' || r.status === 'Scheduled').length;

    return Promise.resolve({
        totalRevenue,
        totalClients,
        totalInventory,
        pendingServices
    });
}

export async function fetchRevenueData() {
    return Promise.resolve(revenueData);
}
