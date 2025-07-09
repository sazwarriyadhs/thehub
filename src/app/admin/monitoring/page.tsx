import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { inventoryItems, serviceRecords } from '@/lib/data';
import type { InventoryItem, ServiceRecord } from '@/types';
import { ShoppingBag, Wrench, ShieldOff, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type TimelineEvent = {
  type: 'Purchase' | 'Service' | 'Warranty End';
  title: string;
  date: string;
  details?: string;
  icon: React.ElementType;
};

const statusVariant: Record<InventoryItem['status'], 'default' | 'secondary' | 'destructive'> = {
  'In Stock': 'default',
  'Low Stock': 'secondary',
  'Out of Stock': 'destructive',
};

const serviceStatusIcon: Record<ServiceRecord['status'], React.ElementType> = {
    'Completed': CheckCircle,
    'Scheduled': AlertCircle,
    'In Progress': Wrench,
};

export default function MonitoringPage() {
  const devices = inventoryItems.filter((item) => item.type === 'Device');

  const getDeviceTimeline = (device: InventoryItem): TimelineEvent[] => {
    const timeline: TimelineEvent[] = [];

    // Purchase Event
    timeline.push({
      type: 'Purchase',
      title: 'Machine Acquired',
      date: device.purchaseDate,
      icon: ShoppingBag,
    });

    // Service Events
    const relatedServices = serviceRecords
      .filter((record) => record.equipment === device.name)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    relatedServices.forEach((service) => {
      timeline.push({
        type: 'Service',
        title: `${service.serviceType} (${service.status})`,
        date: service.date,
        details: `Technician: ${service.technician} | Cost: $${service.cost.toFixed(2)}`,
        icon: serviceStatusIcon[service.status],
      });
    });

    // Warranty End Event
    timeline.push({
      type: 'Warranty End',
      title: 'Warranty Expires',
      date: device.warrantyEndDate,
      icon: ShieldOff,
    });
    
    // Sort all events by date
    return timeline.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Machine Monitoring"
        description="Track the lifecycle of each machine from acquisition to end-of-use."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {devices.map((device) => {
          const timeline = getDeviceTimeline(device);
          return (
            <Card key={device.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl">{device.name}</CardTitle>
                    <Badge variant={statusVariant[device.status]} className="shrink-0">{device.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="relative">
                  {timeline.map((event, index) => (
                    <div key={index} className="flex gap-4 pl-8 relative pb-8 last:pb-0">
                       <div className="absolute left-0 top-0 flex flex-col items-center">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary z-10">
                           <event.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        {index < timeline.length - 1 && (
                            <div className="w-px flex-grow bg-border mt-2"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                        {event.details && <p className="text-xs text-muted-foreground mt-1">{event.details}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
