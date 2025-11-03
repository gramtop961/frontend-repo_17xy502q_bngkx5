import { useState } from 'react';
import { Search, Mic } from 'lucide-react';

export default function SearchBar({ onSubmit, disabled }) {
  const [value, setValue] = useState("");
  const [listening, setListening] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value.trim());
  };

  const startVoice = () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return;
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.interimResults = false;
      setListening(true);
      rec.onresult = (e) => {
        const transcript = Array.from(e.results)
          .map(r => r[0])
          .map(r => r.transcript)
          .join(' ');
        setValue(transcript);
        onSubmit(transcript);
      };
      rec.onend = () => setListening(false);
      rec.start();
    } catch (e) {
      setListening(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
        <input
          className="w-full rounded-full bg-white/10 backdrop-blur px-5 py-3 pl-12 pr-24 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
          placeholder="What do you feel like? e.g., quiet ramen near me"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={18} />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <button
            type="button"
            onClick={startVoice}
            className={`rounded-full px-3 py-1.5 text-xs font-medium ${listening ? 'bg-white text-black' : 'bg-white/10 text-white'} border border-white/10 hover:bg-white/20`}
            disabled={disabled}
            aria-label="Voice search"
          >
            <Mic size={14} className="inline-block mr-1" /> Speak
          </button>
          <button
            type="submit"
            className="rounded-full bg-white text-black px-4 py-1.5 text-xs font-semibold hover:bg-white/90"
            disabled={disabled}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
