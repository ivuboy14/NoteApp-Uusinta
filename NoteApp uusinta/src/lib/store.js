import { writable, derived } from "svelte/store";

let parsedNotes = [];
let parsedCourses = [];

if (typeof window !== "undefined") {
	const initNotes = localStorage.getItem("notes");
	parsedNotes = initNotes ? JSON.parse(initNotes) : [];
}

export let notes = writable(parsedNotes);

notes.subscribe((value) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("notes", JSON.stringify(value));
	}
});

if (typeof window !== "undefined") {
	const initCourses = localStorage.getItem("courses");
	parsedCourses = initCourses ? JSON.parse(initCourses) : [];
}

export let courses = writable(parsedCourses);

derived(courses, ($courses) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("courses", JSON.stringify($courses));
	}
});

export const zalupaid = writable("all");
export const zalupaCourse = writable("");
