import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

export default function MapView({ center, markers = [], selectedId, onMarkerClick }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRefs = useRef({});

  // Init map
  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: center || [0, 0],
      zoom: center ? 13 : 2,
      pitch: 45,
      bearing: -10,
      cooperativeGestures: true,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }));

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update center
  useEffect(() => {
    if (!mapRef.current || !center) return;
    mapRef.current.flyTo({ center, zoom: 14, speed: 0.8, curve: 1.4, essential: true });
  }, [center]);

  // Update markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove obsolete markers
    const ids = new Set(markers.map((m) => m.id));
    for (const id in markerRefs.current) {
      if (!ids.has(id)) {
        markerRefs.current[id].remove();
        delete markerRefs.current[id];
      }
    }

    // Add/update markers
    markers.forEach((m) => {
      if (!markerRefs.current[m.id]) {
        const el = document.createElement('div');
        el.className = 'nm-pin';
        el.innerHTML = `\n          <div class="nm-pin-outer"></div>\n          <div class="nm-pin-inner"></div>\n        `;
        el.style.cursor = 'pointer';
        el.onclick = () => onMarkerClick && onMarkerClick(m.id);

        const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([m.lon, m.lat])
          .addTo(mapRef.current);
        markerRefs.current[m.id] = marker;
      } else {
        markerRefs.current[m.id].setLngLat([m.lon, m.lat]);
      }
    });
  }, [markers, onMarkerClick]);

  // Highlight selected marker
  useEffect(() => {
    if (!mapRef.current) return;
    Object.values(markerRefs.current).forEach((marker) => {
      const el = marker.getElement();
      el.classList.remove('nm-pin-selected');
    });
    if (selectedId && markerRefs.current[selectedId]) {
      const el = markerRefs.current[selectedId].getElement();
      el.classList.add('nm-pin-selected');
      const ll = markerRefs.current[selectedId].getLngLat();
      mapRef.current.flyTo({ center: [ll.lng, ll.lat], zoom: 15, speed: 0.8 });
    }
  }, [selectedId]);

  return (
    <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden border border-white/10">
      <div ref={mapContainer} className="absolute inset-0" />
      <style>{`
        .nm-pin { position: relative; width: 24px; height: 24px; }
        .nm-pin-outer { position: absolute; width: 24px; height: 24px; border-radius: 9999px; background: rgba(59,130,246,0.25); animation: nm-pulse 2s infinite; }
        .nm-pin-inner { position: absolute; left: 6px; top: 6px; width: 12px; height: 12px; border-radius: 9999px; background: #60a5fa; box-shadow: 0 0 0 2px rgba(255,255,255,0.5); }
        .nm-pin-selected .nm-pin-inner { background: #fff; box-shadow: 0 0 0 3px rgba(96,165,250,0.7); }
        @keyframes nm-pulse { 0% { transform: scale(0.9); opacity: 0.7;} 70% { transform: scale(1.3); opacity: 0;} 100% { transform: scale(0.9); opacity: 0; }}
      `}</style>
    </div>
  );
}
