import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ywtkfbsyegvvninwopdp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5ODgwMCwiZXhwIjoxOTU4OTc0ODAwfQ.SuoCbs_OgPsTykto9cHJCz6H3KV6jRj8DxQZMcx0Nd0'
)

export default supabase
