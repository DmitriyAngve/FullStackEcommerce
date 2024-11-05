import { drizzle } from "drizzle-orm/node-postgres";
import pg, { Pool } from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool);
