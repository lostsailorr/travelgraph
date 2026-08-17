export default function RecommendationsLoading() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="w-28 h-4 bg-neutral-200 rounded-md animate-pulse" />
          <div className="font-bold text-xl tracking-tight text-neutral-950">TravelGraph</div>
          <div className="w-24 h-4 bg-neutral-200 rounded-md animate-pulse" />
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl px-6 py-12 w-full">
        <div className="mb-10 animate-pulse">
          <div className="h-10 w-72 bg-neutral-200 rounded-xl mb-3" />
          <div className="h-5 w-96 bg-neutral-100 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm animate-pulse">
              <div className="w-full h-52 bg-neutral-200" />
              <div className="p-6 space-y-3">
                <div className="h-6 w-40 bg-neutral-200 rounded-lg" />
                <div className="h-4 w-full bg-neutral-100 rounded-md" />
                <div className="h-4 w-3/4 bg-neutral-100 rounded-md" />
                <div className="flex gap-2 mt-4">
                  <div className="h-7 w-16 bg-indigo-50 rounded-full" />
                  <div className="h-7 w-20 bg-indigo-50 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
