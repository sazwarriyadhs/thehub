export type AdminUser = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  type: 'Device' | 'Skincare';
  quantity: number;
  purchase_date: string;
  warranty_end_date: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image_url: string;
  description: string;
  client_id?: string;
};

export type ServiceRecord = {
  id: string;
  equipment: string;
  service_type: 'Maintenance' | 'Repair' | 'Calibration';
  date: string;
  technician: string;
  cost: number;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  client_name: string;
  client_location: string;
  problem_identification: string;
  solution: string;
  duration: string;
  technician_notes?: string;
  photo_proof_url?: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  join_date: string;
  avatar: string;
  penanggung_jawab: {
    nama: string;
    jabatan: string;
  };
  treatment_history: string;
  preferences: string[];
  location: {
    address: string;
    lat: number;
    lng: number;
  };
};

export type Appointment = {
  id:string;
  client_name: string;
  client_id: string;
  service: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
};

export type DeployedMachine = {
  id: string;
  name: string;
  clientName: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
};

export type ClientRequest = {
  id: string;
  client_name: string;
  client_id: string;
  request_type: 'Service' | 'Inquiry' | 'Troubleshoot';
  details: string;
  status: 'New' | 'In Progress' | 'Resolved';
  date: string;
};
