import { motion } from 'framer-motion';
import { Navigation, Star, Waves } from 'lucide-react';

function FitRing({ percent = 82 }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const bg = `conic-gradient(#60a5fa ${clamped * 3.6}deg, rgba(255,255,255,0.12) ${clamped * 3.6}deg)`;
  return (
    <div className="relative h-14 w-14">
      <div className="absolute inset-0 rounded-full" style={{ background: bg }} />
      <div className="absolute inset-1 rounded-full bg-white/90 flex items-center justify-center text-xs font-semibold text-slate-800">
        {clamped}%
      </div>
    </div>
  );
}

function ResultCard({ item, index, onNavigate }) {
  const delay = index * 0.06;
  return (
    <motion.div
      initial={{ y: 30, opacity: 0, rotate: -1.5 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22, delay }}
      className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-lg"
    >
      <div className="grid gap-4 p-5 sm:grid-cols-[1.2fr_1fr]">
        <div className="flex items-start gap-4">
          <img src={item.photo} alt="" className="h-24 w-24 rounded-2xl object-cover" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{item.vibe}</span>
            </div>
            <div className="mt-1 flex items-center gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1"><Navigation size={14} /> {item.distance} km</span>
              <span className="inline-flex items-center gap-1"><Waves size={14} /> {item.crowd}</span>
              <span className="inline-flex items-center gap-1"><Star size={14} className="text-amber-500" /> {item.rating}</span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-slate-600">{item.summary}</p>
          </div>
        </div>
        <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center sm:gap-3">
          <FitRing percent={item.fit} />
          {index === 0 ? (
            <button
              onClick={() => onNavigate?.(item)}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90"
            >
              Just Take Me There
            </button>
          ) : (
            <div className="rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-600">Hold to deep-dive</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ResultsStack({ results = [], onNavigate }) {
  if (!results.length) return null;
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Perfect matches</h2>
        <p className="text-sm text-slate-600">Ranked by fit-for-intent</p>
      </div>
      <div className="flex flex-col gap-4">
        {results.slice(0, 5).map((item, i) => (
          <ResultCard key={item.id} item={item} index={i} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}
