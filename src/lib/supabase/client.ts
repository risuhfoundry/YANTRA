'use client';

import { createBrowserClient } from '@supabase/ssr';
import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseEnv } from './env';

let browserClient: SupabaseClient | null = null;

export function createClient() {
  if (browserClient) {
    return browserClient;
  }

  const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();

  browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);

  return browserClient;
}

export function createTransientClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}
