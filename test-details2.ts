require('dotenv').config({ path: '.env.local' });
import { getDriver, closeDriver } from './lib/db';
import fs from 'fs';
import path from 'path';

const readCypher = (filename: string) => {
  return fs.readFileSync(path.join(process.cwd(), 'cypher', filename), 'utf8');
};

async function getPlaceDetails(placeId: string) {
  const driver = getDriver();
  const session = driver.session({ database: 'travelgraph' });
  try {
    const placeQuery = `MATCH (p:Place {id: $placeId}) RETURN p`;
    const placeResult = await session.run(placeQuery, { placeId });
    if (placeResult.records.length === 0) return null;
    const place = placeResult.records[0].get('p').properties;

    const nearbyQuery = readCypher('nearby.cypher');
    const nearbyResult = await session.run(nearbyQuery, { placeId });
    const nearby = nearbyResult.records.map(r => ({
      ...r.get('nearby').properties,
      distanceMinutes: r.get('distanceMinutes').toNumber()
    }));

    const relatedQuery = readCypher('related.cypher');
    const relatedResult = await session.run(relatedQuery, { placeId });
    const related = relatedResult.records.map(r => ({
      ...r.get('related').properties,
      sharedInterests: r.get('sharedInterests').toNumber()
    }));

    const tagsQuery = `MATCH (p:Place {id: $placeId})-[:HAS_TAG]->(i:Interest) RETURN i`;
    const tagsResult = await session.run(tagsQuery, { placeId });
    const tags = tagsResult.records.map(r => r.get('i').properties.name);

    return { ...place, tags, nearby, related };
  } finally {
    await session.close();
  }
}

async function test() {
  try {
    const res = await getPlaceDetails('louvre');
    console.log(res);
  } catch (err) {
    console.error(err);
  } finally {
    await closeDriver();
  }
}
test();
