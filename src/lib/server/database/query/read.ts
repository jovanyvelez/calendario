import { db } from '$lib/server/database/index';

export async function eventos() {
	const eventos = await db.query.categories.findMany({
		with: {
			events: true
		}
	});
	console.log(JSON.stringify(eventos,null,2));
	return eventos;
}
