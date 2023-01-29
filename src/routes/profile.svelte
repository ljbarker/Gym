<script>
    import supabase from '$lib/db'
    import { goto } from '$app/navigation'
    import { fade } from 'svelte/transition'
    import { user, name, program } from '$lib/stores'
    import { onMount } from 'svelte';
    
    let menuvis = false;
    let edit = false;
    let tempName, tempprogram;

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

    async function save(user_id){
        const {data, eror } = await supabase.from('profileinfo').select();
        if(data.length == 0){
            const { error } = await supabase
            .from('profileinfo')
            .insert([{user_id, name: $name, program: $program}])

            if(error){
                console.error(error)
            }
        } else {
            const { error } = await supabase
            .from('profileinfo')
            .update({ name: $name, program: $program})
            .match({ user_id })

            if(error){
                console.error(error.message)
            }
        }
        edit = false
    }

    function toggleEdit(){
        tempName = $name
        tempprogram = $program
        edit=true
    }
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

    <div class="m-2 p-2 rounded-sm shadow-lg bg-white">
        <div class="text-black text-3xl font-bold">
            Your Profile
        </div>

        <div class="flex flex-col border-t border-t-gray-700 p-2">
            <div class="flex flex-col gap-1">
                <div class="">
                    Name:
                </div>
                {#if edit}
                <input type="text" bind:value={$name} class="rounded-sm bg-gray-200 max-w-xs focus:outline-none focus:border-red-500 focus:ring-red-500 ">
                {:else}
                <input type="text" value={$name} class="rounded-sm max-w-xs focus:outline-none" disabled>
                {/if}

                <div class="">
                    program:
                </div>
                {#if edit}
                <select name="program" bind:value={$program} class="rounded-sm bg-gray-200 max-w-xs focus:outline-none focus:border-red-500 focus:ring-red-500 ">
                    <option value="power">Power Lifting</option>
                    <option value="weight">Weight Lifting</option>
                    <option value="general">General Fitness</option>
                    <option value="crossfit">Crossfit</option>
                    <option value="sports">Sports Training</option>
                    <option value="loss">Weight Loss</option>
                </select>

                {:else}
                <select name="program" bind:value={$program} class="rounded-sm bg-white max-w-xs focus:outline-none focus:border-red-500 focus:ring-red-500 " disabled>
                    <option value="power">Power Lifting</option>
                    <option value="weight">Weight Lifting</option>
                    <option value="general">General Fitness</option>
                    <option value="crossfit">Crossfit</option>
                    <option value="sports">Sports Training</option>
                    <option value="loss">Weight Loss</option>
                </select>
                {/if}
            </div>
        </div>

        <div class="flex gap-1">
            <button class="rounded-xl text-sm hover:bg-red-400 bg-red-500 text-white p-2" on:click={toggleEdit}>Edit</button>
            <button class="rounded-xl text-sm hover:bg-red-400 bg-red-500 text-white p-2" on:click={() => save($user.id)}>Save</button>
        </div>

    </div>
</main>