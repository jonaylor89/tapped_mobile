import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nddcfiqdtujydddzadon.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kZGNmaXFkdHVqeWRkZHphZG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTg2MDg0OTQsImV4cCI6MTk3NDE4NDQ5NH0.ruEWKr2sVajZnZcSYIlKPXLRfUVKd7UK23kCv2GHDzE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});