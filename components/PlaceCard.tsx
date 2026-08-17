import { MapPin, Star, Clock } from 'lucide-react';
import Link from 'next/link';

interface PlaceCardProps {
  id: string;
  name: string;
  rating?: number;
  description?: string;
  tags?: string[];
  matchedInterests?: number;
  distanceMinutes?: number;
  visitDuration?: number;
  actionText?: string;
  duration?: string;
}

export function PlaceCard({ id, name, rating, description, tags = [], matchedInterests, distanceMinutes, visitDuration, actionText = "View Details", duration }: PlaceCardProps) {
  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200 transition-all hover:shadow-md hover:ring-neutral-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-neutral-900 line-clamp-1">{name}</h3>
          {rating && (
            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              {rating}
            </div>
          )}
        </div>
        
        {description && (
          <p className="mt-3 text-sm text-neutral-500 line-clamp-2">{description}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.slice(0, 3).map(tag => (
            <span key={tag} className="inline-flex items-center rounded-md bg-neutral-50 px-2 py-1 text-xs font-medium text-neutral-600 ring-1 ring-inset ring-neutral-500/10">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="inline-flex items-center rounded-md bg-neutral-50 px-2 py-1 text-xs font-medium text-neutral-600 ring-1 ring-inset ring-neutral-500/10">
              +{tags.length - 3}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-neutral-500">
          {matchedInterests !== undefined && (
            <div className="flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-md">
              <Star className="h-3 w-3" />
              {matchedInterests} matches
            </div>
          )}
          {distanceMinutes !== undefined && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {distanceMinutes} min
            </div>
          )}
          {visitDuration !== undefined && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              ~{Math.round(visitDuration / 60)}h visit
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-neutral-100 bg-neutral-50/50 p-4">
        <Link 
          href={`/places/${id}${duration ? `?duration=${duration}` : ''}`} 
          className="flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800"
        >
          {actionText}
        </Link>
      </div>
    </div>
  );
}
