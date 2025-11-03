import Spline from "@splinetool/react-spline";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [query, setQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    // For now, simply scroll to features with the current query reflected in the URL hash
    const url = new URL(window.location.href);
    url.hash = `features?q=${encodeURIComponent(query.trim())}`;
    window.history.replaceState({}, "Near Me", url.toString());
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[78vh] lg:min-h-[82vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/1Q4yq0P7c7g1vQwq/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* subtle gradient overlay to enhance contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900">
            Find the perfect spot near you
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
            Type a vibe like "cozy cafe" or "quiet ramen". We rank nearby places by distance and
            relevance so you can decide fast.
          </p>

          <form onSubmit={onSubmit} className="mt-6">
            <div className="flex items-stretch gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try: plants shop, sunset viewpoint, late-night sushi"
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/80 backdrop-blur border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 text-zinc-900 placeholder:text-zinc-400"
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
              Pro tip: allow location in your browser for more accurate results.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
