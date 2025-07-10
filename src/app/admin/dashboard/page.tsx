import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Users, Box, Wrench, Bell, BrainCircuit, HelpCircle, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { RevenueChart } from '@/components/charts/revenue-chart';
import { ClientDemographicsChart } from '@/components/charts/client-demographics-chart';
import { InventoryStatusChart } from '@/components/charts/inventory-status-chart';
import { fetchCardData, fetchAllClientRequests, fetchDeployedMachines } from '@/lib/data';
import type { ClientRequest } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { MapDisplay } from '../map/components/map-display';
import { format } from 'date-fns';

const requestIcons: Record<ClientRequest['request_type'], React.ElementType> = {
  'Service': Wrench,
  'Troubleshoot': BrainCircuit,
  'Inquiry': HelpCircle,
};

const requestStatusVariant: Record<ClientRequest['status'], 'default' | 'secondary' | 'destructive'> = {
  'New': 'destructive',
  'In Progress': 'secondary',
  'Resolved': 'default',
};

export default async function DashboardPage() {
  const { totalRevenue, totalClients, totalInventory, pendingServices } = await fetchCardData();
  const recentRequests = (await fetchAllClientRequests()).slice(0, 5);
  const deployedMachines = await fetchDeployedMachines();
  
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description="An overview of your distribution business, client activities, and sales."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalClients}</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inventory Items
            </CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInventory.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Services Pending
            </CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{pendingServices}</div>
            <p className="text-xs text-muted-foreground">
              +5 since last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center gap-2">
            <Bell className="w-5 h-5" />
            <CardTitle className="text-xl">Client Requests & Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentRequests.map((request) => {
              const Icon = requestIcons[request.request_type];
              return (
                <div key={request.id} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary shrink-0 mt-1">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{request.client_name}</p>
                       <Badge variant={requestStatusVariant[request.status]}>{request.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{format(new Date(request.date), 'PPP')}</p>
                  </div>
                </div>
              )
            })}
             <Button className="w-full mt-2" variant="outline" asChild>
                <Link href="/admin/services">
                    View All Requests <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">Deployed Machine Map</CardTitle>
            <CardDescription>Real-time locations of your devices at client clinics. <Link href="/admin/map" className="text-primary hover:underline">View fullscreen</Link>.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 flex-grow rounded-b-lg overflow-hidden h-[400px]">
             <MapDisplay machines={deployedMachines} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Client Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <ClientDemographicsChart />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Inventory Status</CardTitle>
        </CardHeader>
        <CardContent>
          <InventoryStatusChart />
        </CardContent>
      </Card>
    </div>
  );
}
