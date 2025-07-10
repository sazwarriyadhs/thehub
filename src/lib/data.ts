// src/lib/data.ts

import { db } from './db';
import { unstable_noStore as noStore } from 'next/cache';
import type {
  InventoryItem, ServiceRecord, Client, Appointment,
  DeployedMachine, ClientRequest, AdminUser
} from '@/types';

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
  const result = await db.query('SELECT * FROM inventory ORDER BY name ASC');
  return mapToCamelCase(result.rows) as InventoryItem[];
}

export async function fetchInventoryItemById(id: string): Promise<InventoryItem | undefined> {
  noStore();
  const result = await db.query('SELECT * FROM inventory WHERE id = $1', [id]);
  return mapToCamelCase(result.rows)[0] as InventoryItem | undefined;
}

// === CLIENTS ===
export async function fetchAllClients(): Promise<Client[]> {
  noStore();
  const result = await db.query('SELECT * FROM clients ORDER BY name ASC');
  return mapToCamelCase(result.rows) as Client[];
}

export async function fetchClientById(id: string): Promise<Client | undefined> {
  noStore();
  const result = await db.query(
    'SELECT *, penanggung_jawab_nama, penanggung_jawab_jabatan, location_address, location_lat, location_lng FROM clients WHERE id = $1',
    [id]
  );
  const client = mapToCamelCase(result.rows)[0];
  if (client) {
    client.penanggungJawab = {
      nama: client.penanggungJawabNama,
      jabatan: client.penanggungJawabJabatan,
    };
    client.location = {
      address: client.locationAddress,
      lat: client.locationLat,
      lng: client.locationLng,
    };
    delete client.penanggungJawabNama;
    delete client.penanggungJawabJabatan;
    delete client.locationAddress;
    delete client.locationLat;
    delete client.locationLng;
  }
  return client as Client;
}

// === SERVICE RECORDS ===
export async function fetchAllServiceRecords(): Promise<ServiceRecord[]> {
  noStore();
  const result = await db.query('SELECT * FROM service_records ORDER BY date DESC');
  return mapToCamelCase(result.rows) as ServiceRecord[];
}

export async function fetchServiceRecordById(id: string): Promise<ServiceRecord | undefined> {
  noStore();
  const result = await db.query('SELECT * FROM service_records WHERE id = $1', [id]);
  return mapToCamelCase(result.rows)[0] as ServiceRecord | undefined;
}

// === APPOINTMENTS ===
export async function fetchAllAppointments(): Promise<Appointment[]> {
  noStore();
  const result = await db.query('SELECT * FROM appointments ORDER BY date DESC');
  return mapToCamelCase(result.rows) as Appointment[];
}

export async function fetchAppointmentsByClientId(clientId: string): Promise<Appointment[]> {
  noStore();
  const result = await db.query('SELECT * FROM appointments WHERE client_id = $1 ORDER BY date DESC', [clientId]);
  return mapToCamelCase(result.rows) as Appointment[];
}

// === CLIENT REQUESTS ===
export async function fetchAllClientRequests(): Promise<ClientRequest[]> {
  noStore();
  const result = await db.query('SELECT * FROM client_requests ORDER BY date DESC');
  return mapToCamelCase(result.rows) as ClientRequest[];
}

export async function fetchClientRequestsForClient(clientId: string): Promise<ClientRequest[]> {
  noStore();
  const result = await db.query('SELECT * FROM client_requests WHERE client_id = $1 ORDER BY date DESC', [clientId]);
  return mapToCamelCase(result.rows) as ClientRequest[];
}

// === DEPLOYED MACHINES ===
export async function fetchDeployedMachines(): Promise<DeployedMachine[]> {
  noStore();
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
      lng: row.location_lng,
    },
  })) as DeployedMachine[];
}

export async function fetchDeployedMachinesForClient(clientId: string): Promise<InventoryItem[]> {
  noStore();
  const result = await db.query("SELECT * FROM inventory WHERE client_id = $1 AND type = 'Device'", [clientId]);
  return mapToCamelCase(result.rows) as InventoryItem[];
}

// === DASHBOARD CARDS ===
export async function fetchCardData() {
  noStore();
  const [revenueRes, clientsRes, inventoryRes, servicesRes] = await Promise.all([
    db.query("SELECT SUM(cost) FROM service_records WHERE status = 'Completed'"),
    db.query("SELECT COUNT(*) FROM clients"),
    db.query("SELECT SUM(quantity) FROM inventory"),
    db.query("SELECT COUNT(*) FROM service_records WHERE status = 'In Progress' OR status = 'Scheduled'"),
  ]);
  return {
    totalRevenue: Number(revenueRes.rows[0].sum) || 0,
    totalClients: Number(clientsRes.rows[0].count) || 0,
    totalInventory: Number(inventoryRes.rows[0].sum) || 0,
    pendingServices: Number(servicesRes.rows[0].count) || 0,
  };
}

// === ADMIN ===
export async function fetchAdminUser(): Promise<AdminUser> {
  noStore();
  const result = await db.query('SELECT * FROM admin_users LIMIT 1');
  return mapToCamelCase(result.rows)[0] as AdminUser;
}
