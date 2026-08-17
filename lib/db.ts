import neo4j, { Driver } from 'neo4j-driver';

let driver: Driver | null = null;

export function getDriver() {
  if (!driver) {
    const uri = process.env.COGNODB_URI || 'bolt://localhost:7687';
    const user = process.env.COGNODB_USERNAME || 'cognodb';
    const password = process.env.COGNODB_PASSWORD || 'password';

    driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
      maxConnectionPoolSize: 50,
      connectionTimeout: 10000,
      maxTransactionRetryTime: 15000,
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

/**
 * Run a Cypher query with automatic retry on transient failures.
 * This handles CognoDB's intermittent connection drops gracefully.
 */
export async function runQuery(
  query: string,
  params: Record<string, unknown> = {},
  database = 'travelgraph',
  retries = 2
): Promise<any> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const d = getDriver();
    const session = d.session({ database });
    try {
      const result = await session.run(query, params);
      return result;
    } catch (error: any) {
      await session.close();
      if (attempt < retries && (error.code === 'ServiceUnavailable' || error.code === 'SessionExpired')) {
        // Reset the cached driver and retry
        driver = null;
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }
      throw error;
    } finally {
      await session.close();
    }
  }
}
