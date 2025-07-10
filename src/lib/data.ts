import { mockDb } from './db';
import { unstable_noStore as noStore } from 'next/cache';
import type {
  InventoryItem, ServiceRecord, Client, Appointment,
  DeployedMachine, ClientRequest, AdminUser
} from '@/types';
import { adminUsers } from './mock-data';

// Util: Convert snake_case → camelCase
function mapToCamelCase(rows: any[]): any[] {
  return rows.map(row => {
    const newRow: { [key: string]: any } = {};
    for (const key in row) {
      const camelCaseKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase());
      newRow[camelCaseKey] = row[key];
    }
    return newRow;
  });
}

// === INVENTORY ===
export async function fetchAllInventoryItems(): Promise<InventoryItem[]> {
  noStore();
  const result = await mockDb.query('SELECT * FROM inventory ORDER BY name ASC');
  return result.rows as InventoryItem[];
}

export async function fetchInventoryItemById(id: string): Promise<InventoryItem | undefined> {
  noStore();
  const result = await mockDb.query('SELECT * FROM inventory WHERE id = $1', [id]);
  return result.rows[0] as InventoryItem | undefined;
}

// === CLIENTS ===
export async function fetchAllClients(): Promise<Client[]> {
  noStore();
  const result = await mockDb.query('SELECT * FROM clients ORDER BY name ASC');
  return result.rows as Client[];
}

export async function fetchClientById(id: string): Promise<Client | undefined> {
  noStore();
  const result = await mockDb.query(
    'SELECT * FROM clients WHERE id = $1',
    [id]
  );
  if (result.rows.length === 0) {
    return undefined;
  }
  // The mock data is already in the correct shape, so no need for complex mapping here.
  return result.rows[0] as Client;
}

// === SERVICE RECORDS ===
export async function fetchAllServiceRecords(): Promise<ServiceRecord[]> {
  noStore();
  const result = await mockDb.query('SELECT * FROM service_records ORDER BY date DESC');
  return result.rows as ServiceRecord[];
}

export async function fetchServiceRecordById(id: string): Promise<ServiceRecord | undefined> {
  noStore();
  const result = await mockDb.query('SELECT * FROM service_records WHERE id = $1', [id]);
  return result.rows[0] as ServiceRecord | undefined;
}

// === APPOINTMENTS ===
export async function fetchAllAppointments(): Promise<Appointment[]> {
  noStore();
  const result = await mockDb.query('SELECT * FROM appointments ORDER BY date DESC');
  return result.rows as Appointment[];
}

export async function fetchAppointmentsByClientId(clientId: string): Promise<Appointment[]> {
  noStore();
  const result = await mockDb.query('SELECT * FROM appointments WHERE client_id = $1 ORDER BY date DESC', [clientId]);
  return result.rows as Appointment[];
}

// === CLIENT REQUESTS ===
export async function fetchAllClientRequests(): Promise<ClientRequest[]> {
  noStore();
  const result = await mockDb.query('SELECT * FROM client_requests ORDER BY date DESC');
  return result.rows as ClientRequest[];
}

export async function fetchClientRequestsForClient(clientId: string): Promise<ClientRequest[]> {
  noStore();
  const result = await mockDb.query('SELECT * FROM client_requests WHERE client_id = $1 ORDER BY date DESC', [clientId]);
  return result.rows as ClientRequest[];
}

// === DEPLOYED MACHINES ===
export async function fetchDeployedMachines(): Promise<DeployedMachine[]> {
  noStore();
  const result = await mockDb.query(`
    SELECT i.id, i.name, c.name as client_name, c.location_address, c.location_lat, c.location_lng
    FROM inventory i
    JOIN clients c ON i.client_id = c.id
    WHERE i.type = 'Device' AND i.client_id IS NOT NULL
  `);
  return result.rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    clientName: row.client_name,
    location: {
      address: row.location_address,
      lat: row.location_lat,
      lng: row.location_lng,
    },
  })) as DeployedMachine[];
}

export async function fetchDeployedMachinesForClient(clientId: string): Promise<InventoryItem[]> {
  noStore();
  const result = await mockDb.query("SELECT * FROM inventory WHERE client_id = $1 AND type = 'Device'", [clientId]);
  return result.rows as InventoryItem[];
}

// === DASHBOARD CARDS ===
export async function fetchCardData() {
  noStore();
  const [revenueRes, clientsRes, inventoryRes, servicesRes] = await Promise.all([
    mockDb.query("SELECT SUM(cost) FROM service_records WHERE status = 'Completed'"),
    mockDb.query("SELECT COUNT(*) FROM clients"),
    mockDb.query("SELECT SUM(quantity) FROM inventory"),
    mockDb.query("SELECT COUNT(*) FROM service_records WHERE status = 'In Progress' OR status = 'Scheduled'"),
  ]);
  return {
    totalRevenue: Number(revenueRes.rows[0].sum) || 0,
    totalClients: Number(clientsRes.rows[0].count) || 0,
    totalInventory: Number(inventoryRes.rows[0].sum) || 0,
    pendingServices: Number(servicesRes.rows[0].count) || 0,
  };
}

// === ADMIN ===
export async function fetchAdminUser(): Promise<AdminUser | null> {
  noStore();
  const result = await mockDb.query('SELECT * FROM admin_users LIMIT 1');
   if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0] as AdminUser;
}

// MOCK DATA FOR CHARTS (as it was in original data.ts)
export const revenueData = [
  { month: 'Jan', revenue: 18600 },
  { month: 'Feb', revenue: 30500 },
  { month: 'Mar', revenue: 23700 },
  { month: 'Apr', revenue: 27800 },
  { month: 'May', revenue: 29000 },
  { month: 'Jun', revenue: 34900 },
];

export const clientDemographicsData = [
  { ageGroup: '18-25', value: 250 },
  { ageGroup: '26-35', value: 400 },
  { ageGroup: '36-45', value: 300 },
  { ageGroup: '46plus', value: 150 },
];

export const inventoryStatusData = [
  { name: 'PicoWay®', inStock: 5, lowStock: 2, outOfStock: 0 },
  { name: 'Vbeam®', inStock: 8, lowStock: 1, outOfStock: 1 },
  { name: 'Morpheus8', inStock: 3, lowStock: 0, outOfStock: 0 },
  { name: 'Sofwave™', inStock: 12, lowStock: 4, outOfStock: 2 },
  { name: 'Geneskin®', inStock: 50, lowStock: 15, outOfStock: 5 },
];
