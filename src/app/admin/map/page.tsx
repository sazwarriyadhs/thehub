import { PageHeader } from '@/components/page-header';
import { inventoryItems, clients } from '@/lib/data';
import type { DeployedMachine } from '@/types';
import { MapPageClient } from './components/map-page-client';

export default function MapPage() {
  const deployedMachines: DeployedMachine[] = [];
  const clientMap = new Map(clients.map(c => [c.id, c]));

  inventoryItems.forEach(item => {
    if (item.type === 'Device' && item.clientId) {
      const client = clientMap.get(item.clientId);
      if (client) {
        deployedMachines.push({
          id: item.id,
          name: item.name,
          clientName: client.name,
          location: client.location,
        });
      }
    }
  });

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Deployed Machine Map"
        description="Locations of your devices at client clinics. Search to find specific locations."
      />
      <MapPageClient initialMachines={deployedMachines} />
    </div>
  );
}
