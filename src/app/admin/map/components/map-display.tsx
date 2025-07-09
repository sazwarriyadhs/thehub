'use client';

import type { DeployedMachine } from '@/types';
import dynamic from 'next/dynamic';
import { AlertCircle } from 'lucide-react';

const MapView = dynamic(() => import('@/components/map-view'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center"><p>Loading map...</p></div>
});

type MapDisplayProps = {
    machines: DeployedMachine[];
}

export function MapDisplay({ machines }: MapDisplayProps) {
    return (
        <>
            {machines.length > 0 ? (
                <MapView machines={machines} />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center gap-4">
                    <AlertCircle className="w-16 h-16 text-muted-foreground" />
                    <p className="text-lg font-medium">No Deployed Machines Found</p>
                    <p className="text-muted-foreground">
                        Assign a 'clientId' to your devices in the inventory data to see them on the map.
                    </p>
                </div>
            )}
        </>
    );
}
