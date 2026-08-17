import { getPlaceDetails, getItineraryCandidates } from './recommendations';

export async function generateItinerary(startPlaceId: string, availableMinutes: number) {
  const itinerary = [];
  let currentPlaceId = startPlaceId;
  let remainingTime = availableMinutes;
  
  // Fetch start place
  const startPlace = await getPlaceDetails(startPlaceId);
  if (!startPlace) return null;
  
  itinerary.push({ place: startPlace, travelTimeFromPrevious: 0 });
  remainingTime -= (startPlace.visitDuration || 60);

  const visited = new Set([startPlaceId]);

  while (remainingTime > 0) {
    const candidates = await getItineraryCandidates(currentPlaceId);
    
    // Find best unvisited candidate
    const nextCandidate = candidates.find(c => !visited.has(c.id));
    if (!nextCandidate) break; // No more places to visit nearby

    const travelTime = nextCandidate.travelTime;
    const visitDuration = nextCandidate.visitDuration || 60;

    if (remainingTime < travelTime + visitDuration) {
      break; // Not enough time to travel and visit
    }

    const placeDetails = await getPlaceDetails(nextCandidate.id);
    if (!placeDetails) break;

    itinerary.push({ place: placeDetails, travelTimeFromPrevious: travelTime });
    visited.add(nextCandidate.id);
    remainingTime -= (travelTime + visitDuration);
    currentPlaceId = nextCandidate.id;
  }

  return itinerary;
}
