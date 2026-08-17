import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-neutral-950 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/30 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl px-6">
        <div className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-sm text-neutral-300 mb-8 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
          Graph-Powered Travel Recommendation
        </div>
        
        <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent mb-6 pb-2">
          TravelGraph
        </h1>
        
        <p className="mt-4 text-xl text-neutral-400 sm:text-2xl mb-12 max-w-2xl leading-relaxed text-balance">
          Plan trips through connections. Discover places that fit your interests and build smarter day itineraries.
        </p>

        <Link
          href="/plan"
          className="group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-neutral-950 transition-all hover:scale-105 hover:bg-neutral-100 focus:outline-none focus:ring-4 focus:ring-white/20 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          Start Planning
          <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
