'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapDisplay } from './map-display';
import type { DeployedMachine } from '@/types';
import { Search, X } from 'lucide-react';

type MapPageClientProps = {
  initialMachines: DeployedMachine[];
};

export function MapPageClient({ initialMachines }: MapPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMachine, setActiveMachine] = useState<DeployedMachine | null>(null);

  const filteredMachines = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      return initialMachines;
    }
    return initialMachines.filter(machine =>
      machine.clientName.toLowerCase().includes(query) ||
      machine.name.toLowerCase().includes(query) ||
      machine.location.address.toLowerCase().includes(query)
    );
  }, [searchQuery, initialMachines]);

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      // If there's one result, pan to it. Otherwise, do nothing.
      if (filteredMachines.length === 1) {
          setActiveMachine(filteredMachines[0]);
      } else {
          setActiveMachine(null); // Clear active machine if multiple or no results
      }
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveMachine(null);
  };

  return (
    <div className="flex flex-col gap-4">
        <form onSubmit={handleSearch}>
            <div className="flex gap-2">
                <Input
                    type="search"
                    placeholder="Search by client, machine, or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow"
                />
                 {searchQuery && (
                    <Button variant="ghost" size="icon" onClick={handleClearSearch} type="button" aria-label="Clear search">
                        <X className="h-4 w-4" />
                    </Button>
                )}
                <Button type="submit">
                    <Search className="mr-2 h-4 w-4" /> Search
                </Button>
            </div>
      </form>

      <Card>
        <CardContent className="p-0 overflow-hidden rounded-lg h-[600px]">
          <MapDisplay machines={filteredMachines} activeMachine={activeMachine} />
        </CardContent>
      </Card>
    </div>
  );
}
