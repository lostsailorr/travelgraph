import { getRecommendations } from '../../lib/recommendations';
import { PlaceCard } from '../../components/PlaceCard';
import Link from 'next/link';
import { ArrowLeft, Bookmark } from 'lucide-react';

export default async function RecommendationsPage({
  searchParams,
}: {
  searchParams: { cityId?: string; duration?: string; interests?: string };
}) {
  const cityId = searchParams.cityId;
  const duration = searchParams.duration || '1day';
  const interests = searchParams.interests ? searchParams.interests.split(',') : [];
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recommendations: any[] = [];
  let errorState = false;

  if (cityId && interests.length > 0) {
    try {
      recommendations = await getRecommendations(cityId, interests);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      errorState = true;
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/plan" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
          </Link>
          <Link href="/" className="font-bold text-xl tracking-tight text-neutral-950 absolute left-1/2 -translate-x-1/2">
            TravelGraph
          </Link>
          <Link href="/saved" className="flex items-center text-sm font-medium text-neutral-600 hover:text-indigo-600 transition-colors gap-2">
            <Bookmark className="w-4 h-4" /> <span className="hidden sm:inline">Saved Trips</span>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 mx-auto max-w-4xl w-full px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-neutral-900 mb-2">Recommended for You</h1>
          <p className="text-neutral-500 text-lg">Top picks based on your interests: {interests.join(', ')}</p>
        </div>

        {errorState ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">Connection Error</h3>
            <p className="text-red-700">We&apos;re having trouble connecting to TravelGraph. The database isn&apos;t responding right now.</p>
            <div className="mt-6">
              <Link href="/plan" className="inline-flex justify-center rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                Go Back
              </Link>
            </div>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center max-w-2xl mx-auto shadow-sm">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">No places found</h3>
            <p className="text-neutral-500 mb-6">We couldn&apos;t find any places matching all your interests. Try adjusting your preferences.</p>
            <Link href="/plan" className="inline-flex justify-center rounded-xl bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800">
              Adjust Interests
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {recommendations.map((place: any) => (
              <PlaceCard
                key={place.id}
                id={place.id}
                name={place.name}
                rating={place.rating}
                matchedInterests={place.matchedInterests}
                duration={duration}
                tags={place.interests}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
