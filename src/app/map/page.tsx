import { PageHeader } from '@/components/page-header';
import { MapView } from '@/components/map-view';

export default function MapPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Technician Map"
        description="Real-time location of your service technicians."
      />
      <MapView />
    </div>
  );
}
