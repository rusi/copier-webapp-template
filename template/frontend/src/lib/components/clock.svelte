<script lang="ts">
	let time = new Date();

	// Update time every second
	setInterval(() => {
		time = new Date();
	}, 1000);
</script>

<div class="text-center">
	<p class="text-xl font-semibold">
		{time.toLocaleDateString()}
	</p>
	<p class="text-2xl font-bold">
		{time.toLocaleTimeString()}
	</p>
</div>
