export default function PlaceLoading() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Hero skeleton */}
      <div className="relative w-full h-[50vh] min-h-[400px] bg-neutral-200 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 z-10">
          <div className="mx-auto max-w-7xl">
            <div className="h-12 w-80 bg-white/20 rounded-xl mb-4" />
            <div className="h-6 w-56 bg-white/15 rounded-lg" />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 animate-pulse">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-6 w-32 bg-neutral-200 rounded-lg" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-neutral-200 rounded-md" />
            <div className="h-4 w-5/6 bg-neutral-200 rounded-md" />
            <div className="h-4 w-3/4 bg-neutral-200 rounded-md" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-indigo-100 rounded-full" />
            <div className="h-8 w-24 bg-indigo-100 rounded-full" />
            <div className="h-8 w-16 bg-indigo-100 rounded-full" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-6 w-40 bg-neutral-200 rounded-lg" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white border border-neutral-100">
              <div className="w-20 h-20 rounded-xl bg-neutral-200 shrink-0" />
              <div className="flex flex-col justify-center gap-2">
                <div className="h-4 w-32 bg-neutral-200 rounded-md" />
                <div className="h-3 w-20 bg-neutral-100 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
