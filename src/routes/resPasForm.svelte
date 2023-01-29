<script>
    import supabase from '$lib/db';
    import { accessToken } from '$lib/stores';

    let newPass = "";

    async function updatePass(){
        const { error, data } = await supabase.auth.api
            .updateUser($accessToken, { password : newPass })

        if(error){
            console.error(error);
        }
    }
</script>

<main>
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <img class="mx-auto h-12 w-auto" src="../../static/mlpLogo.png" alt="Workflow">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enter New Password
          </h2>
        </div>
      
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form class="space-y-6" on:submit|preventDefault={updatePass} method="POST">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div class="mt-1">
                  <input id="pass" name="pass" type="password" autocomplete="pass" required bind:value={newPass} class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm">
                </div>
              </div>
      
              <div>
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Update Password
                </button>
              </div>
            </form>
        </div>
      </div>
</main>