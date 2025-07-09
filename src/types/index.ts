export type InventoryItem = {
  id: string;
  name: string;
  type: 'Device' | 'Skincare';
  quantity: number;
  purchaseDate: string;
  warrantyEndDate: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  imageUrl: string;
  description: string;
  clientId?: string;
};

export type ServiceRecord = {
  id: string;
  equipment: string;
  serviceType: 'Maintenance' | 'Repair' | 'Calibration';
  date: string;
  technician: string;
  cost: number;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  clientName: string;
  clientLocation: string;
  problemIdentification: string;
  solution: string;
  duration: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  avatar: string;
  treatmentHistory: string;
  preferences: string[];
  location: {
    address: string;
    lat: number;
    lng: number;
  };
};

export type Appointment = {
  id:string;
  clientName: string;
  clientId: string;
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
  clientName: string;
  clientId: string;
  requestType: 'Service' | 'Inquiry' | 'Troubleshoot';
  details: string;
  status: 'New' | 'In Progress' | 'Resolved';
  date: string;
};
