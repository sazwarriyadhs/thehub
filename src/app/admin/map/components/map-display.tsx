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
    activeMachine?: DeployedMachine | null;
}

export function MapDisplay({ machines, activeMachine }: MapDisplayProps) {
    // We check for machines length > 0 for the initial state.
    // If the user has searched (and machines might be empty), we still want to render the map
    // to show an empty state, unless there were no machines to begin with.
    return (
        <>
            {machines.length > 0 ? (
                <MapView machines={machines} activeMachine={activeMachine} />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center gap-4 p-4">
                    <AlertCircle className="w-16 h-16 text-muted-foreground" />
                    <p className="text-lg font-medium">No Matching Machines Found</p>
                    <p className="text-muted-foreground">
                        Your search did not match any deployed machines, or you have no devices with a 'clientId' assigned.
                    </p>
                </div>
            )}
        </>
    );
}
