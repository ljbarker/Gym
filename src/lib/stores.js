import { writable } from 'svelte/store';

export const user = writable(false)
export const name = writable([])
export const program = writable([])
export const workouts = writable([]);
export const exerciseName = writable([]);
export const muscleGroup = writable([]);
export const numSets = writable([]);
export const numReps = writable([]);
export const weightPercentage = writable([]);
export const accessToken = writable([]);