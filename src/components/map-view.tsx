'use client';

import { useEffect, useRef } from 'react';
import type { DeployedMachine } from '@/types';

// OpenLayers
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import Overlay from 'ol/Overlay';
import { X } from 'lucide-react';

type MapViewProps = {
  machines?: DeployedMachine[];
  activeMachine?: DeployedMachine | null;
};

export default function MapView({ machines = [], activeMachine }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorLayerRef = useRef<VectorLayer<VectorSource<Point>> | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const popupContentRef = useRef<HTMLDivElement>(null);
  const popupCloserRef = useRef<HTMLButtonElement>(null);

  const mapCenter: [number, number] = [118.0149, -2.5489]; // [lon, lat]

  // Effect for initializing the map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) { // Only run if map not initialized
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
          image: new Circle({
            radius: 7,
            fill: new Fill({ color: 'hsl(var(--primary))' }),
            stroke: new Stroke({ color: 'hsl(var(--primary-foreground))', width: 2 }),
          }),
        }),
      });
      vectorLayerRef.current = vectorLayer;

      const popupOverlay = new Overlay({
        element: popupRef.current!,
        autoPan: { animation: { duration: 250 } },
        offset: [0, -15],
        positioning: 'bottom-center'
      });
      
      const map = new Map({
        target: mapRef.current!,
        layers: [
          new TileLayer({ source: new OSM() }),
          vectorLayer
        ],
        view: new View({
          center: fromLonLat(mapCenter),
          zoom: 5,
        }),
        overlays: [popupOverlay],
      });

      mapInstanceRef.current = map;

      map.on('click', (event) => {
        const feature = map.forEachFeatureAtPixel(event.pixel, f => f);
        popupOverlay.setPosition(undefined); // Close existing popups on any click
        
        if (feature) {
          const machine = feature.get('machineData') as DeployedMachine;
          const coordinates = (feature.getGeometry() as Point).getCoordinates();
          if (popupContentRef.current) {
              popupContentRef.current.innerHTML = `
                <h3 class="font-bold text-base mb-1">${machine.name}</h3>
                <div class="text-sm text-muted-foreground mb-1">
                  <span class="font-medium text-foreground">Client:</span> ${machine.clientName}
                </div>
                <div class="text-xs text-muted-foreground mb-2">${machine.location.address}</div>
                <a href="/admin/inventory/${machine.id}" class="text-primary text-sm font-medium hover:underline">
                  View Machine Details
                </a>
              `;
          }
          popupOverlay.setPosition(coordinates);
        }
      });

      if (popupCloserRef.current) {
        popupCloserRef.current.onclick = () => {
          popupOverlay.setPosition(undefined);
          popupCloserRef.current?.blur();
          return false;
        };
      }
    }

    // Cleanup function on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once on mount and unmount

  // Effect for updating markers when machines prop changes
  useEffect(() => {
    if (vectorLayerRef.current) {
      const vectorSource = vectorLayerRef.current.getSource();
      if (vectorSource) {
        vectorSource.clear(); // Clear existing markers
        const features = machines.map(machine => new Feature({
          geometry: new Point(fromLonLat([machine.location.lng, machine.location.lat])),
          machineData: machine,
        }));
        vectorSource.addFeatures(features);
      }
    }
  }, [machines]); // Re-run when machines array changes

  // Effect for panning to active machine
  useEffect(() => {
      if (mapInstanceRef.current && activeMachine) {
          const view = mapInstanceRef.current.getView();
          view.animate({
              center: fromLonLat([activeMachine.location.lng, activeMachine.location.lat]),
              zoom: 14,
              duration: 1000,
          });
      }
  }, [activeMachine]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full bg-muted" />
      {/* 
        The popup element is positioned by OpenLayers, but styled with Tailwind.
        It's hidden by default because it has no position.
      */}
      <div ref={popupRef} className="bg-card text-card-foreground rounded-lg shadow-xl border w-64 p-3 relative before:content-[''] before:absolute before:border-t-card before:border-t-8 before:border-x-8 before:border-x-transparent before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2">
          <button ref={popupCloserRef} className="absolute top-1 right-1 p-1 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
          <div ref={popupContentRef}></div>
      </div>
    </div>
  );
}
