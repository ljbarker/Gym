<script>
    import { program, exerciseName, muscleGroup, numSets, numReps, weightPercentage } from "$lib/stores";
    import supabase from "../lib/db";
    import { createEventDispatcher } from 'svelte';
    
    export let workout;
    export let editExisting;
    export let formVis;
    export let rowId;
    export let editvis;

    const dispDelete = createEventDispatcher();

    const delHandler = () => dispDelete('delete');

    async function openEdit(){
        formVis = !formVis
        editExisting = !editExisting
        const { data, error } = await supabase
        .from("workoutoptions")
        .select()
        .eq("id", rowId)

        program.set(data[0].program)
        exerciseName.set(data[0].exerciseName)
        muscleGroup.set(data[0].muscleGroup)
        numSets.set(data[0].numSets)
        numReps.set(data[0].numReps)
        weightPercentage.set(data[0].weightPercentage)

        if(error){
            console.error(error.message)
        }
    }

    async function deleteRow(){
        const { data, error } = await supabase
        .from('workoutoptions')
        .delete()
        .match({ id: rowId })

        delHandler()
    }

</script>

<tr>
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {workout.exerciseName}
    </td>

    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {workout.muscleGroup}
    </td>

    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {workout.numSets}
    </td>

    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {workout.numReps}
    </td>

    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {workout.weightPercentage}
    </td>

    {#if editvis == true}
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <button class="py-1" on:click={() => {openEdit()}}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" style=" fill:#000000;">
                <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z">
                </path>
            </svg>
        </button>
    </td>

    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
        <button class="py-1" on:click={deleteRow}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" style=" fill:#000000;">
                <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z">
                </path>
            </svg>
        </button>
    </td>
    {/if}
</tr>