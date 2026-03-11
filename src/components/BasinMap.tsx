import { useEffect, useRef } from 'react';
import { Basin } from '@/lib/types';
import { BASINS } from '@/lib/basins';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface BasinMapProps {
  selectedBasin: Basin;
  onBasinSelect: (id: string) => void;
}

export function BasinMap({ selectedBasin, onBasinSelect }: BasinMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [selectedBasin.lat, selectedBasin.lng],
      zoom: selectedBasin.zoom,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add markers for all basins
    BASINS.forEach((basin) => {
      const isSelected = basin.id === selectedBasin.id;
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: ${isSelected ? '16px' : '10px'};
          height: ${isSelected ? '16px' : '10px'};
          background: ${isSelected ? '#2dd4bf' : '#2dd4bf80'};
          border: 2px solid ${isSelected ? '#2dd4bf' : '#2dd4bf40'};
          border-radius: 50%;
          box-shadow: ${isSelected ? '0 0 12px #2dd4bf80' : 'none'};
          transition: all 0.3s;
        "></div>`,
        iconSize: [isSelected ? 16 : 10, isSelected ? 16 : 10],
        iconAnchor: [isSelected ? 8 : 5, isSelected ? 8 : 5],
      });

      const marker = L.marker([basin.lat, basin.lng], { icon })
        .addTo(map)
        .bindTooltip(basin.name, {
          className: 'leaflet-tooltip-custom',
          direction: 'top',
          offset: [0, -10],
        });

      marker.on('click', () => onBasinSelect(basin.id));
      markersRef.current.push(marker);
    });

    // Fly to selected basin
    map.flyTo([selectedBasin.lat, selectedBasin.lng], selectedBasin.zoom, {
      duration: 1.5,
    });
  }, [selectedBasin, onBasinSelect]);

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="text-[10px] text-muted-foreground font-mono px-3 py-1.5 bg-card border-b border-border tracking-wider">
        ▸ HAVZA HARİTASI — {selectedBasin.countries.join(' / ')}
      </div>
      <div ref={mapRef} className="h-[200px] w-full" />
    </div>
  );
}
