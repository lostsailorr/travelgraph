const neo4j = require('neo4j-driver');
const pass = '57087ce2f15e95600fcb38e92b08e362';
const user = 'cognodb';

async function testConnection() {
  const uri = 'neo4j+s://db-a87fe167.databases.cognodb.com';
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, pass));
  try {
    const session = driver.session({ database: 'travelgraph' });
    await session.run('MATCH (n) RETURN n LIMIT 1');
    console.log('Success with database: travelgraph');
  } catch (err) {
    console.error('Failed with database travelgraph:', err);
  }
  
  try {
    const session2 = driver.session(); // Default database
    await session2.run('MATCH (n) RETURN n LIMIT 1');
    console.log('Success with default database');
  } catch (err) {
    console.error('Failed with default database:', err);
  }

  await driver.close();
}

testConnection();
