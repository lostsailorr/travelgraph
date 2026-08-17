require('dotenv').config({ path: '.env.local' });
import { getPlaceDetails } from './lib/recommendations';

async function test() {
  try {
    const res = await getPlaceDetails('louvre');
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
test();
