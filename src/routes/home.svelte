<script>
    import supabase from '$lib/db'
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition'
    import { name, program } from '$lib/stores'
    import { onMount } from 'svelte';
    import { user } from '../lib/stores';

    let menuvis = false;

    onMount(() => {
        getName()
        getprogram()
    })

    async function getName(){
        const {data, error} = await supabase.from('profileinfo').select('name')
        if(error){
            return console.error(error);
        }
        try {
            name.set(data[0].name)
        } catch (error) {
            console.error(error)
        }
    } 

    async function getprogram(){
        const {data, error} = await supabase.from('profileinfo').select('program')
        if(error){
            return console.error(error);
        }
        try {
            program.set(data[0].program)
        } catch (error) {
            console.error(error)
        }
    } 

    async function logOut() {
        user.set(false)
        name.set("loading...")
        program.set("loading...")
        const { error } = await supabase.auth.signOut()
        if(error){
            alert(error.message)
        } else {
            goto("/signIn")
        }
    }

    function dispWorkout(target){
        if(target == $program){
            goto("/options/"+target)
        } else {
            alert("Sorry you do not have permission to view this workout program.")
        }
    }

</script>

<main class="bg-gray-200 pb-3">
    <nav class="bg-gray-800 sm:mb-5 mb-2">
        <div class="px-2">
            <div class="relative flex items-center justify-between h-16">

                <div>
                    <button on:click={ () => goto("/home")} class="ml-2 text-lg italic text-white font-bold">Major League Performance</button>
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

    <div class="text-2xl font-bold text-center">
        Welcome {$name}!
    </div>

    <div class="p-5">
        <div class="grid grid-cols-3 gap-3 py-3 rounded-lg shadow-md">
            <div class="text-center sm:p-5 p-1 sm:text-base text-sm text-red-500 bg-gray-800 rounded-full">
                <button type="button" on:click={() => dispWorkout("power")}>Power Lifting</button>
            </div>

            <div class="text-center sm:p-5 p-1 sm:text-base text-sm text-red-500 bg-gray-800 rounded-full">
                <button type="button" on:click={() => dispWorkout("weight")}>Weight Lifting</button>
            </div>

            <div class="text-center sm:p-5 p-1 sm:text-base text-sm text-red-500 bg-gray-800 rounded-full">
                <button type="button" on:click={() => dispWorkout("general")}>General Fitness</button>
            </div>

            <div class="text-center sm:p-5 p-1 sm:text-base text-sm text-red-500 bg-gray-800 rounded-full">
                <button type="button" on:click={() => dispWorkout("crossfit")}>Crossfit</button>
            </div>

            <div class="text-center sm:p-5 p-1 sm:text-base text-sm text-red-500 bg-gray-800 rounded-full">
                <button type="button" on:click={() => dispWorkout("sports")}>Sports Training</button>
            </div>

            <div class="text-center sm:p-5 p-1 sm:text-base text-sm text-red-500 bg-gray-800 rounded-full">
                <button type="button" on:click={() => dispWorkout("loss")}>Weight Loss</button>
            </div>
        </div>
    </div>
</main>