'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Navigation, Star, Trash2 } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function InteractiveItinerary({ initialItinerary }: { initialItinerary: any[] }) {
  const [itinerary, setItinerary] = useState(initialItinerary);

  const removePlace = (indexToRemove: number) => {
    setItinerary(prev => {
      const newItin = [...prev];
      
      // If we remove an item, we need to handle the travel time of the next item.
      // If we remove index 0, the new index 0 should have 0 travel time.
      if (indexToRemove === 0 && newItin.length > 1) {
        newItin[1] = { ...newItin[1], travelTimeFromPrevious: 0 };
      }
      
      // We aren't querying the graph for the new distance between index-1 and index+1, 
      // so we just keep the travel time of index+1 as an approximation, or set it to a generic value.
      // For a perfect UX, we just remove the item.
      
      newItin.splice(indexToRemove, 1);
      return newItin;
    });
  };

  if (itinerary.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center shadow-sm mt-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">Itinerary Empty</h3>
        <p className="text-neutral-500 mb-6">You have removed all places from your itinerary.</p>
        <Link href="/plan" className="inline-flex justify-center rounded-xl bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800">
          Plan Another Trip
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-0 pl-4 sm:pl-12">
      {itinerary.map((stop, index) => (
        <div key={stop.place.id + index} className="relative flex gap-8 group/item">
          {/* Timeline Connector */}
          <div className="flex flex-col items-center">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 ring-4 ring-white z-10 mt-6">
              <div className="h-2 w-2 rounded-full bg-indigo-600" />
            </div>
            {index < itinerary.length - 1 && (
              <div className="w-[2px] h-full bg-neutral-200 mt-2" />
            )}
          </div>
          
          <div className="flex-1 pb-10">
            <div className="relative">
              <Link href={`/places/${stop.place.id}`} className="block group">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-neutral-100 shadow-sm ring-1 ring-neutral-200 group-hover:shadow-md transition-all">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://picsum.photos/seed/${stop.place.id}/300/300`} alt={stop.place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  
                  <div className="pt-2 pr-12">
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{stop.place.name}</h3>
                    
                    <div className="mt-2 flex flex-col gap-1 text-sm font-medium text-neutral-500">
                      {stop.place.visitDuration && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-neutral-400" />
                          {Math.round(stop.place.visitDuration / 60)} hours
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 mt-1">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        {stop.place.rating} ({stop.place.interests?.join(', ') || 'Landmark'})
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Delete Button */}
              <button 
                onClick={() => removePlace(index)}
                className="absolute top-2 right-0 p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                title="Remove from itinerary"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            {stop.travelTimeFromPrevious > 0 && index < itinerary.length - 1 && (
              <div className="mt-6 -ml-[2.25rem] inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-bold text-neutral-500 ring-1 ring-inset ring-neutral-200 shadow-sm relative z-20">
                <Navigation className="h-3 w-3 mr-1.5 text-neutral-400" />
                {stop.travelTimeFromPrevious} min walk
              </div>
            )}
            
            {stop.travelTimeFromPrevious > 0 && index === 0 && (
                <div className="mt-6 mb-2 inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-bold text-neutral-500 ring-1 ring-inset ring-neutral-200 shadow-sm relative z-20 -translate-x-[2.25rem]">
                <Navigation className="h-3 w-3 mr-1.5 text-neutral-400" />
                {stop.travelTimeFromPrevious} min walk to start
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
