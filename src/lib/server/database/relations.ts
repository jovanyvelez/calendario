import { relations } from "drizzle-orm/relations";
import { categories, events } from "./schema";

export const eventsRelations = relations(events, ({one}) => ({
	category: one(categories, {
		fields: [events.categoryId],
		references: [categories.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	events: many(events),
}));