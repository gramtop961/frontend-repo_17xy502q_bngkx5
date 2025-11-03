import { MapPin, Sparkles, Navigation, Star } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Intent-aware search",
    desc: "Describe the vibe in plain language. We'll parse it into real-world categories and tags.",
  },
  {
    icon: MapPin,
    title: "Live map",
    desc: "A smooth map backdrop so you can keep your bearings while browsing options.",
  },
  {
    icon: Navigation,
    title: "One-tap go",
    desc: "Jump to your preferred navigation app instantly with accurate coordinates.",
  },
  {
    icon: Star,
    title: "Smart ranking",
    desc: "We weigh distance and relevance so the closest good options show up first.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
            What makes it fast to decide
          </h2>
          <p className="mt-2 text-zinc-600">
            Everything you need to discover nearby places without the rabbit hole.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-zinc-200 p-6 bg-white/80 backdrop-blur hover:shadow-sm transition-shadow"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-cyan-400 flex items-center justify-center">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-4 font-medium text-zinc-900">{title}</h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
