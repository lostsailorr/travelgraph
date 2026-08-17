require('dotenv').config({ path: '.env.local' });
const { getPlaceDetails } = require('./lib/recommendations');

async function test() {
  try {
    const details = await getPlaceDetails('louvre');
    console.log(details);
  } catch (err) {
    console.error('Error fetching place details:', err);
  }
}
test();
