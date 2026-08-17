import { runQuery } from './db';
import fs from 'fs';
import path from 'path';
import { cache } from 'react';

// Helper to read Cypher queries
const readCypher = (filename: string) => {
  return fs.readFileSync(path.join(process.cwd(), 'cypher', filename), 'utf8');
};

// Safely convert Neo4j values to numbers (handles both native numbers and Neo4j Integers)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const safeNumber = (val: any) => {
  if (typeof val === 'number') return val;
  if (val && typeof val.toNumber === 'function') return val.toNumber();
  return Number(val);
};

export const getRecommendations = cache(async (cityId: string, interests: string[]) => {
  const query = readCypher('recommendations.cypher');
  const result = await runQuery(query, { cityId, interests });
  
  return result.records.map((record: any) => {
    const place = record.get('p').properties;
    const matchedInterests = safeNumber(record.get('matchedInterests'));
    return { ...place, matchedInterests };
  });
});

export const getPlaceDetails = cache(async (placeId: string) => {
  // Basic place query
  const placeQuery = `MATCH (p:Place {id: $placeId}) RETURN p`;
  const placeResult = await runQuery(placeQuery, { placeId });
  if (placeResult.records.length === 0) return null;
  const rawPlace = placeResult.records[0].get('p').properties;
  const place = {
    ...rawPlace,
    visitDuration: safeNumber(rawPlace.visitDuration),
    rating: safeNumber(rawPlace.rating),
    priceLevel: safeNumber(rawPlace.priceLevel)
  };

  // Nearby places
  const nearbyQuery = readCypher('nearby.cypher');
  const nearbyResult = await runQuery(nearbyQuery, { placeId });
  const nearby = nearbyResult.records.map((r: any) => ({
    ...r.get('nearby').properties,
    distanceMinutes: safeNumber(r.get('distanceMinutes'))
  }));

  // Related places
  const relatedQuery = readCypher('related.cypher');
  const relatedResult = await runQuery(relatedQuery, { placeId });
  const related = relatedResult.records.map((r: any) => ({
    ...r.get('related').properties,
    sharedInterests: safeNumber(r.get('sharedInterests'))
  }));

  // Interests tags
  const tagsQuery = `MATCH (p:Place {id: $placeId})-[:HAS_TAG]->(i:Interest) RETURN i`;
  const tagsResult = await runQuery(tagsQuery, { placeId });
  const tags = tagsResult.records.map((r: any) => r.get('i').properties.name);

  return { ...place, tags, nearby, related };
});

export const getItineraryCandidates = cache(async (startPlaceId: string, minimumRating: number = 4.0) => {
  const query = readCypher('itinerary.cypher');
  const result = await runQuery(query, { startPlaceId, minimumRating });
  return result.records.map((r: any) => ({
    ...r.get('next').properties,
    travelTime: safeNumber(r.get('travelTime'))
  }));
});
