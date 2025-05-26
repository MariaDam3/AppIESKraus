import { createClient } from '@supabase/supabase-js';

// Reemplaza estos valores por los de tu proyecto Supabase
const supabaseUrl = 'https://ujggmasksxftvnufnumz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqZ2dtYXNrc3hmdHZudWZudW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNTExNTcsImV4cCI6MjA2MzgyNzE1N30.bmoWaTTLe8o_UQP2BUXeSfbwZZ3RDT19lwDcsogvNuo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);