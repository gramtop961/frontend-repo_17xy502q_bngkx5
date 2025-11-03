import { useMemo } from 'react';

export default function MapMode({ results = [] }) {
  const circles = useMemo(() => {
    // Position pseudo-randomly but deterministically from id
    return results.map((r, idx) => {
      const seed = (r.id || idx) * 12.345;
      const x = 10 + ((seed * 7) % 80); // 10% - 90%
      const y = 15 + ((seed * 13) % 65); // 15% - 80%
      const size = 16 + (r.fit / 100) * 40; // 16 - 56
      const glow = `rgba(99, 102, 241, ${0.25 + r.fit / 300})`;
      const fill = `rgba(56, 189, 248, ${0.3 + r.fit / 300})`;
      return { x, y, size, glow, fill, name: r.name };
    });
  }, [results]);

  if (!results.length) return null;

  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-14">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Map mode</h2>
        <p className="text-sm text-slate-600">Orbs sized by match score</p>
      </div>
      <div className="relative h-80 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100">
        {/* simple orb visualization */}
        {circles.map((c, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[180%] w-[180%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
              style={{ background: c.glow }}
            />
            <div
              title={c.name}
              className="flex items-center justify-center rounded-full border border-white/60 shadow-inner"
              style={{ width: c.size, height: c.size, background: c.fill }}
            >
              <span className="pointer-events-none select-none px-2 text-xs font-medium text-slate-700 truncate max-w-[100px]">
                {c.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
