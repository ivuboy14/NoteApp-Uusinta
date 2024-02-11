<script>
	// @ts-nocheck
	import { courses } from "$lib/store.js";
	let storeCourses;
	let course_info = false;
	let new_course = {};
	let course_name = "";


	function lisaaKurssi() {
		if (course_name.length <= 0) {
			alert("Et ole kirjoittanut kurssin nimeä!");
		} else {
			new_course = {
				id: storeCourses.length + 1,
				name: course_name
			};
			courses.update((n) => {
				n.push(new_course);
				return n;
			});
			console.log(new_course);

			course_name = "";
			course_info = true;
		}
	}

	courses.subscribe((value) => {
		storeCourses = value;
		console.log("storeCourses:", storeCourses);

		if (typeof window !== "undefined") {
			localStorage.setItem("courses", JSON.stringify(storeCourses));
		}
	});
	
</script>

<div>
	<h1>Lisää opintojakso</h1>
	<textarea
		bind:value={course_name}
		placeholder="Luo opintojakso"
	></textarea>

	<button on:click={lisaaKurssi} class="add-button">Lisää</button>

	{#if course_info}
		<p>Kurssi {new_course.name} lisätty, id {new_course.id}</p>
	{/if}
</div>

<style>
	div {
		display: grid;
		place-items: center;
		gap: 10px;
	}

	.add-button {
		background-color: #4CAF50;
		color: white;
		padding: 10px;
		font-size: 16px;
		border: none;
		cursor: pointer;
		width: 100px;
		border-radius: 5px;
	}
	p{
		font-size: 20px;
		color: black;
	}
</style>
