<script>
  import supabase from '$lib/db'


  let uemail;
  let upass;

  async function signUp(){
    const { user, error } = await supabase.auth.signUp({
      email: uemail,
      password: upass,
    })
    if(error) {
      alert(error.message)
    } else {
      alert("Check your email to confirm your registration and sign in!")
    }
  }
</script>


<div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <img class="mx-auto h-12 w-auto" src="../../static/mlpLogo.png" alt="MLP Logo">
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Sign up for your account
    </h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" on:submit|preventDefault={signUp} method="POST">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div class="mt-1">
            <input id="email" name="email" type="email" autocomplete="email" required bind:value={uemail} class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm">
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="mt-1">
            <input id="password" name="password" type="password" autocomplete="current-password" required bind:value={upass} class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm">
          </div>
        </div>

        <div>
          <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Sign Up
          </button>
        </div>
      </form>

      <div class="font-medium text-red-600 hover:text-red-500 text-sm pt-2">
        <a href="/signIn">
          Already have an account?
        </a>
      </div>
    </div>
  </div>
</div>