import { NextResponse } from 'next/server';
import { getPlaceDetails } from '../../../../lib/recommendations';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const placeDetails = await getPlaceDetails(id);
    if (!placeDetails) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json(placeDetails);
  } catch (error) {
    console.error('Error fetching place details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
