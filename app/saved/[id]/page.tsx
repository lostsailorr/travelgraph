'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { InteractiveItinerary } from '../../../components/InteractiveItinerary';

export default function SavedTripViewPage({ params }: { params: { id: string } }) {
  const [trip, setTrip] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const { id } = params;

  useEffect(() => {
    setMounted(true);
    const existing = JSON.parse(localStorage.getItem('travelgraph_saved_trips') || '[]');
    const found = existing.find((t: any) => t.id === id);
    if (found) {
      setTrip(found);
    }
  }, [id]);

  if (!mounted) return null;

  if (!trip) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center max-w-xl w-full shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Trip Not Found</h3>
          <p className="text-neutral-500 mb-6">We couldn&apos;t find this saved trip. It may have been deleted.</p>
          <Link href="/saved" className="inline-flex justify-center rounded-xl bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800">
            Back to Saved Trips
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <header className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/saved" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Saved Trips
          </Link>
          <div className="font-bold text-xl tracking-tight text-neutral-950">
            TravelGraph
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-12 mx-auto max-w-5xl w-full">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-neutral-900 mb-2">Your Saved Trip</h1>
          <p className="text-neutral-500 text-lg">You can update this itinerary below.</p>
        </div>

        <InteractiveItinerary 
          initialItinerary={trip.itinerary} 
          isSavedView={true}
          tripId={trip.id}
        />
        
      </main>
    </div>
  );
}
