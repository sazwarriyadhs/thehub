import { PageHeader } from '@/components/page-header';
import { inventoryItems, clients } from '@/lib/data';
import type { DeployedMachine } from '@/types';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const MapView = dynamic(() => import('@/components/map-view'), { 
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-muted rounded-lg flex items-center justify-center"><p>Loading map...</p></div>
});

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
        description="Locations of your devices at client clinics."
      />
      <Card>
        <CardContent className="p-0 overflow-hidden rounded-lg h-[600px]">
           {deployedMachines.length > 0 ? (
            <MapView machines={deployedMachines} />
          ) : (
            <div className="w-full h-[600px] flex flex-col items-center justify-center text-center gap-4">
              <AlertCircle className="w-16 h-16 text-muted-foreground" />
              <p className="text-lg font-medium">No Deployed Machines Found</p>
              <p className="text-muted-foreground">
                Assign a 'clientId' to your devices in the inventory data to see them on the map.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
