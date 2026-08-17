import { MapPin, Star, Clock } from 'lucide-react';
import Link from 'next/link';

interface PlaceCardProps {
  id: string;
  name: string;
  rating?: number;
  tags?: string[];
  matchedInterests?: number;
  distanceMinutes?: number;
  visitDuration?: number;
  actionText?: string;
  duration?: string;
  horizontal?: boolean;
}

export function PlaceCard({ 
  id, 
  name, 
  rating, 
  tags = [], 
  matchedInterests, 
  distanceMinutes, 
  visitDuration, 
  actionText = "View Details", 
  duration,
  horizontal = true
}: PlaceCardProps) {
  
  return (
    <div className={`group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-neutral-200 transition-all hover:shadow-lg hover:ring-indigo-300 flex ${horizontal ? 'flex-row h-48' : 'flex-col'}`}>
      
      <div className={`relative bg-neutral-100 overflow-hidden ${horizontal ? 'w-48 h-full shrink-0' : 'h-48 w-full'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={`https://picsum.photos/seed/${id}/800/800`}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {horizontal && matchedInterests !== undefined && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-indigo-700 shadow-sm flex items-center gap-1">
            <Star className="w-3 h-3 fill-indigo-500" />
            {matchedInterests} Matches
          </div>
        )}
      </div>
      
      <div className={`flex flex-col flex-1 p-5 ${horizontal ? 'justify-between' : ''}`}>
        <div>
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-xl font-bold text-neutral-900 line-clamp-1">{name}</h3>
            {!horizontal && rating && (
              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                {rating}
              </div>
            )}
          </div>
          
          {horizontal && rating && (
            <div className="flex items-center gap-1 text-sm font-bold text-neutral-700 mb-3">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              {rating}
              <span className="text-neutral-400 font-normal ml-1">(24,500 reviews)</span>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, horizontal ? 4 : 3).map(tag => (
              <span key={tag} className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-500/20">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
          <div className="flex items-center gap-4 text-xs font-medium text-neutral-500">
            {visitDuration !== undefined && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-neutral-400" />
                {Math.round(visitDuration / 60)}h visit
              </div>
            )}
            {distanceMinutes !== undefined && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-neutral-400" />
                {distanceMinutes} min walk
              </div>
            )}
          </div>
          
          <Link 
            href={`/places/${id}${duration ? `?duration=${duration}` : ''}`} 
            className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-bold text-indigo-600 ring-2 ring-indigo-100 transition-all hover:bg-indigo-50 hover:ring-indigo-200"
          >
            {actionText}
          </Link>
        </div>
      </div>
    </div>
  );
}
