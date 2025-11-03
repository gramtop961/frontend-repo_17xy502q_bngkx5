import { motion } from 'framer-motion';
import { Navigation, Star } from 'lucide-react';

export default function ResultsCarousel({ items = [], onSelect, onNavigate }) {
  if (!items.length) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs uppercase tracking-widest text-white/60">Top nearby</p>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {items.slice(0, 5).map((p, idx) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -4 }}
            className="min-w-[280px] max-w-[280px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur"
          >
            <div className="h-40 w-full bg-black/20 overflow-hidden">
              <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white truncate mr-2">{p.name}</h3>
                <span className="text-xs text-white/70">{(p.distance_m/1000).toFixed(2)} km</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/70 mt-1">
                {p.rating ? (
                  <span className="flex items-center gap-1"><Star size={14} className="text-yellow-300" />{p.rating.toFixed(1)}</span>
                ) : <span className="opacity-70">No rating</span>}
                <span>•</span>
                <span className="capitalize">{p.category || 'place'}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onSelect && onSelect(p)}
                  className="flex-1 rounded-full bg-white/10 text-white px-3 py-2 text-sm hover:bg-white/20"
                >
                  Focus
                </button>
                <button
                  onClick={() => onNavigate && onNavigate(p)}
                  className="flex-1 rounded-full bg-white text-black px-3 py-2 text-sm font-semibold hover:bg-white/90 flex items-center justify-center gap-1"
                >
                  <Navigation size={16} /> Go
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
