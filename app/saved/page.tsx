import Link from 'next/link';
import { Bookmark, ArrowLeft } from 'lucide-react';

export default function SavedTripsPage() {
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

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white border border-neutral-200 rounded-3xl p-12 text-center max-w-xl w-full shadow-sm">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">No Saved Trips Yet</h3>
          <p className="text-neutral-500 mb-8">When you generate a graph-optimized itinerary, you can save it here to view later.</p>
          <Link href="/plan" className="inline-flex justify-center rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors">
            Create a New Trip
          </Link>
        </div>
      </main>
    </div>
  );
}
