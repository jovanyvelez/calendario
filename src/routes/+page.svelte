<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { Activities, Event } from '$lib/utils/types';

	const { data }: { data: { activities: Activities } } = $props();
	const { activities } = data;

	// Estado para controlar qué categorías están expandidas
	let expandedCategories = $state(new Set<number>());

	// Función para alternar la visibilidad de los eventos de una categoría
	function toggleCategory(categoryId: number) {
		if (expandedCategories.has(categoryId)) {
			expandedCategories.delete(categoryId);
		} else {
			expandedCategories.add(categoryId);
		}
		expandedCategories = new Set(expandedCategories); // Trigger reactivity
	}

	// Función para formatear la fecha
	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="events-container">
	{#each activities as activity (activity.id)}
		{#if activity.events.length > 0}
			<div class="category-card">
				<div
					class="category-header"
					onclick={() => toggleCategory(activity.id)}
					onkeydown={(e) => e.key === 'Enter' && toggleCategory(activity.id)}
					role="button"
					tabindex="0"
				>
					<h2>{activity.name}</h2>
					<div class="toggle-icon" class:expanded={expandedCategories.has(activity.id)}>▼</div>
				</div>
				<p class="category-description">{activity.description}</p>

				{#if expandedCategories.has(activity.id)}
					<div class="events-grid" transition:slide>
						{#each activity.events as event (event.id)}
							<div class="event-card">
								<h3>{event.title}</h3>
								<p class="event-description">{event.description}</p>
								<div class="event-details">
									<span class="event-type">{event.eventType}</span>
									<span class="event-date">{formatDate(event.date)}</span>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	{:else}
		<p>No hay eventos disponibles</p>
	{/each}
</div>

<style>
	.events-container {
		padding: 1rem;
	}

	.category-card {
		background-color: #f5f5f5;
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 1rem;
	}

	.category-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		padding: 0.5rem 0;
	}

	.category-header:hover {
		opacity: 0.8;
	}

	.toggle-icon {
		transition: transform 0.3s ease;
		font-size: 0.8rem;
		color: #666;
	}

	.toggle-icon.expanded {
		transform: rotate(180deg);
	}

	.category-card h2 {
		color: #333;
		margin: 0;
	}

	.category-description {
		color: #666;
		margin: 0.5rem 0 1.5rem 0;
	}

	.events-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}

	.event-card {
		background-color: white;
		border-radius: 6px;
		padding: 1rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease;
	}

	.event-card:hover {
		transform: translateY(-2px);
	}

	.event-card h3 {
		color: #2c3e50;
		margin-bottom: 0.5rem;
	}

	.event-description {
		color: #666;
		font-size: 0.9rem;
		margin-bottom: 1rem;
	}

	.event-details {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.85rem;
	}

	.event-type {
		background-color: #e9ecef;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		color: #495057;
	}

	.event-date {
		color: #6c757d;
	}
</style>
