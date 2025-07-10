import { unstable_noStore as noStore } from 'next/cache';
import { db } from './db';
import type { InventoryItem, ServiceRecord, Client, Appointment, ClientRequest, DeployedMachine } from '@/types';
import { format } from 'date-fns';

// Helper function to map database rows to camelCase object properties
const mapToCamelCase = (rows: any[]) => {
  return rows.map(row => {
    const newRow: { [key: string]: any } = {};
    for (const key in row) {
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      if (key === 'penanggung_jawab_nama' || key === 'penanggung_jawab_jabatan') continue;
      if (key === 'location_address' || key === 'location_lat' || key === 'location_lng') continue;
      newRow[camelKey] = row[key];
    }
    if (row.penanggung_jawab_nama) {
        newRow.penanggungJawab = {
            nama: row.penanggung_jawab_nama,
            jabatan: row.penanggung_jawab_jabatan
        }
    }
    if (row.location_address) {
        newRow.location = {
            address: row.location_address,
            lat: row.location_lat,
            lng: row.location_lng
        }
    }
    return newRow;
  });
};

// --- FETCH FUNCTIONS ---

export async function fetchAllInventoryItems() {
  noStore();
  try {
    const result = await db.query('SELECT * FROM inventory ORDER BY name ASC');
    return mapToCamelCase(result.rows) as InventoryItem[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch inventory items.');
  }
}

export async function fetchInventoryItemById(id: string) {
  noStore();
  try {
    const result = await db.query('SELECT * FROM inventory WHERE id = $1', [id]);
    return mapToCamelCase(result.rows)[0] as InventoryItem | undefined;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch inventory item.');
  }
}

export async function fetchAllClients() {
  noStore();
  try {
    const result = await db.query('SELECT * FROM clients ORDER BY name ASC');
    return mapToCamelCase(result.rows) as Client[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch clients.');
  }
}

export async function fetchClientById(id: string) {
    noStore();
    try {
        const result = await db.query('SELECT * FROM clients WHERE id = $1', [id]);
        return mapToCamelCase(result.rows)[0] as Client | undefined;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch client.');
    }
}

export async function fetchAllServiceRecords() {
    noStore();
    try {
        const result = await db.query('SELECT * FROM service_records ORDER BY date DESC');
        return mapToCamelCase(result.rows) as ServiceRecord[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch service records.');
    }
}

export async function fetchServiceRecordById(id: string) {
    noStore();
    try {
        const result = await db.query('SELECT * FROM service_records WHERE id = $1', [id]);
        return mapToCamelCase(result.rows)[0] as ServiceRecord | undefined;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch service record.');
    }
}

export async function fetchAllAppointments() {
    noStore();
    try {
        const result = await db.query('SELECT * FROM appointments ORDER BY date DESC, time ASC');
        return mapToCamelCase(result.rows) as Appointment[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch appointments.');
    }
}

export async function fetchAppointmentsByClientId(clientId: string) {
    noStore();
    try {
        const result = await db.query('SELECT * FROM appointments WHERE client_id = $1 ORDER BY date DESC, time ASC', [clientId]);
        return mapToCamelCase(result.rows) as Appointment[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch client appointments.');
    }
}


export async function fetchAllClientRequests() {
    noStore();
    try {
        const result = await db.query('SELECT * FROM client_requests ORDER BY date DESC');
        return mapToCamelCase(result.rows) as ClientRequest[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch client requests.');
    }
}

export async function fetchClientRequestsForClient(clientId: string) {
    noStore();
    try {
        const result = await db.query('SELECT * FROM client_requests WHERE client_id = $1 ORDER BY date DESC', [clientId]);
        return mapToCamelCase(result.rows) as ClientRequest[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch client requests.');
    }
}

export async function fetchDeployedMachines() {
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

export async function fetchDeployedMachinesForClient(clientId: string) {
    noStore();
    try {
        const result = await db.query(
            `SELECT id, name, image_url, purchase_date
             FROM inventory
             WHERE client_id = $1 AND type = 'Device'`, [clientId]);
        return mapToCamelCase(result.rows) as InventoryItem[];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch client machines.');
    }
}


// --- DASHBOARD AGGREGATE DATA ---

export async function fetchCardData() {
    noStore();
    try {
        const revenuePromise = db.query(`SELECT SUM(cost) FROM service_records WHERE status = 'Completed'`);
        const clientCountPromise = db.query(`SELECT COUNT(*) FROM clients`);
        const inventoryCountPromise = db.query(`SELECT SUM(quantity) FROM inventory`);
        const pendingServicesPromise = db.query(`SELECT COUNT(*) FROM service_records WHERE status = 'Scheduled' OR status = 'In Progress'`);

        const data = await Promise.all([
            revenuePromise,
            clientCountPromise,
            inventoryCountPromise,
            pendingServicesPromise,
        ]);

        const totalRevenue = parseFloat(data[0].rows[0].sum) || 0;
        const totalClients = parseInt(data[1].rows[0].count, 10) || 0;
        const totalInventory = parseInt(data[2].rows[0].sum, 10) || 0;
        const pendingServices = parseInt(data[3].rows[0].count, 10) || 0;

        return {
            totalRevenue,
            totalClients,
            totalInventory,
            pendingServices,
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

export async function fetchRevenueData() {
    noStore();
    try {
        const result = await db.query(`
            SELECT to_char(date, 'Mon') as month, SUM(cost) as revenue
            FROM service_records
            WHERE date > (NOW() - INTERVAL '6 months') AND status = 'Completed'
            GROUP BY month
            ORDER BY MIN(date)
        `);
        return result.rows;
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}
