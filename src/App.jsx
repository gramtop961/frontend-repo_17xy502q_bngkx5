import { useEffect, useMemo, useState } from 'react';
import SearchBar from './components/SearchBar';
import MapView from './components/MapView';
import ResultsCarousel from './components/ResultsCarousel';
import ErrorBanner from './components/ErrorBanner';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

export default function App() {
  const [coords, setCoords] = useState(null); // [lon, lat]
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Ask for geolocation on mount
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Location services unavailable. Enable location to discover nearby places.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords([longitude, latitude]);
        setError('');
      },
      (err) => {
        setError('We couldn\'t access your location. Please enable location permissions.');
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  }, []);

  // Submit query
  const submitSearch = async (q) => {
    try {
      if (!coords) {
        setError('Waiting for location…');
        return;
      }
      setError('');
      setLoading(true);
      setQuery(q);
      setSelectedId(null);
      const res = await fetch(`${BACKEND_URL}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, lat: coords[1], lon: coords[0], radius_m: 2500 }),
      });
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        setPlaces([]);
        setError('No results found. Try a different vibe or broaden the search.');
      } else {
        // Rank top 5 client-side by distance + tiny keyword score (already scored server-side)
        const ranked = data
          .map((p) => ({ ...p, composite: (1 / Math.max(1, p.distance_m)) * 0.6 + (p.score || 0) * 0.4 }))
          .sort((a, b) => b.composite - a.composite)
          .slice(0, 5);
        setPlaces(ranked);
        setSelectedId(ranked[0]?.id || null);
      }
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onMarkerClick = (id) => {
    setSelectedId(id);
  };

  const selectedPlace = useMemo(() => places.find((p) => p.id === selectedId) || null, [places, selectedId]);

  const handleNavigate = (p) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-50">
      <header className="sticky top-0 z-50 w-full backdrop-blur bg-slate-950/50 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-4">
          <div className="text-sm uppercase tracking-widest text-white/60">Don’t search. Just know.</div>
          <div className="flex-1" />
          <div className="hidden sm:block text-xs text-white/50">Near Me</div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-4">
          <SearchBar onSubmit={submitSearch} disabled={loading} />
          <div className="h-2" />
          <ErrorBanner message={error} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-4 pb-16">
        <MapView
          center={coords}
          markers={places.map((p) => ({ id: p.id, lat: p.lat, lon: p.lon }))}
          selectedId={selectedId}
          onMarkerClick={onMarkerClick}
        />
        <ResultsCarousel
          items={places}
          onSelect={(p) => setSelectedId(p.id)}
          onNavigate={handleNavigate}
        />
        <div className="mt-10 text-center text-white/50 text-sm">
          {loading ? 'Finding places that match your vibe…' : query ? `Showing results for “${query}”` : 'Try a mood like “cozy coffee”, “late-night tacos”, or “quiet place to read”.'}
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/50">
        <p>Near Me — intent-aware local discovery with a living map</p>
      </footer>
    </div>
  );
}
