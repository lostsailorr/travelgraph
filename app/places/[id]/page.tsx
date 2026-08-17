import { getPlaceDetails } from '../../../lib/recommendations';
import Link from 'next/link';
import { MapPin, Clock, Star, ArrowLeft } from 'lucide-react';

export default async function PlaceDetailsPage({
  params,
  searchParams,
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
      
      {/* Hero Image Section */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={`https://picsum.photos/seed/${id}/1920/1080`} 
          alt={place.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        
        {/* Header over image */}
        <header className="absolute top-0 left-0 right-0 px-6 py-4 z-10">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <Link href="/recommendations" className="flex items-center text-sm font-medium text-white hover:text-neutral-200 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to results
            </Link>
            <div className="flex gap-4">
               <button className="text-white hover:text-neutral-200"><Star className="h-5 w-5" /></button>
            </div>
          </div>
        </header>
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 z-10">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">{place.name}</h1>
              <div className="flex items-center gap-4 text-white">
                {place.rating && (
                  <div className="flex items-center gap-1.5 font-medium">
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                    <span className="text-lg">{place.rating}</span>
                    <span className="text-neutral-300 font-normal">(24,500 reviews)</span>
                  </div>
                )}
                {place.cityId && (
                  <div className="flex items-center gap-1.5 text-neutral-300">
                     <MapPin className="h-4 w-4" />
                     {place.cityId.charAt(0).toUpperCase() + place.cityId.slice(1)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="min-w-[200px]">
              <form action={`/itinerary`} method="GET">
                <input type="hidden" name="startPlaceId" value={place.id} />
                <input type="hidden" name="duration" value={duration} />
                <button type="submit" className="w-full flex items-center justify-center rounded-2xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-700 hover:-translate-y-0.5">
                  Add to Itinerary
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Place Info (Left Column) */}
        <div className="lg:col-span-2 space-y-12">
          
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">About</h2>
            <p className="text-lg text-neutral-600 leading-relaxed">{place.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {place.tags?.map((tag: string) => (
                <span key={tag} className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 border border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-900 mb-6">Why we recommend it</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="bg-emerald-100 p-2 rounded-full mt-0.5">
                   <Star className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900">Matches your interests</h4>
                  <p className="text-sm text-neutral-500">This place heavily matches your selected categories.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-amber-100 p-2 rounded-full mt-0.5">
                   <Star className="h-4 w-4 text-amber-600 fill-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900">Highly rated</h4>
                  <p className="text-sm text-neutral-500">Loved by thousands of travelers on TravelGraph.</p>
                </div>
              </li>
              {place.visitDuration && (
                <li className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full mt-0.5">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900">Perfect for your trip</h4>
                    <p className="text-sm text-neutral-500">The ~{Math.round(place.visitDuration / 60)}h recommended visit time fits perfectly in your schedule.</p>
                  </div>
                </li>
              )}
            </ul>
          </section>

        </div>

        {/* Sidebar (Right Column) */}
        <div className="space-y-8">
          {place.nearby && place.nearby.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Nearby Places</h2>
              <div className="flex flex-col gap-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {place.nearby.map((nearbyPlace: any) => (
                  <Link 
                    href={`/places/${nearbyPlace.id}`} 
                    key={nearbyPlace.id}
                    className="flex gap-4 p-4 rounded-2xl bg-white border border-neutral-100 hover:border-indigo-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://picsum.photos/seed/${nearbyPlace.id}/200/200`} alt={nearbyPlace.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold text-neutral-900 text-sm line-clamp-1">{nearbyPlace.name}</h4>
                      <div className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {nearbyPlace.distanceMinutes} min walk
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
