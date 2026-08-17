'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ServerCrash, RefreshCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center font-sans p-6">
      <div className="bg-white border border-neutral-200 rounded-3xl p-10 md:p-12 text-center max-w-lg w-full shadow-lg">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ServerCrash className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-neutral-900 mb-3">Database Unreachable</h1>
        
        <p className="text-neutral-500 mb-8 leading-relaxed">
          We encountered an issue connecting to our Neo4j Graph Database. This might be a temporary network issue or the database instance may be paused.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md"
          >
            <RefreshCcw className="w-4 h-4" /> Try Again
          </button>
          
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-900 px-6 py-3 rounded-xl font-bold transition-all shadow-sm"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
