import { defineConfig } from 'drizzle-kit';

if(!process.env.DATABASE_URL) throw new Error('DB_URL is required');
export default defineConfig({
  out: './drizzle',
  schema: './src/lib/server/database/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
  casing: 'snake_case',
  verbose: true,
  strict: true
});
