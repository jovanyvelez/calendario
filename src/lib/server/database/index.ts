import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './data';

if(!env.DATABASE_URL) throw new Error('DATABASE_URL no existe ')

if (!dev && !env.DATABASE_TOKEN) throw new Error('DATABASE_AUTH_TOKEN no fue definida en entorno');

const client = createClient({ url: env.DATABASE_URL, token: env.DATABASE_TOKEN });

export const db = drizzle(client, {schema, casing: 'snake_case' });
