<script>
	// @ts-nocheck
	import Suodatin from "../Suodatin.svelte";
	import { notes, zalupaid } from "$lib/store.js";
	

	let storeId;
	let storeNotes = [];
	let suodattu_note = [];
	let storeCourses = [];



	notes.subscribe((value) => {
		//console.log("Subscribed value:", value);
		storeNotes = value;
		console.log("storeNotes:", storeNotes);
	});


	
	zalupaid.subscribe((value) => {
		storeId = value;
	});

	function zalupendra(id) {
		storeNotes = storeNotes.filter((note) => note.id !== id);
		notes.set(storeNotes);
		localStorage.setItem("notes", JSON.stringify(storeNotes));
	}

	$: {
		suodattu_note =
			storeId === "all"
				? storeNotes
				: storeNotes.filter((note) => note.course && note.course.id === storeId);
	}
</script>



<Suodatin />



{#if storeNotes.length > 0}
	{#if suodattu_note.length > 0}
		{#each suodattu_note as note (note.id)}
			<div class="myNotes">
				{#if note.course}
					<h2>{note.course.name}</h2>
					<p>{note.text}</p>
					<p>{note.timestamp}</p>
					<button on:click={() => zalupendra(note.id)}>Delete</button>
				{/if}
			</div>
		{/each}
	{:else}
		<div>Muistiinpanoja ei ole löytynyt</div>
	{/if}
{:else}
	<div>Muistiinpanoja ei ole löytynyt</div>
{/if}

<style>
	.myNotes {
		display: grid;
		border-style: solid;
		border-color: grey;
		margin-bottom: 15px;
		grid-template-columns: 100fr 1fr;
	}

	.myNotes p,
	h2 {
		margin-left: 10px;
	}

	button {
		grid-row: 1;
		cursor: pointer;
		grid-column: 2;
		width: 60px;
		height: 30px;
		background-color: orangered;
		color: white;
		border-style: none;

		

	}
</style>
