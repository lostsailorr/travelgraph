'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InterestSelector } from './InterestSelector';
import { Search, Clock, ChevronRight } from 'lucide-react';

const CITIES = [
  { id: 'mumbai', name: 'Mumbai', country: 'India', img: 'mumbai' },
  { id: 'delhi', name: 'Delhi', country: 'India', img: 'delhi' },
  { id: 'paris', name: 'Paris', country: 'France', img: 'paris' },
  { id: 'london', name: 'London', country: 'UK', img: 'london' },
  { id: 'nyc', name: 'New York', country: 'USA', img: 'nyc' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', img: 'tokyo' },
  { id: 'kyoto', name: 'Kyoto', country: 'Japan', img: 'kyoto' },
  { id: 'rome', name: 'Rome', country: 'Italy', img: 'rome' },
  { id: 'goa', name: 'Goa', country: 'India', img: 'goa' },
  { id: 'bihar', name: 'Bihar', country: 'India', img: 'bihar' },
  { id: 'uttarakhand', name: 'Uttarakhand', country: 'India', img: 'uttarakhand' },
];

const DURATIONS = [
  { id: 'half', label: 'Half Day', sub: 'Up to 5 hours', icon: '⏱️' },
  { id: '1day', label: '1 Day', sub: 'A full day adventure', icon: '🎒' },
  { id: '2days', label: '2 Days', sub: 'Explore more deeply', icon: '🗺️' },
  { id: '3days', label: '3 Days', sub: 'The full experience', icon: '✈️' },
];

export function TripForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [cityId, setCityId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [duration, setDuration] = useState('1day');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const filteredCities = CITIES.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    if (!cityId || interests.length === 0) return;
    setLoading(true);
    
    let finalDuration = duration;
    if (duration === 'custom') {
      if (!startTime || !endTime) return;
      const start = new Date(startTime).getTime();
      const end = new Date(endTime).getTime();
      if (isNaN(start) || isNaN(end) || end <= start) return;
      
      const diffMinutes = Math.floor((end - start) / (1000 * 60));
      finalDuration = `custom_${diffMinutes}`;
    }

    const params = new URLSearchParams({
      cityId,
      duration: finalDuration,
      interests: interests.join(','),
    });
    
    router.push(`/recommendations?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl ring-1 ring-neutral-200/50 w-full max-w-2xl mx-auto">
      
      {/* Step Progress indicator */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className={`h-2.5 w-2.5 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-neutral-200'}`} />
        <div className={`h-1 w-12 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-neutral-200'}`} />
        <div className={`h-2.5 w-2.5 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-neutral-200'}`} />
        <div className={`h-1 w-12 rounded-full ${step >= 3 ? 'bg-indigo-600' : 'bg-neutral-200'}`} />
        <div className={`h-2.5 w-2.5 rounded-full ${step >= 3 ? 'bg-indigo-600' : 'bg-neutral-200'}`} />
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-neutral-900">Where are you going?</h2>
            <p className="text-neutral-500">Choose your destination city</p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input 
              type="text"
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all text-neutral-900 placeholder:text-neutral-400"
            />
          </div>

          <div>
            <h3 className="text-sm font-bold text-neutral-700 mb-4 uppercase tracking-wider">Popular Cities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-80 overflow-y-auto p-1">
              {filteredCities.map(city => (
                <button
                  key={city.id}
                  onClick={() => setCityId(city.id)}
                  className={`relative h-32 rounded-2xl overflow-hidden group border-2 transition-all text-left ${cityId === city.id ? 'border-indigo-600 shadow-md scale-[1.02]' : 'border-transparent hover:scale-[1.02]'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://picsum.photos/seed/${city.id}/400/400`} alt={city.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="font-bold">{city.name}</div>
                    <div className="text-xs text-neutral-300">{city.country}</div>
                  </div>
                  {cityId === city.id && (
                    <div className="absolute top-2 right-2 bg-indigo-600 rounded-full p-1 shadow-sm">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!cityId}
            className="w-full mt-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            Next: Pick Interests <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
          <div className="flex items-center mb-2">
            <button onClick={() => setStep(1)} className="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-neutral-900">What are you interested in?</h2>
            <p className="text-neutral-500">Select up to 5 interests</p>
          </div>

          <InterestSelector onSelectionChange={setInterests} />

          <button
            onClick={() => setStep(3)}
            disabled={interests.length === 0}
            className="w-full mt-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            Next: Duration <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
          <div className="flex items-center mb-2">
            <button onClick={() => setStep(2)} className="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-neutral-900">How much time do you have?</h2>
            <p className="text-neutral-500">Choose your trip duration</p>
          </div>

          <div className="space-y-3">
            {DURATIONS.map(dur => (
              <button
                key={dur.id}
                type="button"
                onClick={() => setDuration(dur.id)}
                className={`w-full flex items-center p-4 rounded-2xl border-2 text-left transition-all ${duration === dur.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-neutral-100 hover:border-neutral-200 bg-white'}`}
              >
                <div className="text-3xl mr-4">{dur.icon}</div>
                <div className="flex-1">
                  <div className={`font-bold text-lg ${duration === dur.id ? 'text-indigo-900' : 'text-neutral-900'}`}>{dur.label}</div>
                  <div className="text-neutral-500 text-sm">{dur.sub}</div>
                </div>
                {duration === dur.id && (
                  <div className="bg-indigo-600 rounded-full p-1 shadow-sm">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                )}
              </button>
            ))}
            
            <button
              type="button"
              onClick={() => setDuration('custom')}
              className={`w-full flex items-center p-4 rounded-2xl border-2 text-left transition-all ${duration === 'custom' ? 'border-indigo-600 bg-indigo-50/50' : 'border-neutral-100 hover:border-neutral-200 bg-white'}`}
            >
              <div className="text-3xl mr-4">⚙️</div>
              <div className="flex-1">
                <div className={`font-bold text-lg ${duration === 'custom' ? 'text-indigo-900' : 'text-neutral-900'}`}>Custom</div>
                <div className="text-neutral-500 text-sm">Set your own timeframe</div>
              </div>
              {duration === 'custom' && (
                <div className="bg-indigo-600 rounded-full p-1 shadow-sm">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
            </button>
          </div>

          {duration === 'custom' && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-700 flex items-center gap-1"><Clock className="h-4 w-4"/> Start Time</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full h-12 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 ring-offset-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-700 flex items-center gap-1"><Clock className="h-4 w-4"/> End Time</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full h-12 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 ring-offset-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || (duration === 'custom' && (!startTime || !endTime))}
            className="w-full mt-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
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
        </div>
      )}
    </div>
  );
}
