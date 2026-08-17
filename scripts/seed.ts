require('dotenv').config({ path: '.env.local' });
import { getDriver, closeDriver } from '../lib/db';

async function seed() {
  console.log('Connecting to CognoDB (Neo4j)...');
  const driver = getDriver();
  const session = driver.session({ database: 'travelgraph' });

  try {
    console.log('Clearing existing data...');
    await session.run('MATCH (n) DETACH DELETE n');

    console.log('Creating constraints and indexes...');
    // Constraints
    await session.run('CREATE CONSTRAINT IF NOT EXISTS FOR (c:City) REQUIRE c.id IS UNIQUE');
    await session.run('CREATE CONSTRAINT IF NOT EXISTS FOR (p:Place) REQUIRE p.id IS UNIQUE');
    await session.run('CREATE CONSTRAINT IF NOT EXISTS FOR (i:Interest) REQUIRE i.id IS UNIQUE');
    
    // Performance Indexes
    await session.run('CREATE INDEX IF NOT EXISTS FOR (p:Place) ON (p.cityId)');
    await session.run('CREATE INDEX IF NOT EXISTS FOR (p:Place) ON (p.rating)');

    const cities = [
      { id: 'mumbai', name: 'Mumbai', country: 'India' },
      { id: 'delhi', name: 'Delhi', country: 'India' },
      { id: 'tokyo', name: 'Tokyo', country: 'Japan' },
      { id: 'kyoto', name: 'Kyoto', country: 'Japan' },
      { id: 'paris', name: 'Paris', country: 'France' },
      { id: 'london', name: 'London', country: 'UK' },
      { id: 'rome', name: 'Rome', country: 'Italy' },
      { id: 'nyc', name: 'New York', country: 'USA' },
      { id: 'goa', name: 'Goa', country: 'India' },
      { id: 'bihar', name: 'Bihar', country: 'India' },
      { id: 'uttarakhand', name: 'Uttarakhand', country: 'India' }
    ];

    const interests = ['Art', 'History', 'Food', 'Architecture', 'Photography', 'Nature', 'Shopping', 'Nightlife', 'Museums', 'Culture', 'Romance', 'Religion', 'Technology'];

    const places = [
      // Mumbai
      { id: 'gateway_of_india', name: 'Gateway of India', cityId: 'mumbai', rating: 4.6, description: 'Iconic arch monument built in the 20th century.', visitDuration: 90, priceLevel: 1, interests: ['History', 'Architecture', 'Photography'] },
      { id: 'taj_mahal_palace', name: 'Taj Mahal Palace', cityId: 'mumbai', rating: 4.8, description: 'Historic 5-star hotel next to the Gateway.', visitDuration: 60, priceLevel: 4, interests: ['Architecture', 'Food', 'Romance'] },
      { id: 'elephanta_caves', name: 'Elephanta Caves', cityId: 'mumbai', rating: 4.7, description: 'Ancient cave temples dedicated to Shiva.', visitDuration: 240, priceLevel: 2, interests: ['History', 'Art', 'Religion', 'Culture'] },
      { id: 'marine_drive', name: 'Marine Drive', cityId: 'mumbai', rating: 4.9, description: '3.6-kilometer-long promenade along the coast.', visitDuration: 120, priceLevel: 1, interests: ['Nature', 'Photography', 'Romance', 'Nightlife'] },
      { id: 'colaba_causeway', name: 'Colaba Causeway', cityId: 'mumbai', rating: 4.5, description: 'Famous commercial street for shopping.', visitDuration: 180, priceLevel: 2, interests: ['Shopping', 'Culture'] },
      
      // Delhi
      { id: 'red_fort', name: 'Red Fort', cityId: 'delhi', rating: 4.7, description: 'Historic fort in Old Delhi.', visitDuration: 180, priceLevel: 2, interests: ['History', 'Architecture', 'Culture'] },
      { id: 'qutub_minar', name: 'Qutub Minar', cityId: 'delhi', rating: 4.8, description: 'UNESCO World Heritage site and tallest brick minaret.', visitDuration: 120, priceLevel: 2, interests: ['History', 'Architecture'] },
      { id: 'india_gate', name: 'India Gate', cityId: 'delhi', rating: 4.6, description: 'War memorial located astride the Rajpath.', visitDuration: 90, priceLevel: 1, interests: ['History', 'Photography'] },
      { id: 'lotus_temple', name: 'Lotus Temple', cityId: 'delhi', rating: 4.5, description: 'Baháʼí House of Worship noted for its flowerlike shape.', visitDuration: 90, priceLevel: 1, interests: ['Religion', 'Architecture', 'Photography'] },
      
      // Tokyo
      { id: 'sensoji', name: 'Senso-ji', cityId: 'tokyo', rating: 4.7, description: 'Ancient Buddhist temple in Asakusa.', visitDuration: 120, priceLevel: 1, interests: ['History', 'Religion', 'Culture'] },
      { id: 'tokyo_tower', name: 'Tokyo Tower', cityId: 'tokyo', rating: 4.6, description: 'Communications and observation tower in Shiba-koen.', visitDuration: 120, priceLevel: 2, interests: ['Architecture', 'Photography', 'Romance'] },
      { id: 'shibuya_crossing', name: 'Shibuya Crossing', cityId: 'tokyo', rating: 4.8, description: 'The busiest pedestrian intersection in the world.', visitDuration: 60, priceLevel: 1, interests: ['Photography', 'Culture', 'Nightlife'] },
      { id: 'meiji_jingu', name: 'Meiji Jingu', cityId: 'tokyo', rating: 4.7, description: 'Shinto shrine dedicated to the deified spirits of Emperor Meiji.', visitDuration: 150, priceLevel: 1, interests: ['History', 'Religion', 'Nature'] },
      { id: 'akihabara', name: 'Akihabara', cityId: 'tokyo', rating: 4.6, description: 'Cultural center and a shopping district for video games, anime.', visitDuration: 240, priceLevel: 2, interests: ['Shopping', 'Technology', 'Culture'] },
      
      // Kyoto
      { id: 'fushimi_inari', name: 'Fushimi Inari Taisha', cityId: 'kyoto', rating: 4.9, description: 'Famous for its thousands of vermilion torii gates.', visitDuration: 180, priceLevel: 1, interests: ['History', 'Religion', 'Photography', 'Nature'] },
      { id: 'kinkakuji', name: 'Kinkaku-ji (Golden Pavilion)', cityId: 'kyoto', rating: 4.7, description: 'A Zen temple whose top two floors are completely covered in gold leaf.', visitDuration: 120, priceLevel: 2, interests: ['Architecture', 'History', 'Religion'] },
      { id: 'arashiyama', name: 'Arashiyama Bamboo Grove', cityId: 'kyoto', rating: 4.8, description: 'A sprawling bamboo grove with walking paths.', visitDuration: 150, priceLevel: 1, interests: ['Nature', 'Photography'] },
      
      // Paris
      { id: 'louvre', name: 'Louvre Museum', cityId: 'paris', rating: 4.8, description: 'World\'s largest art museum.', visitDuration: 180, priceLevel: 2, interests: ['Art', 'Museums', 'History', 'Culture'] },
      { id: 'eiffel', name: 'Eiffel Tower', cityId: 'paris', rating: 4.7, description: 'Iconic iron lattice tower.', visitDuration: 120, priceLevel: 3, interests: ['Architecture', 'Photography', 'Romance'] },
      { id: 'musee_orsay', name: 'Musée d\'Orsay', cityId: 'paris', rating: 4.8, description: 'Impressionist masterpieces.', visitDuration: 150, priceLevel: 2, interests: ['Art', 'Museums'] },
      { id: 'notre_dame', name: 'Notre-Dame', cityId: 'paris', rating: 4.6, description: 'Medieval Catholic cathedral.', visitDuration: 60, priceLevel: 1, interests: ['History', 'Architecture', 'Religion'] },
      
      // London
      { id: 'british_museum', name: 'The British Museum', cityId: 'london', rating: 4.8, description: 'Dedicated to human history, art and culture.', visitDuration: 240, priceLevel: 1, interests: ['History', 'Museums', 'Art'] },
      { id: 'tower_of_london', name: 'Tower of London', cityId: 'london', rating: 4.7, description: 'Historic castle on the north bank of the River Thames.', visitDuration: 180, priceLevel: 3, interests: ['History', 'Architecture'] },
      { id: 'london_eye', name: 'London Eye', cityId: 'london', rating: 4.5, description: 'Cantilevered observation wheel on the South Bank.', visitDuration: 90, priceLevel: 3, interests: ['Architecture', 'Photography'] },
      { id: 'borough_market', name: 'Borough Market', cityId: 'london', rating: 4.7, description: 'Wholesale and retail market hall.', visitDuration: 120, priceLevel: 2, interests: ['Food', 'Culture'] },
      
      // Rome
      { id: 'colosseum', name: 'Colosseum', cityId: 'rome', rating: 4.9, description: 'An oval amphitheatre in the centre of the city.', visitDuration: 180, priceLevel: 2, interests: ['History', 'Architecture', 'Photography'] },
      { id: 'pantheon', name: 'Pantheon', cityId: 'rome', rating: 4.8, description: 'Former Roman temple, now a Catholic church.', visitDuration: 90, priceLevel: 1, interests: ['History', 'Architecture', 'Religion'] },
      { id: 'trevi_fountain', name: 'Trevi Fountain', cityId: 'rome', rating: 4.8, description: 'Largest Baroque fountain in the city and one of the most famous in the world.', visitDuration: 60, priceLevel: 1, interests: ['Art', 'Architecture', 'Romance'] },
      { id: 'vatican_museums', name: 'Vatican Museums', cityId: 'rome', rating: 4.7, description: 'Public art and sculpture museums in the Vatican City.', visitDuration: 240, priceLevel: 3, interests: ['Art', 'Museums', 'History', 'Religion'] },
      
      // New York
      { id: 'central_park', name: 'Central Park', cityId: 'nyc', rating: 4.8, description: 'Urban park in New York City.', visitDuration: 180, priceLevel: 1, interests: ['Nature', 'Photography', 'Romance'] },
      { id: 'statue_of_liberty', name: 'Statue of Liberty', cityId: 'nyc', rating: 4.7, description: 'Colossal neoclassical sculpture on Liberty Island.', visitDuration: 240, priceLevel: 2, interests: ['History', 'Architecture'] },
      { id: 'met_museum', name: 'The Metropolitan Museum of Art', cityId: 'nyc', rating: 4.9, description: 'The largest art museum in the Americas.', visitDuration: 240, priceLevel: 2, interests: ['Art', 'Museums', 'History'] },
      { id: 'times_square', name: 'Times Square', cityId: 'nyc', rating: 4.6, description: 'Major commercial intersection and tourist destination.', visitDuration: 90, priceLevel: 1, interests: ['Nightlife', 'Photography', 'Culture', 'Shopping'] },
      
      // Goa
      { id: 'baga_beach', name: 'Baga Beach', cityId: 'goa', rating: 4.5, description: 'Popular beach known for its nightlife and water sports.', visitDuration: 240, priceLevel: 2, interests: ['Nature', 'Nightlife', 'Food', 'Culture'] },
      { id: 'basilica_bom_jesus', name: 'Basilica of Bom Jesus', cityId: 'goa', rating: 4.8, description: 'UNESCO World Heritage site holding the mortal remains of St. Francis Xavier.', visitDuration: 120, priceLevel: 1, interests: ['History', 'Architecture', 'Religion'] },
      { id: 'dudhsagar_falls', name: 'Dudhsagar Falls', cityId: 'goa', rating: 4.7, description: 'Four-tiered waterfall located on the Mandovi River.', visitDuration: 300, priceLevel: 1, interests: ['Nature', 'Photography'] },

      // Bihar
      { id: 'mahabodhi_temple', name: 'Mahabodhi Temple', cityId: 'bihar', rating: 4.9, description: 'Ancient Buddhist temple in Bodh Gaya, UNESCO World Heritage site.', visitDuration: 180, priceLevel: 1, interests: ['History', 'Religion', 'Culture', 'Architecture'] },
      { id: 'nalanda_university', name: 'Nalanda University Ruins', cityId: 'bihar', rating: 4.8, description: 'Ruins of the ancient center of learning.', visitDuration: 240, priceLevel: 1, interests: ['History', 'Culture', 'Photography'] },
      { id: 'vishnupad_temple', name: 'Vishnupad Temple', cityId: 'bihar', rating: 4.6, description: 'Ancient temple in Gaya dedicated to Lord Vishnu.', visitDuration: 120, priceLevel: 1, interests: ['Religion', 'History', 'Culture'] },

      // Uttarakhand
      { id: 'badrinath_temple', name: 'Badrinath Temple', cityId: 'uttarakhand', rating: 4.9, description: 'A Hindu temple dedicated to Lord Vishnu, part of the Char Dham pilgrimage.', visitDuration: 180, priceLevel: 1, interests: ['Religion', 'History', 'Culture', 'Nature'] },
      { id: 'valley_of_flowers', name: 'Valley of Flowers', cityId: 'uttarakhand', rating: 4.9, description: 'National park known for its meadows of endemic alpine flowers.', visitDuration: 480, priceLevel: 1, interests: ['Nature', 'Photography'] },
      { id: 'naini_lake', name: 'Naini Lake', cityId: 'uttarakhand', rating: 4.7, description: 'A natural freshwater lake situated amidst the town of Nainital.', visitDuration: 150, priceLevel: 2, interests: ['Nature', 'Romance', 'Photography'] }
    ];

    console.log(`Creating ${cities.length} cities...`);
    for (const city of cities) {
      await session.run(
        'MERGE (c:City {id: $id}) SET c.name = $name, c.country = $country',
        city
      );
    }
    console.log('✓ Cities created');

    console.log(`Creating ${interests.length} interests...`);
    for (const interest of interests) {
      await session.run(
        'MERGE (i:Interest {id: toLower($name)}) SET i.name = $name',
        { name: interest }
      );
    }
    console.log('✓ Interests created');

    console.log(`Creating ${places.length} places and tagging interests...`);
    let placeCount = 0;
    for (const place of places) {
      const { id, name, cityId, rating, description, visitDuration, priceLevel, interests: placeInterests } = place;
      await session.run(
        `
        MERGE (p:Place {id: $id})
        SET p.name = $name, p.rating = $rating, p.description = $description, p.visitDuration = $visitDuration, p.priceLevel = $priceLevel, p.cityId = $cityId
        WITH p
        MATCH (c:City {id: $cityId})
        MERGE (p)-[:LOCATED_IN]->(c)
        MERGE (c)-[:CONTAINS]->(p)
        `,
        { id, name, cityId, rating, description, visitDuration, priceLevel }
      );
      
      for (const interest of placeInterests) {
        await session.run(
          `
          MATCH (p:Place {id: $placeId})
          MATCH (i:Interest {id: toLower($interestName)})
          MERGE (p)-[:HAS_TAG]->(i)
          `,
          { placeId: id, interestName: interest }
        );
      }
      placeCount++;
    }
    console.log(`✓ Created ${placeCount} places and tags`);

    console.log('Creating NEAR geographical relationships...');
    const nearRels = [
      // Mumbai
      { start: 'gateway_of_india', end: 'taj_mahal_palace', distanceMinutes: 5 },
      { start: 'gateway_of_india', end: 'colaba_causeway', distanceMinutes: 15 },
      { start: 'gateway_of_india', end: 'marine_drive', distanceMinutes: 20 },
      // Delhi
      { start: 'india_gate', end: 'red_fort', distanceMinutes: 30 },
      { start: 'qutub_minar', end: 'lotus_temple', distanceMinutes: 25 },
      // Tokyo
      { start: 'shibuya_crossing', end: 'meiji_jingu', distanceMinutes: 20 },
      { start: 'tokyo_tower', end: 'akihabara', distanceMinutes: 35 },
      // Kyoto
      { start: 'kinkakuji', end: 'arashiyama', distanceMinutes: 30 },
      // Paris
      { start: 'louvre', end: 'musee_orsay', distanceMinutes: 15 },
      { start: 'musee_orsay', end: 'eiffel', distanceMinutes: 30 },
      { start: 'louvre', end: 'notre_dame', distanceMinutes: 20 },
      { start: 'notre_dame', end: 'eiffel', distanceMinutes: 45 },
      // London
      { start: 'london_eye', end: 'borough_market', distanceMinutes: 25 },
      { start: 'british_museum', end: 'tower_of_london', distanceMinutes: 35 },
      // Rome
      { start: 'colosseum', end: 'pantheon', distanceMinutes: 20 },
      { start: 'pantheon', end: 'trevi_fountain', distanceMinutes: 10 },
      // NYC
      { start: 'times_square', end: 'central_park', distanceMinutes: 15 },
      { start: 'met_museum', end: 'central_park', distanceMinutes: 10 },
      { start: 'times_square', end: 'met_museum', distanceMinutes: 25 },
      // Goa
      { start: 'baga_beach', end: 'basilica_bom_jesus', distanceMinutes: 45 },
      { start: 'basilica_bom_jesus', end: 'dudhsagar_falls', distanceMinutes: 90 },
      // Bihar
      { start: 'mahabodhi_temple', end: 'vishnupad_temple', distanceMinutes: 30 },
      { start: 'mahabodhi_temple', end: 'nalanda_university', distanceMinutes: 150 },
      // Uttarakhand
      { start: 'naini_lake', end: 'badrinath_temple', distanceMinutes: 360 }
    ];

    for (const rel of nearRels) {
      await session.run(
        `
        MATCH (a:Place {id: $start}), (b:Place {id: $end})
        MERGE (a)-[r1:NEAR]->(b) SET r1.distanceMinutes = $distance
        MERGE (b)-[r2:NEAR]->(a) SET r2.distanceMinutes = $distance
        `,
        { start: rel.start, end: rel.end, distance: rel.distanceMinutes }
      );
    }
    console.log(`✓ Created ${nearRels.length * 2} relationships`);
    console.log('Seed complete.');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await session.close();
    await closeDriver();
  }
}

seed();
