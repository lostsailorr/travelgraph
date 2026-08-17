'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, ArrowLeft, Navigation, Clock, Trash2, MapPin } from 'lucide-react';

export default function SavedTripsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [savedTrips, setSavedTrips] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const trips = JSON.parse(localStorage.getItem('travelgraph_saved_trips') || '[]');
    // Sort by newest first
    trips.sort((a: any, b: any) => b.createdAt - a.createdAt);
    setSavedTrips(trips);
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newTrips = savedTrips.filter(t => t.id !== id);
    setSavedTrips(newTrips);
    localStorage.setItem('travelgraph_saved_trips', JSON.stringify(newTrips));
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <header className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>
          <div className="font-bold text-xl tracking-tight text-neutral-950">
            TravelGraph
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-12 mx-auto max-w-5xl w-full">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-neutral-900 mb-2">Saved Trips</h1>
          <p className="text-neutral-500 text-lg">Your customized itineraries ready for travel.</p>
        </div>

        {savedTrips.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-sm mt-12">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">No Saved Trips Yet</h3>
            <p className="text-neutral-500 mb-8">When you generate a graph-optimized itinerary, you can save it here to view later.</p>
            <Link href="/plan" className="inline-flex justify-center rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors">
              Create a New Trip
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedTrips.map(trip => {
              const totalStops = trip.itinerary.length;
              let totalTravelTime = 0;
              trip.itinerary.forEach((stop: any) => {
                totalTravelTime += (stop.travelTimeFromPrevious || 0);
              });
              
              const date = new Date(trip.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              });

              return (
                <Link 
                  href={`/saved/${trip.id}`} 
                  key={trip.id}
                  className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group relative block"
                >
                  <button 
                    onClick={(e) => handleDelete(trip.id, e)}
                    className="absolute top-6 right-6 p-2 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete trip"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    {trip.cityId.charAt(0).toUpperCase() + trip.cityId.slice(1)} Trip
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neutral-900 mb-1 line-clamp-1">
                    Starting at {trip.startPlace}
                  </h3>
                  <div className="text-sm text-neutral-500 mb-6">Saved on {date}</div>
                  
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5">
                      <Bookmark className="w-4 h-4 text-neutral-500" />
                      {totalStops} stops
                    </div>
                    {totalTravelTime > 0 && (
                      <div className="bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5">
                        <Navigation className="w-4 h-4 text-neutral-500" />
                        {totalTravelTime} mins walking
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
