
import { notFound } from 'next/navigation';
import { fetchClientById, fetchAppointmentsByClientId, fetchDeployedMachinesForClient } from '@/lib/data';
import { ClientDashboardView } from './components/client-dashboard-view';

// Hardcode client ID for demonstration. In a real app, this would come from auth.
const LOGGED_IN_CLIENT_ID = 'cli-001';

export default async function ClientDashboardPage() {
  const [client, appointments, machines] = await Promise.all([
    fetchClientById(LOGGED_IN_CLIENT_ID),
    fetchAppointmentsByClientId(LOGGED_IN_CLIENT_ID),
    fetchDeployedMachinesForClient(LOGGED_IN_CLIENT_ID),
  ]);

  if (!client) {
    notFound();
  }

  return (
    <ClientDashboardView
      client={client}
      appointments={appointments}
      machines={machines}
    />
  );
}
