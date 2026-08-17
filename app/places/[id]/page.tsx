import { getPlaceDetails } from '../../../lib/recommendations';
import { PlaceCard } from '../../../components/PlaceCard';
import Link from 'next/link';
import { MapPin, Clock, Star, ArrowLeft, Tag } from 'lucide-react';

export default async function PlaceDetailsPage({
  params,
}: {
  params: { id: string };
  searchParams: { duration?: string };
}) {
  const { id } = params;
  const duration = searchParams.duration || '1day';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let place: any = null;
  let errorState = false;

  try {
    place = await getPlaceDetails(id);
  } catch (error) {
    console.error('Failed to get place details:', error);
    errorState = true;
  }

  if (errorState) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center max-w-xl w-full">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Connection Error</h3>
          <p className="text-red-700 mb-6">We&apos;re having trouble connecting to TravelGraph.</p>
          <Link href="/recommendations" className="inline-flex justify-center rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center max-w-xl w-full shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Place not found</h3>
          <p className="text-neutral-500 mb-6">The requested attraction could not be found.</p>
          <Link href="/recommendations" className="inline-flex justify-center rounded-xl bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800">
            Back to Recommendations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <header className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/recommendations" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Link>
          <div className="font-bold text-xl tracking-tight text-neutral-950">
            TravelGraph
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Main Place Info */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm ring-1 ring-neutral-200/50 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <MapPin className="w-64 h-64" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4">{place.name}</h1>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">{place.description}</p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  {place.rating} / 5.0 Rating
                </div>
                {place.visitDuration && (
                  <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                    <Clock className="h-4 w-4 text-blue-500" />
                    {Math.round(place.visitDuration / 60)}h Recommended Visit
                  </div>
                )}
              </div>

              <div className="mt-8 space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Categories & Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {place.tags?.map((tag: string) => (
                    <span key={tag} className="inline-flex items-center rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 min-w-[240px]">
              <form action={`/itinerary`} method="GET">
                <input type="hidden" name="startPlaceId" value={place.id} />
                <input type="hidden" name="duration" value={duration} />
                <button type="submit" className="w-full flex items-center justify-center rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5">
                  Build My Day From Here
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Graph Connections */}
        <div className="space-y-16">
          {place.nearby && place.nearby.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-blue-500" /> Nearby Places
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {place.nearby.map((nearbyPlace: any) => (
                  <PlaceCard
                    key={nearbyPlace.id}
                    id={nearbyPlace.id}
                    name={nearbyPlace.name}
                    rating={nearbyPlace.rating}
                    description={nearbyPlace.description}
                    distanceMinutes={nearbyPlace.distanceMinutes}
                    actionText="View Place"
                  />
                ))}
              </div>
            </section>
          )}

          {place.related && place.related.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <Star className="h-6 w-6 text-purple-500" /> Similar Interests
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {place.related.map((relatedPlace: any) => (
                  <PlaceCard
                    key={relatedPlace.id}
                    id={relatedPlace.id}
                    name={relatedPlace.name}
                    rating={relatedPlace.rating}
                    description={relatedPlace.description}
                    matchedInterests={relatedPlace.sharedInterests}
                    actionText="View Place"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
