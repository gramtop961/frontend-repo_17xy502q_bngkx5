import { MapPin, Compass } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-cyan-400 grid place-items-center shadow-sm">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold tracking-tight text-zinc-900">Near Me</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-600">
          <a href="#features" className="hover:text-zinc-900 transition-colors">Features</a>
          <a href="#how" className="hover:text-zinc-900 transition-colors">How it works</a>
          <a href="#contact" className="hover:text-zinc-900 transition-colors">Contact</a>
        </nav>
        <button className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 text-white px-4 py-2 text-sm hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60">
          <Compass className="h-4 w-4" />
          Launch App
        </button>
      </div>
    </header>
  );
}
