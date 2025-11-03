import { useMemo, useState } from 'react';
import HeroSection from './components/HeroSection';
import ResultsStack from './components/ResultsStack';
import MapMode from './components/MapMode';
import PricingSection from './components/PricingSection';

function mockResultsFromQuery(query) {
  // Lightweight intent mapping to demonstrate the UI
  const base = [
    {
      id: 1,
      name: 'Midnight Noodles',
      vibe: 'calm • cozy',
      distance: 1.2,
      crowd: 'quiet',
      rating: 4.6,
      fit: 91,
      photo: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
      summary: 'Steamy bowls and hushed lo-fi beats. Great for solo noodle meditations.',
    },
    {
      id: 2,
      name: 'Drip & Read Cafe',
      vibe: 'warm • study',
      distance: 0.8,
      crowd: 'moderate',
      rating: 4.5,
      fit: 84,
      photo: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1200&auto=format&fit=crop',
      summary: 'Quiet corners, friendly light, and plenty of outlets. Ideal for deep focus.',
    },
    {
      id: 3,
      name: 'Blue Hour Lounge',
      vibe: 'ambient • chill',
      distance: 2.7,
      crowd: 'buzzing',
      rating: 4.4,
      fit: 76,
      photo: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1200&auto=format&fit=crop',
      summary: 'Low lights and soft rhythms. A place to unwind without the rush.',
    },
    {
      id: 4,
      name: 'Street Bites Express',
      vibe: 'cheap • fast',
      distance: 0.5,
      crowd: 'lively',
      rating: 4.1,
      fit: 72,
      photo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop',
      summary: 'Quick, tasty, and easy on the wallet. Perfect for hungry-but-broke moments.',
    },
  ];

  const q = (query || '').toLowerCase();
  const adjust = (item) => {
    let fit = item.fit;
    if (q.includes('quiet') || q.includes('study') || q.includes('read')) fit += 6;
    if (q.includes('cheap') || q.includes('broke') || q.includes('fast')) fit += 4;
    if (q.includes('ramen') || q.includes('noodle') || q.includes('🍜')) fit += 8;
    if (q.includes('coffee') || q.includes('☕')) fit += 5;
    return { ...item, fit: Math.min(99, fit) };
  };
  return base.map(adjust).sort((a, b) => b.fit - a.fit);
}

export default function App() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => mockResultsFromQuery(query), [query]);

  const handleSearch = (q) => setQuery(q);

  const handleNavigate = (item) => {
    // Simulate instant navigation by opening maps
    const mapQ = encodeURIComponent(`${item.name}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${mapQ}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-50">
      <HeroSection onSearch={handleSearch} />
      <ResultsStack results={results} onNavigate={handleNavigate} />
      <MapMode results={results} />
      <PricingSection />
      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/60">
        <p>Near Me — Emotion + intent awareness • Living, adaptive map • Fit-for-you ranking</p>
        <p className="mt-2">© {new Date().getFullYear()} Near Me. All rights reserved.</p>
      </footer>
    </div>
  );
}
