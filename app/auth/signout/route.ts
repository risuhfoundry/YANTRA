import { redirect } from 'next/navigation';
import { hasSupabaseEnv } from '@/src/lib/supabase/env';
import { createClient } from '@/src/lib/supabase/server';

export async function GET() {
  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  redirect('/login?message=Secure%20session%20closed.%20Return%20when%20you%20are%20ready%20to%20continue.&kind=info');
}
