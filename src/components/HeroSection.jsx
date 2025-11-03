import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Mic, Search, MapPin } from 'lucide-react';

export default function HeroSection({ onSearch }) {
  const [input, setInput] = useState('🍜 quiet ramen spot');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Basic voice input using Web Speech API if available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setInput(text);
        onSearch?.(text);
        setListening(false);
      };
      recognition.onend = () => setListening(false);
      recognition.onerror = () => setListening(false);
      recognitionRef.current = recognition;
    }
  }, [onSearch]);

  const startVoice = () => {
    if (!recognitionRef.current) return;
    try {
      setListening(true);
      recognitionRef.current.start();
    } catch (e) {
      setListening(false);
    }
  };

  const quickPills = [
    '☕ cozy cafe',
    '🌮 late-night tacos',
    '🧘 quiet place to read',
    '🎶 live music near me',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(input);
  };

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden">
      {/* 3D Spline cover */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/g5OaHmrKTDxRI7Ig/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Ambient gradient overlay - does not block interaction */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center px-6 pt-24 sm:pt-28 md:pt-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs text-white/80 backdrop-blur">
          <MapPin size={14} />
          <span>Near Me — Emotionally aware local discovery</span>
        </div>
        <h1 className="text-center text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          Don’t search. <span className="bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">Just know.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-center text-white/80">
          Ask with an emoji, a vibe, or a whisper. We’ll find the perfect spot around you — tuned to your mood, time, and purpose.
        </p>

        {/* Input bar */}
        <form onSubmit={handleSubmit} className="mt-8 w-full max-w-3xl">
          <div className="group relative flex items-center overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur">
            <div className="pl-4 text-white/80">
              <Search size={18} />
            </div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Search places near me"
              placeholder="What do you feel like? (e.g., 🍜 quiet ramen spot)"
              className="w-full bg-transparent px-3 py-4 text-white placeholder-white/50 outline-none"
            />
            <button
              type="button"
              onClick={startVoice}
              title="Voice search"
              className={`mr-2 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                listening ? 'bg-emerald-400/20 text-emerald-200' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Mic size={16} />
              <span className="hidden sm:inline">{listening ? 'Listening…' : 'Speak'}</span>
            </button>
            <button
              type="submit"
              className="mr-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
            >
              Find
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {quickPills.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  setInput(q);
                  onSearch?.(q);
                }}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur hover:bg-white/15"
              >
                {q}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}
