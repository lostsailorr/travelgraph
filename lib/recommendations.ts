import { getDriver } from './db';
import fs from 'fs';
import path from 'path';
import { cache } from 'react';

// Helper to read Cypher queries
const readCypher = (filename: string) => {
  return fs.readFileSync(path.join(process.cwd(), 'cypher', filename), 'utf8');
};

export const getRecommendations = cache(async (cityId: string, interests: string[]) => {
  const driver = getDriver();
  const session = driver.session({ database: 'travelgraph' });
  try {
    const query = readCypher('recommendations.cypher');
    const result = await session.run(query, { cityId, interests });
    
    return result.records.map(record => {
      const place = record.get('p').properties;
      const matchedInterests = record.get('matchedInterests').toNumber();
      return { ...place, matchedInterests };
    });
  } finally {
    await session.close();
  }
});

export const getPlaceDetails = cache(async (placeId: string) => {
  const driver = getDriver();
  const session = driver.session({ database: 'travelgraph' });
  try {
    // Basic place query
    const placeQuery = `MATCH (p:Place {id: $placeId}) RETURN p`;
    const placeResult = await session.run(placeQuery, { placeId });
    if (placeResult.records.length === 0) return null;
    const place = placeResult.records[0].get('p').properties;

    // Nearby places
    const nearbyQuery = readCypher('nearby.cypher');
    const nearbyResult = await session.run(nearbyQuery, { placeId });
    const nearby = nearbyResult.records.map(r => ({
      ...r.get('nearby').properties,
      distanceMinutes: r.get('distanceMinutes').toNumber()
    }));

    // Related places
    const relatedQuery = readCypher('related.cypher');
    const relatedResult = await session.run(relatedQuery, { placeId });
    const related = relatedResult.records.map(r => ({
      ...r.get('related').properties,
      sharedInterests: r.get('sharedInterests').toNumber()
    }));

    // Interests tags
    const tagsQuery = `MATCH (p:Place {id: $placeId})-[:HAS_TAG]->(i:Interest) RETURN i`;
    const tagsResult = await session.run(tagsQuery, { placeId });
    const tags = tagsResult.records.map(r => r.get('i').properties.name);

    return { ...place, tags, nearby, related };
  } finally {
    await session.close();
  }
});

export const getItineraryCandidates = cache(async (startPlaceId: string, minimumRating: number = 4.0) => {
  const driver = getDriver();
  const session = driver.session({ database: 'travelgraph' });
  try {
    const query = readCypher('itinerary.cypher');
    const result = await session.run(query, { startPlaceId, minimumRating });
    return result.records.map(r => ({
      ...r.get('next').properties,
      travelTime: r.get('travelTime').toNumber()
    }));
  } finally {
    await session.close();
  }
});
