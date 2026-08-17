'use client';
import { useState } from 'react';

const INTERESTS = [
  { id: 'Art', label: 'Art', icon: '🎨' },
  { id: 'History', label: 'History', icon: '🏛️' },
  { id: 'Food', label: 'Food', icon: '🍽️' },
  { id: 'Architecture', label: 'Architecture', icon: '🏢' },
  { id: 'Photography', label: 'Photography', icon: '📷' },
  { id: 'Nature', label: 'Nature', icon: '🌿' },
  { id: 'Shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'Nightlife', label: 'Nightlife', icon: '🥂' },
  { id: 'Museums', label: 'Museums', icon: '🖼️' },
  { id: 'Culture', label: 'Culture', icon: '🎭' },
  { id: 'Romance', label: 'Romance', icon: '❤️' }
];

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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {INTERESTS.map((interest) => {
          const isSelected = selected.has(interest.id);
          const isDisabled = !isSelected && selected.size >= maxSelections;
          return (
            <button
              key={interest.id}
              type="button"
              onClick={() => toggleInterest(interest.id)}
              disabled={isDisabled}
              className={`
                relative flex items-center p-4 rounded-2xl border-2 transition-all text-left
                ${isSelected 
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 shadow-sm' 
                  : 'border-neutral-100 bg-white text-neutral-700 hover:border-neutral-200'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <span className="text-2xl mr-3">{interest.icon}</span>
              <span className="font-bold text-sm">{interest.label}</span>
              
              {isSelected && (
                <div className="absolute top-2 right-2 bg-indigo-600 rounded-full p-0.5 shadow-sm">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="text-center text-sm font-medium text-neutral-400 mt-4">
        {selected.size} of {maxSelections} selected
      </div>
    </div>
  );
}
