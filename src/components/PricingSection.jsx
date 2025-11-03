import { Check, Crown, Zap } from 'lucide-react';

function Tier({ name, price, tagline, features, highlight }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border ${
        highlight ? 'border-indigo-300 bg-white shadow-xl shadow-indigo-200/40' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="p-6">
        <div className="mb-2 flex items-center gap-2">
          {name === 'Elite' ? <Crown className="text-amber-500" /> : name === 'Pro' ? <Zap className="text-indigo-500" /> : null}
          <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
        </div>
        <div className="mb-3">
          <span className="text-3xl font-bold text-slate-900">{price}</span>
          <span className="text-slate-500">/mo</span>
        </div>
        <p className="mb-5 text-sm text-slate-600">{tagline}</p>
        <ul className="mb-6 space-y-2">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
              <Check size={16} className="mt-0.5 text-emerald-500" /> {f}
            </li>
          ))}
        </ul>
        <button className={`w-full rounded-xl px-4 py-2 text-sm font-semibold shadow ${
          highlight ? 'bg-slate-900 text-white hover:opacity-90' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
        }`}>
          Get {name}
        </button>
      </div>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">Simple, flexible pricing</h2>
        <p className="mt-2 text-slate-600">Start free. Upgrade when you want real-time crowd & mood data.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Tier
          name="Free"
          price="$0"
          tagline="Core search, personalized suggestions, light ads"
          features={[
            'Intent-aware local search',
            '3 perfect matches per query',
            'Adaptive map mode',
          ]}
        />
        <Tier
          name="Pro"
          price="$6.99"
          tagline="Ad-free, real-time crowd & mood data, offline mode"
          features={[
            'Ad-free experience',
            'Live crowd density & vibe',
            'Offline mode',
          ]}
          highlight
        />
        <Tier
          name="Elite"
          price="$14.99"
          tagline="Predictive planner, group sync, itinerary AI"
          features={[
            'Predictive planner',
            'Group sync & shared vibes',
            'Crowd forecasting',
          ]}
        />
      </div>
    </section>
  );
}
