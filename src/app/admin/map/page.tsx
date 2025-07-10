import { PageHeader } from '@/components/page-header';
import { fetchDeployedMachines } from '@/lib/data';
import { MapPageClient } from './components/map-page-client';

export default async function MapPage() {
  const deployedMachines = await fetchDeployedMachines();

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
