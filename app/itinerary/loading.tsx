export default function ItineraryLoading() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <header className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div className="w-28 h-4 bg-neutral-200 rounded-md animate-pulse" />
          <div className="font-bold text-xl tracking-tight text-neutral-950">TravelGraph</div>
          <div className="w-24 h-4 bg-neutral-200 rounded-md animate-pulse" />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-neutral-900 mb-4">Generating Your Day...</h1>
          <p className="text-neutral-500 text-lg">Our graph algorithm is computing the optimal route for you.</p>
        </div>

        <div className="space-y-0 pl-4 sm:pl-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative flex gap-8 animate-pulse">
              <div className="flex flex-col items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 ring-4 ring-white z-10 mt-6">
                  <div className="h-2 w-2 rounded-full bg-indigo-300" />
                </div>
                <div className="w-[2px] h-full bg-neutral-200 mt-2" />
              </div>
              <div className="flex-1 pb-10">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-neutral-200 shrink-0" />
                  <div className="pt-2 flex-1">
                    <div className="h-6 w-48 bg-neutral-200 rounded-lg mb-3" />
                    <div className="h-4 w-24 bg-neutral-100 rounded-md mb-2" />
                    <div className="h-4 w-32 bg-neutral-100 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
