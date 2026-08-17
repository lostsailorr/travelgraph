import { TripForm } from '../../components/TripForm';
import Link from 'next/link';

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="border-b border-neutral-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight text-neutral-950">
            TravelGraph
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-2">Plan Your Trip</h1>
          <p className="text-neutral-500 mb-8">Tell us what you love, and we&apos;ll build a tailored itinerary.</p>
          
          <TripForm />
        </div>
      </main>
    </div>
  );
}
