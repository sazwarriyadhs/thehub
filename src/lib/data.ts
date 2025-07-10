import { unstable_noStore as noStore } from 'next/cache';
import type {
  InventoryItem, ServiceRecord, Client, Appointment,
  DeployedMachine, ClientRequest, AdminUser
} from '@/types';
import { createClient } from './supabase/server';

// === INVENTORY ===
export async function fetchAllInventoryItems(): Promise<InventoryItem[]> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase.from('inventory').select('*').order('name', { ascending: true });
  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch inventory items.');
  }
  return data as InventoryItem[];
}

export async function fetchInventoryItemById(id: string): Promise<InventoryItem | undefined> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase.from('inventory').select('*').eq('id', id).single();
  if (error) {
    console.error('Database Error:', error);
    // It's okay if single() returns no rows, so we don't throw an error for that.
    if (error.code !== 'PGRST116') {
        throw new Error('Failed to fetch inventory item.');
    }
    return undefined;
  }
  return data as InventoryItem | undefined;
}

// === CLIENTS ===
export async function fetchAllClients(): Promise<Client[]> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase.from('clients').select('*').order('name', { ascending: true });
  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch clients.');
  }
  return data as Client[];
}

export async function fetchClientById(id: string): Promise<Client | undefined> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase.from('clients').select('*').eq('id', id).single();
   if (error) {
    console.error('Database Error:', error);
    if (error.code !== 'PGRST116') {
      throw new Error('Failed to fetch client.');
    }
    return undefined;
  }
  return data as Client | undefined;
}

// === SERVICE RECORDS ===
export async function fetchAllServiceRecords(): Promise<ServiceRecord[]> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase.from('service_records').select('*').order('date', { ascending: false });
  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch service records.');
  }
  return data as ServiceRecord[];
}

export async function fetchServiceRecordById(id: string): Promise<ServiceRecord | undefined> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase.from('service_records').select('*').eq('id', id).single();
  if (error) {
    console.error('Database Error:', error);
     if (error.code !== 'PGRST116') {
        throw new Error('Failed to fetch service record.');
    }
    return undefined;
  }
  return data as ServiceRecord | undefined;
}

// === APPOINTMENTS ===
export async function fetchAllAppointments(): Promise<Appointment[]> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase.from('appointments').select('*').order('date', { ascending: false });
   if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch appointments.');
  }
  return data as Appointment[];
}

export async function fetchAppointmentsByClientId(clientId: string): Promise<Appointment[]> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase.from('appointments').select('*').eq('client_id', clientId).order('date', { ascending: false });
   if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch client appointments.');
  }
  return data as Appointment[];
}

// === CLIENT REQUESTS ===
export async function fetchAllClientRequests(): Promise<ClientRequest[]> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase.from('client_requests').select('*').order('date', { ascending: false });
  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch client requests.');
  }
  return data as ClientRequest[];
}

export async function fetchClientRequestsForClient(clientId: string): Promise<ClientRequest[]> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase.from('client_requests').select('*').eq('client_id', clientId).order('date', { ascending: false });
  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch client requests for client.');
  }
  return data as ClientRequest[];
}

// === DEPLOYED MACHINES ===
export async function fetchDeployedMachines(): Promise<DeployedMachine[]> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase
    .from('inventory')
    .select('id, name, client_id, clients(name, location)')
    .eq('type', 'Device')
    .not('client_id', 'is', null);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch deployed machines.');
  }

  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    clientName: item.clients.name,
    location: {
      address: item.clients.location.address,
      lat: item.clients.location.lat,
      lng: item.clients.location.lng,
    },
  }));
}

export async function fetchDeployedMachinesForClient(clientId: string): Promise<InventoryItem[]> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase.from('inventory').select('*').eq('client_id', clientId).eq('type', 'Device');
  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch deployed machines for client.');
  }
  return data as InventoryItem[];
}

// === DASHBOARD CARDS ===
export async function fetchCardData() {
  noStore();
  const supabase = createClient();
  const [revenueRes, clientsRes, inventoryRes, servicesRes] = await Promise.all([
    supabase.from('service_records').select('cost', { count: 'exact' }).eq('status', 'Completed'),
    supabase.from('clients').select('*', { count: 'exact', head: true }),
    supabase.from('inventory').select('quantity'),
    supabase.from('service_records').select('*', { count: 'exact', head: true }).in('status', ['In Progress', 'Scheduled']),
  ]);

  const totalRevenue = revenueRes.data?.reduce((sum, r) => sum + r.cost, 0) || 0;
  const totalInventory = inventoryRes.data?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return {
    totalRevenue,
    totalClients: clientsRes.count || 0,
    totalInventory,
    pendingServices: servicesRes.count || 0,
  };
}

// === ADMIN ===
export async function fetchAdminUser(): Promise<AdminUser | null> {
  noStore();
  const supabase = createClient();
  const { data, error } = await supabase.from('admin_users').select('*').limit(1).single();
  if (error) {
    console.error('Database Error:', error);
     if (error.code !== 'PGRST116') {
      throw new Error('Failed to fetch admin user.');
    }
    return null;
  }
  return data as AdminUser | null;
}

// MOCK DATA FOR CHARTS (as it was in original data.ts)
// This should be replaced with real data queries in the future.
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
