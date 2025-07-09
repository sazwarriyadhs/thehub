'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import Link from 'next/link';
import type { DeployedMachine } from '@/types';

// Fix for default icon issue with webpack
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type MapViewProps = {
  machines: DeployedMachine[];
};

export default function MapView({ machines }: MapViewProps) {
  // Default center of the map (e.g., around Indonesia)
  const mapCenter: [number, number] = [-2.5489, 118.0149];

  return (
    <MapContainer
      center={mapCenter}
      zoom={5}
      scrollWheelZoom={true}
      className="w-full h-[600px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {machines.map((machine) => (
        <Marker
          key={machine.id}
          position={[machine.location.lat, machine.location.lng]}
          icon={customIcon}
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
