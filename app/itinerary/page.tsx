import { generateItinerary } from '../../lib/itinerary';
import Link from 'next/link';
import { MapPin, Clock, ArrowLeft, Navigation } from 'lucide-react';

export default async function ItineraryPage({
  searchParams,
}: {
  searchParams: { startPlaceId?: string; duration?: string };
}) {
  const startPlaceId = searchParams.startPlaceId;
  const duration = searchParams.duration || '1day';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let itinerary: any[] | null = null;
  let errorState = false;

  let availableMinutes = 480;
  if (duration === 'half') availableMinutes = 240;
  else if (duration === '2days') availableMinutes = 960;
  else if (duration.startsWith('custom_')) {
    const mins = parseInt(duration.split('_')[1], 10);
    if (!isNaN(mins)) availableMinutes = mins;
  }

  if (startPlaceId) {
    try {
      itinerary = await generateItinerary(startPlaceId, availableMinutes);
    } catch (error) {
      console.error('Failed to generate itinerary:', error);
      errorState = true;
    }
  }

  if (errorState) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center max-w-xl w-full">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Connection Error</h3>
          <p className="text-red-700 mb-6">We&apos;re having trouble connecting to TravelGraph.</p>
          <Link href="/plan" className="inline-flex justify-center rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center max-w-xl w-full shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Itinerary Found</h3>
          <p className="text-neutral-500 mb-6">We couldn&apos;t generate an itinerary from the selected place.</p>
          <Link href="/plan" className="inline-flex justify-center rounded-xl bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800">
            Start Over
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <header className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href={`/places/${startPlaceId}`} className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Place
          </Link>
          <div className="font-bold text-xl tracking-tight text-neutral-950">
            TravelGraph
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-4">Your Generated Day</h1>
          <p className="text-neutral-500 text-lg">Optimized for travel time and ratings using Graph traversal.</p>
        </div>

        <div className="space-y-6">
          {itinerary.map((stop, index) => (
            <div key={stop.place.id} className="relative flex gap-6">
              {/* Timeline Connector */}
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md ring-4 ring-white z-10">
                  <MapPin className="h-5 w-5" />
                </div>
                {index < itinerary!.length - 1 && (
                  <div className="w-0.5 h-full bg-neutral-200 min-h-[4rem]" />
                )}
              </div>
              
              <div className="flex-1 pb-8">
                {stop.travelTimeFromPrevious > 0 && (
                  <div className="mb-4 inline-flex items-center rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-600 ring-1 ring-inset ring-neutral-200">
                    <Navigation className="h-4 w-4 mr-2 text-neutral-400" />
                    {stop.travelTimeFromPrevious} min travel time
                  </div>
                )}
                
                <Link href={`/places/${stop.place.id}`} className="block group">
                  <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-neutral-200 transition-all hover:shadow-md hover:ring-neutral-300">
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">{stop.place.name}</h3>
                    <p className="mt-2 text-neutral-500 line-clamp-2">{stop.place.description}</p>
                    
                    <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium text-neutral-600">
                      {stop.place.visitDuration && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-neutral-400" />
                          {Math.round(stop.place.visitDuration / 60)}h visit
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Link href="/plan" className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-8 py-4 text-base font-bold text-white shadow-sm transition-all hover:bg-neutral-800">
            Plan Another Trip
          </Link>
        </div>
      </main>
    </div>
  );
}
