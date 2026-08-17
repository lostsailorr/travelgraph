import Link from 'next/link';
import { MapPin, Navigation, Map, Heart, Play, ChevronRight, Globe, Star } from 'lucide-react';

export default function Home() {
  const POPULAR_DESTINATIONS = [
    { id: 'paris', name: 'Paris', country: 'France', places: 128 },
    { id: 'london', name: 'London', country: 'United Kingdom', places: 96 },
    { id: 'nyc', name: 'New York', country: 'USA', places: 110 },
    { id: 'tokyo', name: 'Tokyo', country: 'Japan', places: 85 },
    { id: 'rome', name: 'Rome', country: 'Italy', places: 78 }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      
      {/* Navbar */}
      <header className="bg-white px-8 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <Link href="/" className="font-bold text-2xl tracking-tight text-neutral-900">
              Travel<span className="text-indigo-600">Graph</span>
            </Link>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10">
            <Link href="/plan" className="text-sm font-bold text-neutral-900 border-b-2 border-indigo-600 pb-1">Explore</Link>
            <Link href="/plan" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Itinerary</Link>
            <Link href="/plan" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Saved Trips</Link>
            <Link href="/plan" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">About</Link>
          </nav>
          
          <div className="flex items-center gap-6">
            <Link href="/plan" className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900">
              <Globe className="w-4 h-4" /> English
            </Link>
            <Link href="/plan" className="text-neutral-600 hover:text-neutral-900">
              <Heart className="w-5 h-5" />
            </Link>
            <Link href="/plan" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-md shadow-indigo-600/20">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-48 lg:pb-56 bg-neutral-100 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2574&auto=format&fit=crop" 
            alt="Santorini Greece" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
        </div>

        <div className="max-w-[1400px] mx-auto px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-extrabold text-neutral-900 leading-[1.1] tracking-tight mb-6">
              Travel better<br/>through <span className="text-indigo-600">connections</span>
            </h1>
            <p className="text-xl text-neutral-700 mb-10 max-w-lg leading-relaxed font-medium">
              Discover places that match your interests and build smarter day itineraries with the power of graph.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <Link href="/plan" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5">
                <Navigation className="w-5 h-5" /> Start Planning <ChevronRight className="w-5 h-5" />
              </Link>
              <a href="#features" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-neutral-900 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md">
                <Play className="w-5 h-5" /> See How It Works
              </a>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-neutral-200 border-2 border-white overflow-hidden"><img src="https://picsum.photos/seed/user1/100" alt="user" className="w-full h-full object-cover" /></div>
                <div className="w-10 h-10 rounded-full bg-neutral-200 border-2 border-white overflow-hidden"><img src="https://picsum.photos/seed/user2/100" alt="user" className="w-full h-full object-cover" /></div>
                <div className="w-10 h-10 rounded-full bg-neutral-200 border-2 border-white overflow-hidden"><img src="https://picsum.photos/seed/user3/100" alt="user" className="w-full h-full object-cover" /></div>
                <div className="w-10 h-10 rounded-full bg-neutral-200 border-2 border-white overflow-hidden"><img src="https://picsum.photos/seed/user4/100" alt="user" className="w-full h-full object-cover" /></div>
              </div>
              <div>
                <div className="flex text-amber-400 mb-1">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-sm font-bold text-neutral-800">Loved by 24,500+ travelers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Features Bar */}
      <section id="features" className="relative z-20 max-w-[1400px] mx-auto px-8 -mt-24 mb-20 w-full">
        <div className="bg-white rounded-3xl shadow-xl ring-1 ring-neutral-200/50 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            <div className="flex gap-4 lg:px-6 first:pl-0 last:pr-0">
              <div className="text-indigo-600 mt-1"><MapPin className="w-8 h-8" /></div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-2">Smart Recommendations</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">Get recommendations based on your interests and connections.</p>
              </div>
            </div>
            <div className="flex gap-4 lg:px-6 pt-6 md:pt-0">
              <div className="text-indigo-600 mt-1"><Map className="w-8 h-8" /></div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-2">Nearby & Connected</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">Find attractions and restaurants that are close to each other.</p>
              </div>
            </div>
            <div className="flex gap-4 lg:px-6 pt-6 lg:pt-0">
              <div className="text-indigo-600 mt-1"><Navigation className="w-8 h-8" /></div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-2">Optimized Itineraries</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">Build day plans that save time and make the most of your trip.</p>
              </div>
            </div>
            <div className="flex gap-4 lg:px-6 pt-6 lg:pt-0">
              <div className="text-indigo-600 mt-1"><Heart className="w-8 h-8" /></div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-2">Personalized For You</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">The more you explore, the better we personalize your trips.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-[1400px] mx-auto px-8 pb-32 w-full">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-neutral-900">Popular Destinations</h2>
          <Link href="/plan" className="hidden sm:flex items-center text-indigo-600 font-bold hover:text-indigo-700">
            View all destinations <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {POPULAR_DESTINATIONS.map((city) => (
            <Link href="/plan" key={city.id} className="group relative h-96 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`https://picsum.photos/seed/${city.id}/600/800`} 
                alt={city.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
                <p className="text-sm text-neutral-300 font-medium mb-3">{city.country}</p>
                <div className="flex items-center text-xs font-semibold text-white/80 gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> {city.places} places
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
