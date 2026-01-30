import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Lead {
  id?: string;
  email: string;
  name: string;
  company?: string;
  budget: string;
  authority: string;
  need: string;
  timeline: string;
  qualified: boolean;
  created_at?: string;
}
