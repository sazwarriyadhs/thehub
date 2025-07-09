import type { InventoryItem, ServiceRecord, Client, Appointment, Technician } from '@/types';

export const inventoryItems: InventoryItem[] = [
  { id: 'inv-001', name: 'Sofwave™ Device', type: 'Device', quantity: 3, purchaseDate: '2023-01-15', warrantyEndDate: '2025-01-15', status: 'In Stock' },
  { id: 'inv-002', name: 'Vbeam Perfecta®', type: 'Device', quantity: 2, purchaseDate: '2022-11-20', warrantyEndDate: '2024-11-20', status: 'In Stock' },
  { id: 'inv-003', name: 'Geneskin® Serum', type: 'Skincare', quantity: 8, purchaseDate: '2024-03-01', warrantyEndDate: '2025-03-01', status: 'Low Stock' },
  { id: 'inv-004', name: 'HydraFacial Machine', type: 'Device', quantity: 1, purchaseDate: '2023-05-10', warrantyEndDate: '2025-05-10', status: 'In Stock' },
  { id: 'inv-005', name: 'Vitamin C Cleanser', type: 'Skincare', quantity: 50, purchaseDate: '2024-02-18', warrantyEndDate: '2025-02-18', status: 'In Stock' },
  { id: 'inv-006', name: 'Retinol Cream', type: 'Skincare', quantity: 0, purchaseDate: '2024-01-05', warrantyEndDate: '2025-01-05', status: 'Out of Stock' },
];

export const serviceRecords: ServiceRecord[] = [
  { id: 'ser-001', equipment: 'Sofwave™ Device', serviceType: 'Maintenance', date: '2024-06-15', technician: 'John Doe', cost: 250, status: 'Scheduled' },
  { id: 'ser-002', equipment: 'Vbeam Perfecta®', serviceType: 'Calibration', date: '2024-05-20', technician: 'Jane Smith', cost: 180, status: 'Completed' },
  { id: 'ser-003', equipment: 'HydraFacial Machine', serviceType: 'Repair', date: '2024-06-01', technician: 'Mike Johnson', cost: 500, status: 'In Progress' },
  { id: 'ser-004', equipment: 'Sofwave™ Device', serviceType: 'Maintenance', date: '2023-12-15', technician: 'John Doe', cost: 250, status: 'Completed' },
];

export const clients: Client[] = [
  { id: 'cli-001', name: 'Emma Watson', email: 'emma@example.com', phone: '123-456-7890', joinDate: '2022-03-10', avatar: 'https://placehold.co/100x100', treatmentHistory: 'Client has received two sessions of micro-needling in the past 6 months to address acne scars. Also completed a full course of Vbeam Perfecta® for rosacea.', preferences: ['Organic Products', 'Evening Appointments'] },
  { id: 'cli-002', name: 'Daniel Radcliffe', email: 'daniel@example.com', phone: '234-567-8901', joinDate: '2023-08-22', avatar: 'https://placehold.co/100x100', treatmentHistory: 'Regular monthly HydraFacial treatments for general skin health and hydration. Used Geneskin® products for post-treatment care.', preferences: ['Express Services'] },
  { id: 'cli-003', name: 'Scarlett Johansson', email: 'scarlett@example.com', phone: '345-678-9012', joinDate: '2021-11-05', avatar: 'https://placehold.co/100x100', treatmentHistory: 'One session of Sofwave™ for skin tightening on the lower face and neck. Expressed interest in non-invasive anti-aging solutions.', preferences: ['Anti-Aging', 'Minimal Downtime'] },
  { id: 'cli-004', name: 'Chris Evans', email: 'chris@example.com', phone: '456-789-0123', joinDate: '2024-01-15', avatar: 'https://placehold.co/100x100', treatmentHistory: 'Initial consultation completed. No treatments yet. Concerned about sun damage and fine lines.', preferences: ['Preventative Care'] },
];

export const appointments: Appointment[] = [
  { id: 'apt-001', clientName: 'Emma Watson', clientId: 'cli-001', service: 'Micro-needling', date: '2024-07-20', time: '10:00 AM', status: 'Confirmed' },
  { id: 'apt-002', clientName: 'Daniel Radcliffe', clientId: 'cli-002', service: 'HydraFacial', date: '2024-07-21', time: '02:00 PM', status: 'Confirmed' },
  { id: 'apt-003', clientName: 'Chris Evans', clientId: 'cli-004', service: 'Consultation', date: '2024-07-22', time: '11:00 AM', status: 'Pending' },
  { id: 'apt-004', clientName: 'Scarlett Johansson', clientId: 'cli-003', service: 'Sofwave™ Follow-up', date: '2024-07-22', time: '03:30 PM', status: 'Confirmed' },
  { id: 'apt-005', clientName: 'Jessica Alba', clientId: 'cli-005', service: 'Vbeam Perfecta®', date: '2024-08-01', time: '09:00 AM', status: 'Cancelled' },
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
    { name: 'Devices', inStock: 6, lowStock: 0, outOfStock: 0 },
    { name: 'Skincare', inStock: 50, lowStock: 8, outOfStock: 1 },
];
