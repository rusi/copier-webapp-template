<script lang="ts">
	import { onMount } from 'svelte';

	let randomNumber: number = 0;

	async function fetchRandomNumber() {
		try {
			const response = await fetch('/api/v1/random');
			const data = await response.json();
			randomNumber = data.number;
		} catch (error) {
			console.error('Error fetching random number:', error);
		}
	}

	onMount(() => {
		fetchRandomNumber(); // Initial fetch
		const interval = setInterval(fetchRandomNumber, 1000);

		return () => {
			clearInterval(interval); // Cleanup on component destroy
		};
	});
</script>

<div class="text-center">
	<p class="text-2xl font-bold">
		Random Number: {randomNumber}
	</p>
</div>
