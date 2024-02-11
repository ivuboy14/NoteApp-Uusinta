<script>
	// @ts-nocheck
	import { notes, zalupaid, zalupaCourse } from "$lib/store.js";
	import Suodatin from "../Suodatin.svelte";

	let storeNotes = [];
	let KurssiNimi;
	let sessionStart = false;

	let noteKurssit = {};
	let storeId;

	let sessioEnd = [];
	let sessioTeksti = "";
	let sessioId = "";
	let text = "";
	let sessioNotes = [];

	zalupaid.subscribe((value) => {
		storeId = value;
	});

	notes.subscribe((value) => {
		//console.log("Subscribed value:", value);
		storeNotes = value;
		console.log("storeNotes:", storeNotes);
	});

	zalupaCourse.subscribe((value) => {
		KurssiNimi = value;
	});

	function moreNotes() {
		if (text.length <= 0) {
			window.alert("Et ole luonut muistiinpanoa!");
		} else {
			sessionStart = true;
			sessioId = storeId;
			sessioTeksti += text;
			sessioTeksti += " ";
			sessioEnd.push(text);
			sessioNotes = [...sessioEnd];
			console.log(sessioTeksti);

			text = "";
		}
	}

	function closeSession() {
		if (!sessionStart) {
			window.alert("There is no session started");
		} else {
			sessionStart = false;
			noteKurssit = {
				id: storeNotes.length + 1,
				text: sessioTeksti,
				course: {
					id: sessioId,
					name: KurssiNimi
				},
				timestamp: new Date().toISOString()
			};
			console.log(noteKurssit);
			notes.update((n) => {
				n.push(noteKurssit);
				return n;
			});
			localStorage.setItem("notes", JSON.stringify(storeNotes));
			sessioEnd = [];
		}
	}
</script>

<div class="note-container">
	<h2 class="note-title">Luo muistiinpano</h2>

	{#if !sessionStart}
		<Suodatin />
	{:else}
		<p>Kurssi: {KurssiNimi}</p>
	{/if}

	<textarea
		bind:value={text}
		placeholder="Lisää teksti"
		class="note-textarea"
	
	></textarea>




	{#if sessionStart}
		{#each sessioNotes as sf}
			<p>{sf}</p>
		{/each}
	{/if}
</div>

<div class="div2">
	<button on:click={moreNotes} id="save" class="note-button1">Save</button>
	<button on:click={closeSession} class="note-button2">Back</button>
</div>




<style>
	.note-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 40vw;
		margin: auto;
	}

	.note-textarea {
		width: 250px;
		height: 200px;
		margin-bottom: 20px;
		border: groove 1px #4CAF50;
		border-radius: 5px;
	}

	.note-button1 {
		width: 70px;
		padding: 7px;
		border: none;
		border-radius: 5px;
		background-color: #4CAF50;
		color: white;
		cursor: pointer;
		margin-left: auto;
		margin-right: 10px;
	}

	.note-button2 {
		width: 70px;
		padding: 7px;
		border: none;
		border-radius: 5px;
		background-color: #4CAF50;
		color: white;
		cursor: pointer;
		margin-right: auto;
		margin-left: 10px;
	
	}

	.div2{
		display: flex;
		justify-content: space-between;
		
	}
</style>
