<script>
    import supabase from '$lib/db'
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition'
    import Workout from '../../components/workout.svelte'
    import { user, program, workouts, exerciseName, muscleGroup, numSets, numReps, weightPercentage } from "$lib/stores";

    let menuvis = false;
    let formVis = false;
    let editExisting = false;
    let editvis = checkAdmin();
    editvis.then(function(result){
        editvis = result
    });

    async function logOut() {
        const { error } = await supabase.auth.signOut()
        if(error){
            alert(error.message)
        } else {
            goto("/signIn")
        }
    }

    async function checkAdmin(){
        const { data, error } = await supabase
        .from('admins')
        .select('user_id')

        if(error){
            console.error(error)
        }

        for(var i = 0; i < data.length; i++){
            if(data[i].user_id == $user.id){
                return true;
            }
        }
        return false;
    }

    async function addWorkout(){
        if($exerciseName.length == 0 || $muscleGroup.length == 0 || $numSets.length == 0 || $numReps.length == 0 || $weightPercentage.length == 0) {
            alert("Please make sure all fields are filled out.")
        } else if(editExisting) {
            const { error } = await supabase
            .from('workoutoptions')
            .update({muscleGroup: $muscleGroup, numSets: $numSets, numReps: $numReps, weightPercentage: $weightPercentage})
            .match({exerciseName: $exerciseName})

            if(error){
                console.error(error)
            }

            program.set([])
            exerciseName.set([])
            muscleGroup.set([])
            numSets.set([])
            numReps.set([])
            weightPercentage.set([])
            formVis = false
            editExisting = false

            loadWorkouts()
        } else {
            const { error } = await supabase
            .from('workoutoptions')
            .insert([{program: 'general', exerciseName: $exerciseName, muscleGroup: $muscleGroup, numSets: $numSets, numReps: $numReps, weightPercentage: $weightPercentage}])

            if(error){
                console.error(error.message)
            }
            program.set([])
            exerciseName.set([])
            muscleGroup.set([])
            numSets.set([])
            numReps.set([])
            weightPercentage.set([])
            formVis = false
            editExisting = false

            loadWorkouts()
        }
    }

    const loadWorkouts = async () => {
        const {data, error} = await supabase
        .from('workoutoptions')
        .select()
        .eq('program', 'general')

        if(error){
            console.error(error.message)
        }
        workouts.set(data)
    }
    loadWorkouts()
</script>

<main class="bg-gray-200 pb-3">
    <nav class="bg-gray-800">
        <div class="px-2">
            <div class="relative flex items-center justify-between h-16">

                <div>
                    <button on:click={() => goto("/home")} class="ml-2 text-lg italic text-white font-bold">Major League Performance</button>
                </div>

                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <!-- Profile dropdown -->
                    <div class="mx-5 relative">
                    <div>
                        <button type="button" on:click={() => {menuvis=!menuvis}} on:blur={() => {menuvis=!menuvis}} class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                        <span class="sr-only">Open user menu</span>
                        <img class="h-8 w-8 rounded-full" src="../../static/mlpLogo.png" alt="">
                        </button>
                    </div>

                    {#if menuvis}
                    <div transition:fade|local class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                        <button on:click={() => goto("/profile")} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</button>
                        <button on:click={logOut} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</button>
                    </div>
                    {/if}
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <div class="flex justify-center">
        <div class="sm:my-5 my-2 text-center text-2xl text-black font-bold">
            General Fitness
        </div>
        
        {#if editvis}
        <div class="my-2 self-center">
            <button class="py-1" on:click={() => {if(editExisting){return} else{exerciseName.set([]);muscleGroup.set([]);numSets.set([]);numReps.set([]);weightPercentage.set([]);formVis=!formVis}}}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" style=" fill:#000000;">
                    <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z">
                    </path>
                </svg>
            </button>
        </div>
        {/if}
    </div>

    {#if (formVis || editExisting)}
    <div class="flex flex-col px-6 mx-auto">
        {#if !editExisting}
        <div class="text-lg">
            Exercise Name:
        </div>
        <input type="text" bind:value={$exerciseName} class="rounded-sm bg-gray-200 max-w-xs focus:outline-none focus:border-red-500 focus:ring-red-500 ">
        {/if}

        <div class="text-lg">
            Muscle Group:
        </div>
        <input type="text" bind:value={$muscleGroup} class="rounded-sm bg-gray-200 max-w-xs focus:outline-none focus:border-red-500 focus:ring-red-500 ">

        <div class="text-lg">
            Number of Sets:
        </div>
        <input type="text" bind:value={$numSets} class="rounded-sm bg-gray-200 max-w-xs focus:outline-none focus:border-red-500 focus:ring-red-500 ">

        <div class="text-lg">
            Number of Reps:
        </div>
        <input type="text" bind:value={$numReps} class="rounded-sm bg-gray-200 max-w-xs focus:outline-none focus:border-red-500 focus:ring-red-500 ">

        <div class="text-lg">
            Weight Percentage:
        </div>
        <input type="text" bind:value={$weightPercentage} class="rounded-sm bg-gray-200 max-w-xs focus:outline-none focus:border-red-500 focus:ring-red-500 ">
    </div>

        {#if formVis && !editExisting}
        <div class="flex gap-1 ml-6 py-2">
            <button class="rounded-xl text-sm hover:bg-red-400 bg-red-500 text-white p-2" on:click={addWorkout}>Add</button>
            <button class="rounded-xl text-sm hover:bg-red-400 bg-red-500 text-white p-2" on:click={() => {formVis=!formVis}}>Cancel</button>
        </div>
        {/if}
        
        {#if editExisting}
        <div class="flex gap-1 ml-6 py-2">
            <button class="rounded-xl text-sm hover:bg-red-400 bg-red-500 text-white p-2" on:click={addWorkout}>Save</button>
            <button class="rounded-xl text-sm hover:bg-red-400 bg-red-500 text-white p-2" on:click={() => {editExisting=!editExisting; formVis=!formVis}}>Cancel</button>
        </div>
        {/if}
    {/if}

    {#if !formVis}
    <div class="">
        <table class="mx-auto">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-black">Exercise Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-black">Targeted Muscle Group</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-black">Number of Sets</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-black">Number of Repetitions</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-black">Percentage of Maximum</th>
              {#if editvis}
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-black">Edit</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-black">Delete</th>
              {/if}
            </tr>
            {#each $workouts as workout}
            <Workout on:delete={loadWorkouts} workout={workout} bind:editExisting={editExisting} bind:formVis={formVis} bind:rowId={workout.id} editvis={editvis}/>
            {/each}
        </table>
    </div>
    {/if}
    
</main>