'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DivIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';
import Link from 'next/link';
import type { DeployedMachine } from '@/types';
import { SquareTerminal } from 'lucide-react';

const customIcon = () => new DivIcon({
  html: renderToString(
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg ring-2 ring-primary-foreground">
      <SquareTerminal className="h-5 w-5 text-primary-foreground" />
    </div>
  ),
  className: 'bg-transparent border-0',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

type MapViewProps = {
  machines?: DeployedMachine[];
};

export default function MapView({ machines = [] }: MapViewProps) {
  // Default center of the map (e.g., around Indonesia)
  const mapCenter: [number, number] = [-2.5489, 118.0149];

  return (
    <MapContainer
      center={mapCenter}
      zoom={5}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {machines.map((machine) => (
        <Marker
          key={machine.id}
          position={[machine.location.lat, machine.location.lng]}
          icon={customIcon()}
        >
          <Popup>
            <div className="font-sans">
              <h3 className="font-bold text-base mb-1">{machine.name}</h3>
              <div className="text-sm text-muted-foreground mb-1">
                <span className="font-medium text-foreground">Client:</span> {machine.clientName}
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                {machine.location.address}
              </div>
              <Link
                href={`/admin/inventory/${machine.id}`}
                className="text-primary text-sm font-medium hover:underline"
              >
                View Machine Details
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
