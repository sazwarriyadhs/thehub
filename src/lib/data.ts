import 'server-only';
import { db } from './db';
import { unstable_noStore as noStore } from 'next/cache';
import type { InventoryItem, ServiceRecord, Client, Appointment, DeployedMachine, ClientRequest, AdminUser } from '@/types';

// Helper function to convert snake_case from DB to camelCase for JS
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

// --- MOCK FETCH FUNCTIONS ---
export async function fetchAllInventoryItems(): Promise<InventoryItem[]> {
  noStore();
  try {
    const result = await db.query('SELECT * FROM inventory ORDER BY name ASC');
    return mapToCamelCase(result.rows) as InventoryItem[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch inventory items.');
  }
}

export async function fetchInventoryItemById(id: string): Promise<InventoryItem | undefined> {
  noStore();
  try {
    const result = await db.query('SELECT * FROM inventory WHERE id = $1', [id]);
    return mapToCamelCase(result.rows)[0] as InventoryItem | undefined;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch inventory item.');
  }
}

export async function fetchAllClients(): Promise<Client[]> {
  noStore();
  try {
    const result = await db.query('SELECT * FROM clients ORDER BY name ASC');
    return mapToCamelCase(result.rows) as Client[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch clients.');
  }
}

export async function fetchClientById(id: string): Promise<Client | undefined> {
  noStore();
  try {
    const result = await db.query('SELECT *, penanggung_jawab_nama, penanggung_jawab_jabatan, location_address, location_lat, location_lng FROM clients WHERE id = $1', [id]);
    const client = mapToCamelCase(result.rows)[0];
    if (client) {
        // Restructure nested objects
        client.penanggungJawab = {
            nama: client.penanggungJawabNama,
            jabatan: client.penanggungJawabJabatan
        };
        client.location = {
            address: client.locationAddress,
            lat: client.locationLat,
            lng: client.locationLng
        }
        delete client.penanggungJawabNama;
        delete client.penanggungJawabJabatan;
        delete client.locationAddress;
        delete client.locationLat;
        delete client.locationLng;
    }
    return client as Client | undefined;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch client.');
  }
}

export async function fetchAllServiceRecords(): Promise<ServiceRecord[]> {
    noStore();
    try {
        const result = await db.query('SELECT * FROM service_records ORDER BY date DESC');
        return mapToCamelCase(result.rows) as ServiceRecord[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch service records.');
    }
}

export async function fetchServiceRecordById(id: string): Promise<ServiceRecord | undefined> {
    noStore();
    try {
        const result = await db.query('SELECT * FROM service_records WHERE id = $1', [id]);
        return mapToCamelCase(result.rows)[0] as ServiceRecord | undefined;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch service record.');
    }
}

export async function fetchAllAppointments(): Promise<Appointment[]> {
    noStore();
    try {
        const result = await db.query('SELECT * FROM appointments ORDER BY date DESC');
        return mapToCamelCase(result.rows) as Appointment[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch appointments.');
    }
}

export async function fetchAppointmentsByClientId(clientId: string): Promise<Appointment[]> {
    noStore();
    try {
        const result = await db.query('SELECT * FROM appointments WHERE client_id = $1 ORDER BY date DESC', [clientId]);
        return mapToCamelCase(result.rows) as Appointment[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch client appointments.');
    }
}

export async function fetchAllClientRequests(): Promise<ClientRequest[]> {
    noStore();
    try {
        const result = await db.query('SELECT * FROM client_requests ORDER BY date DESC');
        return mapToCamelCase(result.rows) as ClientRequest[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch client requests.');
    }
}

export async function fetchClientRequestsForClient(clientId: string): Promise<ClientRequest[]> {
    noStore();
    try {
        const result = await db.query('SELECT * FROM client_requests WHERE client_id = $1 ORDER BY date DESC', [clientId]);
        return mapToCamelCase(result.rows) as ClientRequest[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch client-specific requests.');
    }
}

export async function fetchDeployedMachines(): Promise<DeployedMachine[]> {
    noStore();
    try {
        const result = await db.query(`
            SELECT i.id, i.name, c.name as client_name, c.location_address, c.location_lat, c.location_lng
            FROM inventory i
            JOIN clients c ON i.client_id = c.id
            WHERE i.type = 'Device' AND i.client_id IS NOT NULL
        `);
        
        return result.rows.map(row => ({
            id: row.id,
            name: row.name,
            clientName: row.client_name,
            location: {
                address: row.location_address,
                lat: row.location_lat,
                lng: row.location_lng
            }
        })) as DeployedMachine[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch deployed machines.');
    }
}

export async function fetchDeployedMachinesForClient(clientId: string): Promise<InventoryItem[]> {
    noStore();
    try {
        const result = await db.query("SELECT * FROM inventory WHERE client_id = $1 AND type = 'Device'", [clientId]);
        return mapToCamelCase(result.rows) as InventoryItem[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch deployed machines for client.');
    }
}

export async function fetchCardData() {
    noStore();
    try {
        const revenuePromise = db.query("SELECT SUM(cost) FROM service_records WHERE status = 'Completed'");
        const clientsPromise = db.query("SELECT COUNT(*) FROM clients");
        const inventoryPromise = db.query("SELECT SUM(quantity) FROM inventory");
        const servicesPromise = db.query("SELECT COUNT(*) FROM service_records WHERE status = 'In Progress' OR status = 'Scheduled'");

        const [revenueRes, clientsRes, inventoryRes, servicesRes] = await Promise.all([
            revenuePromise,
            clientsPromise,
            inventoryPromise,
            servicesPromise
        ]);

        return {
            totalRevenue: Number(revenueRes.rows[0].sum) || 0,
            totalClients: Number(clientsRes.rows[0].count) || 0,
            totalInventory: Number(inventoryRes.rows[0].sum) || 0,
            pendingServices: Number(servicesRes.rows[0].count) || 0,
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

export async function fetchAdminUser(): Promise<AdminUser> {
  noStore();
  try {
    // Assuming there's only one admin user for this app
    const result = await db.query('SELECT * FROM admin_users LIMIT 1');
    return mapToCamelCase(result.rows)[0] as AdminUser;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch admin user.');
  }
}
