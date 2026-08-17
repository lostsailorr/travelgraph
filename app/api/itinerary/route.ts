import { NextResponse } from 'next/server';
import { generateItinerary } from '../../../lib/itinerary';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { startPlaceId, availableMinutes } = body;
    
    if (!startPlaceId || !availableMinutes) {
      return NextResponse.json({ error: 'Missing startPlaceId or availableMinutes' }, { status: 400 });
    }

    const itinerary = await generateItinerary(startPlaceId, availableMinutes);
    return NextResponse.json({ itinerary });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
