import { NextResponse } from 'next/server';
import { getRecommendations } from '../../../lib/recommendations';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cityId, interests } = body;
    
    if (!cityId || !interests) {
      return NextResponse.json({ error: 'Missing cityId or interests' }, { status: 400 });
    }

    const recommendations = await getRecommendations(cityId, interests);
    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error('Error in recommendations API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
