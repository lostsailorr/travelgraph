'use client';
import { useState } from 'react';

const INTERESTS = ['Art', 'History', 'Food', 'Architecture', 'Photography', 'Nature', 'Shopping', 'Nightlife', 'Museums', 'Culture', 'Romance'];

interface InterestSelectorProps {
  onSelectionChange: (selected: string[]) => void;
  maxSelections?: number;
}

export function InterestSelector({ onSelectionChange, maxSelections = 5 }: InterestSelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleInterest = (interest: string) => {
    const next = new Set(selected);
    if (next.has(interest)) {
      next.delete(interest);
    } else {
      if (next.size < maxSelections) {
        next.add(interest);
      }
    }
    setSelected(next);
    onSelectionChange(Array.from(next));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Select what you love
        </label>
        <span className="text-xs text-neutral-500">
          {selected.size} / {maxSelections} selected
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {INTERESTS.map((interest) => {
          const isSelected = selected.has(interest);
          const isDisabled = !isSelected && selected.size >= maxSelections;
          return (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              disabled={isDisabled}
              className={`
                inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2
                ${isSelected 
                  ? 'bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90' 
                  : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200/80'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {interest}
            </button>
          );
        })}
      </div>
    </div>
  );
}
