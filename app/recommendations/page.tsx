import { getRecommendations } from '../../lib/recommendations';
import { PlaceCard } from '../../components/PlaceCard';
import Link from 'next/link';

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
      <header className="border-b border-neutral-200 bg-white px-6 py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight text-neutral-950">
            TravelGraph
          </Link>
          <div className="flex gap-4">
            <Link href="/plan" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 bg-neutral-100 px-4 py-2 rounded-full transition-colors">
              Adjust Interests
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Recommended for You</h1>
          <p className="text-neutral-500">Based on your interests in {interests.join(', ')}</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {recommendations.map((place: any) => (
              <PlaceCard
                key={place.id}
                id={place.id}
                name={place.name}
                rating={place.rating}
                description={place.description}
                matchedInterests={place.matchedInterests}
                duration={duration}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
