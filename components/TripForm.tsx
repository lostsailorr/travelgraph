'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InterestSelector } from './InterestSelector';
import { MapPin, Calendar } from 'lucide-react';

const CITIES = [
  { id: 'mumbai', name: 'Mumbai, India' },
  { id: 'delhi', name: 'Delhi, India' },
  { id: 'paris', name: 'Paris, France' },
  { id: 'london', name: 'London, UK' },
  { id: 'nyc', name: 'New York, USA' },
  { id: 'tokyo', name: 'Tokyo, Japan' },
  { id: 'kyoto', name: 'Kyoto, Japan' },
  { id: 'rome', name: 'Rome, Italy' },
];

const DURATIONS = [
  { id: 'half', label: 'Half Day (4h)', minutes: 240 },
  { id: '1day', label: '1 Day (8h)', minutes: 480 },
  { id: '2days', label: '2 Days (16h)', minutes: 960 },
];

export function TripForm() {
  const router = useRouter();
  const [cityId, setCityId] = useState('');
  const [duration, setDuration] = useState('1day');
  const [customHours, setCustomHours] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityId || interests.length === 0) return;
    setLoading(true);
    
    // Determine actual minutes
    let finalDuration = duration;
    if (duration === 'custom') {
      const hours = parseInt(customHours, 10);
      if (isNaN(hours) || hours <= 0) return;
      finalDuration = `custom_${hours * 60}`;
    }

    // Convert to query params
    const params = new URLSearchParams({
      cityId,
      duration: finalDuration,
      interests: interests.join(','),
    });
    
    router.push(`/recommendations?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl shadow-xl ring-1 ring-neutral-200/50">
      <div className="space-y-4">
        <label className="text-sm font-medium leading-none flex items-center gap-2">
          <MapPin className="h-4 w-4 text-neutral-500" /> Destination
        </label>
        <select 
          required
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
          className="flex h-12 w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="" disabled>Select a city</option>
          {CITIES.map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </div>

      <InterestSelector onSelectionChange={setInterests} />

      <div className="space-y-4">
        <label className="text-sm font-medium leading-none flex items-center gap-2">
          <Calendar className="h-4 w-4 text-neutral-500" /> Trip duration
        </label>
        <div className="flex flex-wrap gap-3">
          {DURATIONS.map(dur => (
            <button
              key={dur.id}
              type="button"
              onClick={() => setDuration(dur.id)}
              className={`
                flex-1 flex justify-center items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ring-1
                ${duration === dur.id 
                  ? 'bg-neutral-900 text-white ring-neutral-900' 
                  : 'bg-white text-neutral-600 ring-neutral-200 hover:bg-neutral-50'
                }
              `}
            >
              {dur.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setDuration('custom')}
            className={`
              flex-1 flex justify-center items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ring-1
              ${duration === 'custom' 
                ? 'bg-neutral-900 text-white ring-neutral-900' 
                : 'bg-white text-neutral-600 ring-neutral-200 hover:bg-neutral-50'
              }
            `}
          >
            Custom
          </button>
        </div>
        
        {duration === 'custom' && (
          <div className="mt-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <input
              type="number"
              min="1"
              max="720"
              placeholder="Enter total hours..."
              value={customHours}
              onChange={(e) => setCustomHours(e.target.value)}
              className="flex-1 h-12 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm ring-offset-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2"
              required
            />
            <span className="text-sm font-medium text-neutral-500">hours</span>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!cityId || interests.length === 0 || loading || (duration === 'custom' && !customHours)}
        className="w-full flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Finding connections...
          </span>
        ) : (
          "Find Places →"
        )}
      </button>
    </form>
  );
}
