import { Search } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [query, setQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[78vh] lg:min-h-[82vh] overflow-hidden bg-white">
      {/* Animated gradient background (no external tokens) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"
      >
        <div className="absolute -inset-[10%] bg-[conic-gradient(at_70%_120%,#dbeafe_0deg,#a5b4fc_120deg,#fecaca_240deg,#dbeafe_360deg)] animate-[spin_20s_linear_infinite] opacity-30" />
      </div>

      {/* Subtle grid overlay for depth */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
      >
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-zinc-300" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900">
            Find the perfect spot near you
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
            Describe a vibe like "cozy cafe" or "quiet ramen". We surface nearby options that match,
            ranked by distance and relevance.
          </p>

          <form onSubmit={onSubmit} className="mt-6">
            <div className="flex items-stretch gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try: plant shop, sunset viewpoint, late-night sushi"
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 backdrop-blur border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 text-zinc-900 placeholder:text-zinc-400 shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl px-4 py-3 bg-zinc-900 text-white font-medium hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60"
              >
                Search
              </button>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              No external tokens needed — this hero is fully local. Scroll down to see features.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
