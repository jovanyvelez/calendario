import { eventos } from '$lib/server/database/query/read';

export async function load() {
	try {
		const activities = await eventos();
		return { activities };
	} catch (error) {
		console.error(error);
		throw new Error('Ocurrio un error con la base de datos');
	}
}
