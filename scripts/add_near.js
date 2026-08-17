const neo4j = require('neo4j-driver');
require('dotenv').config({ path: '.env.local' });

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(process.env.COGNODB_USERNAME, process.env.COGNODB_PASSWORD)
);

async function addRelationships() {
  const session = driver.session({ database: 'travelgraph' });
  
  const pairs = [
    // Mumbai
    ['taj_mahal_palace', 'colaba_causeway', 10],
    ['taj_mahal_palace', 'marine_drive', 25],
    ['colaba_causeway', 'marine_drive', 15],
    // Delhi
    ['red_fort', 'lotus_temple', 40],
    ['india_gate', 'qutub_minar', 45],
    ['india_gate', 'lotus_temple', 35],
    // Paris
    ['eiffel', 'louvre', 25],
    ['notre_dame', 'musee_orsay', 15],
    // Tokyo
    ['shibuya_crossing', 'tokyo_tower', 30],
    ['sensoji', 'akihabara', 20],
    ['sensoji', 'tokyo_tower', 40],
    // London
    ['british_museum', 'borough_market', 30],
    ['london_eye', 'tower_of_london', 30],
    // Rome
    ['colosseum', 'pantheon', 20],
    ['pantheon', 'trevi_fountain', 10],
    ['colosseum', 'trevi_fountain', 25],
    ['colosseum', 'vatican_museums', 40],
    ['trevi_fountain', 'vatican_museums', 30],
  ];

  try {
    for (const [a, b, dist] of pairs) {
      await session.run(
        `MATCH (a:Place {id: $aId}), (b:Place {id: $bId})
         MERGE (a)-[r1:NEAR]->(b) SET r1.distanceMinutes = $dist
         MERGE (b)-[r2:NEAR]->(a) SET r2.distanceMinutes = $dist`,
        { aId: a, bId: b, dist: neo4j.int(dist) }
      );
      console.log(`  ${a} <-NEAR(${dist}min)-> ${b}`);
    }
    console.log('\nAll NEAR relationships added successfully!');
  } catch (e) {
    console.error(e);
  } finally {
    await session.close();
    await driver.close();
  }
}

addRelationships();
