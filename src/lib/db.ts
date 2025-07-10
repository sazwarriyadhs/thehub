import { Pool } from 'pg';

let pool: Pool;

// This is a workaround for Vercel's connection management in serverless environments.
// In a dev environment, it prevents creating too many connections during hot reloads.
if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false, 
    },
  });
} else {
  if (!global.dbPool) {
    global.dbPool = new Pool({
      connectionString: process.env.POSTGRES_URL,
    });
  }
  pool = global.dbPool;
}

export const db = pool;

declare global {
  var dbPool: Pool | undefined;
}
