import Link from 'next/link';
import { ArrowLeft, Database, Network } from 'lucide-react';

export default function AboutPage() {
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

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-neutral-900 mb-4">About TravelGraph</h1>
          <p className="text-lg text-neutral-500">Built for the Wexa AI Take-Home Assignment.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm ring-1 ring-neutral-200/50 space-y-10">
          
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Database className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">Why a Graph Database?</h2>
            </div>
            
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                When planning a trip, tourists want an itinerary that maximizes the number of places they enjoy (based on their interests) while minimizing travel time between locations.
              </p>
              <p>
                In a traditional relational database (SQL), querying for &quot;Find me museums with high ratings that are geographically close to each other, and compute an efficient path between them&quot; requires extremely complex, expensive, and non-performant <code className="bg-neutral-100 px-1.5 py-0.5 rounded">JOIN</code>s, spatial queries, and recursive CTEs.
              </p>
              <p>
                By modeling cities, attractions, and their physical distances as interconnected nodes and relationships, finding an optimal travel path becomes a simple graph traversal. We easily find places with shared interests by traversing the <code className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-mono text-sm">(Place)-[:HAS_TAG]-&gt;(Interest)</code> relationships.
              </p>
            </div>
          </section>

          <hr className="border-neutral-100" />

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Network className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">The Data Model</h2>
            </div>
            
            <ul className="list-disc pl-5 space-y-2 text-neutral-600">
              <li><strong>Nodes:</strong> <code className="font-mono bg-neutral-100 px-1 rounded">City</code>, <code className="font-mono bg-neutral-100 px-1 rounded">Place</code>, <code className="font-mono bg-neutral-100 px-1 rounded">Interest</code></li>
              <li><strong>Relationships:</strong> <code className="font-mono bg-neutral-100 px-1 rounded">CONTAINS</code>, <code className="font-mono bg-neutral-100 px-1 rounded">LOCATED_IN</code>, <code className="font-mono bg-neutral-100 px-1 rounded">HAS_TAG</code>, <code className="font-mono bg-neutral-100 px-1 rounded">NEAR</code></li>
              <li><strong>Properties:</strong> Places hold metadata like <code className="font-mono bg-neutral-100 px-1 rounded">rating</code> and <code className="font-mono bg-neutral-100 px-1 rounded">visitDuration</code>, while NEAR relationships hold <code className="font-mono bg-neutral-100 px-1 rounded">distanceMinutes</code>.</li>
            </ul>
          </section>

          <div className="pt-6">
            <Link href="/plan" className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md">
              Start Planning a Trip
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
