
import {
  inventory,
  serviceRecords,
  clients,
  appointments,
  clientRequests,
  adminUsers
} from './mock-data';
import type { InventoryItem, ServiceRecord, Client, Appointment, ClientRequest, AdminUser } from '@/types';

// This is a mock database implementation that uses in-memory data.
// It simulates the behavior of a real database client.

const db = {
  inventory: [...inventory],
  service_records: [...serviceRecords],
  clients: [...clients],
  appointments: [...appointments],
  client_requests: [...clientRequests],
  admin_users: [...adminUsers],
};

type TableKey = keyof typeof db;

// A very simple query simulator
export const mockDb = {
  query: async (queryString: string, values: any[] = []) => {
    console.log("Mock DB Query:", queryString, values);

    // Helper to get table and conditions from a simple query string
    const getWhereClause = (table: string): { [key: string]: any } | null => {
        const whereMatch = queryString.match(new RegExp(`FROM ${table} WHERE (\\w+) = \\$1`));
        if (whereMatch && values.length > 0) {
            return { [whereMatch[1]]: values[0] };
        }
        return null;
    };
    
    // SELECT queries
    if (queryString.startsWith('SELECT * FROM inventory')) {
        const where = getWhereClause('inventory');
        let data = db.inventory;
        if (where && where.id) {
            data = db.inventory.filter(i => i.id === where.id);
        } else if (where && where.client_id) {
             data = db.inventory.filter(i => i.client_id === where.client_id && i.type === 'Device');
        }
        return { rows: JSON.parse(JSON.stringify(data)) };
    }
    if (queryString.startsWith('SELECT * FROM clients')) {
        const where = getWhereClause('clients');
        let data = db.clients;
        if (where && where.id) {
            data = db.clients.filter(c => c.id === where.id);
        }
        return { rows: JSON.parse(JSON.stringify(data)) };
    }
     if (queryString.startsWith('SELECT * FROM service_records')) {
        const where = getWhereClause('service_records');
        let data = db.service_records;
        if (where && where.id) {
            data = db.service_records.filter(s => s.id === where.id);
        }
        return { rows: JSON.parse(JSON.stringify(data)) };
    }
    if (queryString.startsWith('SELECT * FROM appointments')) {
        const where = getWhereClause('appointments');
        let data = db.appointments;
        if (where && where.client_id) {
            data = db.appointments.filter(a => a.client_id === where.client_id);
        }
        return { rows: JSON.parse(JSON.stringify(data)) };
    }
    if (queryString.startsWith('SELECT * FROM client_requests')) {
        const where = getWhereClause('client_requests');
        let data = db.client_requests;
        if (where && where.client_id) {
            data = db.client_requests.filter(r => r.client_id === where.client_id);
        }
        return { rows: JSON.parse(JSON.stringify(data)) };
    }
    if (queryString.startsWith('SELECT * FROM admin_users')) {
       return { rows: JSON.parse(JSON.stringify(db.admin_users)) };
    }
     if (queryString.startsWith('SELECT SUM(cost)')) {
        const total = db.service_records
            .filter(r => r.status === 'Completed')
            .reduce((sum, r) => sum + r.cost, 0);
        return { rows: [{ sum: total }] };
    }
    if (queryString.startsWith('SELECT COUNT(*) FROM clients')) {
        return { rows: [{ count: db.clients.length }] };
    }
    if (queryString.startsWith('SELECT SUM(quantity) FROM inventory')) {
        const total = db.inventory.reduce((sum, item) => sum + item.quantity, 0);
        return { rows: [{ sum: total }] };
    }
    if (queryString.startsWith("SELECT COUNT(*) FROM service_records WHERE status = 'In Progress' OR status = 'Scheduled'")) {
        const count = db.service_records.filter(r => r.status === 'In Progress' || r.status === 'Scheduled').length;
        return { rows: [{ count }] };
    }
    if (queryString.startsWith('SELECT i.id, i.name, c.name as client_name')) {
        const deployed = db.inventory
            .filter(i => i.type === 'Device' && i.client_id)
            .map(i => {
                const client = db.clients.find(c => c.id === i.client_id);
                if (!client) return null;
                return {
                    id: i.id,
                    name: i.name,
                    client_name: client?.name,
                    location_address: client?.location.address,
                    location_lat: client?.location.lat,
                    location_lng: client?.location.lng,
                };
            }).filter(Boolean);
        return { rows: JSON.parse(JSON.stringify(deployed)) };
    }
     if (queryString.includes('SELECT technician_notes FROM service_records')) {
        const record = db.service_records.find(r => r.id === values[0]);
        return { rows: record ? [{ technician_notes: record.technician_notes }] : [] };
    }


    // UPDATE queries
    const updateMatch = queryString.match(/UPDATE (\w+)/);
    if (updateMatch) {
        const table = updateMatch[1] as TableKey;
        if (table === 'inventory') {
            const id = values[9];
            const index = db.inventory.findIndex(i => i.id === id);
            if (index !== -1) {
                db.inventory[index] = { ...db.inventory[index], name: values[0], type: values[1], quantity: values[2], purchase_date: values[3], warranty_end_date: values[4], status: values[5], description: values[6], image_url: values[7], client_id: values[8] };
            }
        }
        if (table === 'clients') {
            const id = values[12];
            const index = db.clients.findIndex(c => c.id === id);
            if (index !== -1) {
                const updatedClient: Client = {
                    ...db.clients[index],
                    name: values[0],
                    email: values[1],
                    phone: values[2],
                    join_date: values[3],
                    avatar: values[4],
                    penanggung_jawab: {
                        nama: values[5],
                        jabatan: values[6],
                    },
                    treatment_history: values[7],
                    preferences: Array.isArray(values[8]) ? values[8] : (values[8] || '').split(',').map((s: string) => s.trim()),
                    location: {
                        ...db.clients[index].location,
                        address: values[9],
                        lat: values[10],
                        lng: values[11],
                    },
                };
                db.clients[index] = updatedClient;
            }
        }
        if (table === 'admin_users') {
             const index = db.admin_users.findIndex(u => u.id === values[3]);
             if(index !== -1) {
                db.admin_users[index] = { ...db.admin_users[index], name: values[0], email: values[1], avatar: values[2] };
             }
        }
        if (table === 'service_records') {
            const id = values[3] || values[4];
            const index = db.service_records.findIndex(r => r.id === id);
            if (index !== -1) {
                db.service_records[index].status = values[0];
                db.service_records[index].technician_notes = values[1];
                if(values[2] !== null) { // photo_proof_url
                    db.service_records[index].photo_proof_url = values[2];
                }
            }
        }
        return { rows: [] };
    }

    // INSERT queries
    const insertMatch = queryString.match(/INSERT INTO (\w+)/);
    if(insertMatch) {
        const table = insertMatch[1] as TableKey;
        if(table === 'inventory') {
            const newItem: InventoryItem = { id: values[0], name: values[1], type: values[2], quantity: values[3], purchase_date: values[4], warranty_end_date: values[5], status: values[6], description: values[7], image_url: values[8], client_id: values[9] };
            db.inventory.push(newItem);
        }
        if(table === 'clients') {
            const newClient: Client = { 
                id: values[0], 
                name: values[1], 
                email: values[2], 
                phone: values[3], 
                join_date: values[4], 
                avatar: values[5], 
                penanggung_jawab: { nama: values[6], jabatan: values[7] }, 
                treatment_history: values[8], 
                preferences: Array.isArray(values[9]) ? values[9] : (values[9] || '').split(',').map((s: string) => s.trim()), 
                location: { address: values[10], lat: values[11], lng: values[12] } 
            };
            db.clients.push(newClient);
        }
        if(table === 'client_requests') {
            const newRequest: ClientRequest = { id: values[0], client_id: values[1], client_name: values[2], request_type: values[3], details: values[4], status: values[5], date: values[6] };
            db.client_requests.push(newRequest);
        }
        return { rows: [] };
    }
    
    // DELETE queries
    const deleteMatch = queryString.match(/DELETE FROM (\w+)/);
    if (deleteMatch) {
        const table = deleteMatch[1] as TableKey;
        if(table === 'inventory') {
            db.inventory = db.inventory.filter(i => i.id !== values[0]);
        }
         if(table === 'clients') {
            db.clients = db.clients.filter(c => c.id !== values[0]);
        }
        return { rows: [] };
    }


    console.warn("Unhandled mock query:", queryString);
    return { rows: [] };
  },
};
