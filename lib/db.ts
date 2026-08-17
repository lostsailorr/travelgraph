import neo4j, { Driver } from 'neo4j-driver';

let driver: Driver | null = null;

export function getDriver() {
  if (!driver) {
    const uri = process.env.COGNODB_URI || 'bolt://localhost:7687';
    const user = process.env.COGNODB_USERNAME || 'cognodb';
    const password = process.env.COGNODB_PASSWORD || 'password';

    driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
      maxConnectionPoolSize: 100,
      connectionTimeout: 15000,
    });
  }
  return driver;
}

export async function closeDriver() {
  if (driver) {
    await driver.close();
    driver = null;
  }
}
