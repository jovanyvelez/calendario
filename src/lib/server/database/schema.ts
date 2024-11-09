import { sqliteTable,  integer, text, numeric } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
	id: integer().primaryKey({ autoIncrement: true }),
	username: text().notNull(),
	password: text().notNull(),
	role: text().notNull(),
});

export const events = sqliteTable("events", {
	id: integer().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	description: text(),
	eventType: text("event_type").notNull(),
	date: numeric().notNull(),
	createdAt: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`),
	categoryId: integer("category_id").references(() => categories.id),
});

export const categories = sqliteTable("categories", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	description: text(),
});

export const drizzleMigrations = sqliteTable("__drizzle_migrations", {
});
