<script>
	//@ts-nocheck
	import { onMount } from "svelte";
	import { courses, zalupaCourse, zalupaid } from "$lib/store.js";
	let storeCourses = [];
	let storeId = "all";

	onMount(() => {
		zalupaid.set("all");
	});

	zalupaid.subscribe((value) => {
		storeId = value;
	});
	
	courses.subscribe((value) => {
		storeCourses = value;
		console.log("storeCourses:", storeCourses);
	});

	$: {
		zalupaid.set(storeId);

		if (Array.isArray(storeCourses) && storeCourses.length > 0) {
			let selectedCourse = storeCourses.find((course) => course.id === storeId);

			if (selectedCourse) {
				zalupaCourse.set(selectedCourse.name);
			}
		}
	}
</script>

<div id="container">
	<section>
		<select name="menu" id="menu" bind:value={storeId}>
			<option value="all">Kaikki kurssit</option>
			{#if storeCourses.length > 0}
				{#each storeCourses as result}
					<option value={result.id}>{result.name}</option>
				{/each}
			{/if}
		</select>
	</section>
</div>

<style>
	#container {
		display: grid;
		margin-bottom: 3vh;
		grid-template-columns: auto;
		text-align: center;
	}


	#menu {
		background-color:#4CAF50;
		color: white;
		padding: 10px;
		font-size: 16px;
		border: none;
		cursor: pointer;
		width: 150px;
		border-radius: 5px;
		margin-left: 10px;
	}
</style>
