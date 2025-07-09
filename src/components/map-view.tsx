'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export function MapView() {
  // The Vis.GL map component would be used here, but requires an API key.
  // This placeholder is shown instead.
  // Example usage would be:
  // import {APIProvider, Map} from '@vis.gl/react-google-maps';
  // <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
  //   <Map center={{lat: 34.0522, lng: -118.2437}} zoom={12} className="w-full h-[600px] rounded-lg" />
  // </APIProvider>

  return (
    <Card className="w-full h-[600px]">
      <CardHeader>
        <CardTitle>Map Unavailable</CardTitle>
      </CardHeader>
      <CardContent className="h-full flex flex-col items-center justify-center text-center gap-4">
        <MapPin className="w-16 h-16 text-muted-foreground" />
        <p className="text-lg font-medium">The map feature is not yet configured.</p>
        <p className="text-muted-foreground">
          Please provide a Google Maps API key in your environment variables to enable this feature.
        </p>
      </CardContent>
    </Card>
  );
}
