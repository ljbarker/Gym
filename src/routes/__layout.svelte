<script>
  import '../tailwind.css'
  import supabase from '$lib/db'
  import { user, accessToken } from '$lib/stores'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation';


    user.set(supabase.auth.user())

    supabase.auth.onAuthStateChange(( _, session) => {
      user.set(session?.user);
    });

    if($page.url.hash.includes("type=recovery")){
      let token = ""
      let index = $page.url.hash.indexOf("access_token=");
      for(let i = index+13; i < $page.url.hash.indexOf("&"); i++){
        token+=$page.url.hash[i];
      }
      accessToken.set(token);
      goto("./resPasForm");
    }
  </script>
  
<slot/>
