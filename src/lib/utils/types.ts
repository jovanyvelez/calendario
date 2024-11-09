export type Activities = {
	id: number;
	name: string;
	description: string | null;
	events: Event[];
}[];

export type Event = {
	id: number;
	title: string;
	description: string | null;
	eventType: string;
	date: string;
	createdAt: string | null;
	catgoryId: number;
};
