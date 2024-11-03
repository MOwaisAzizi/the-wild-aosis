
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sybptvczkzrjxwebffff.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5YnB0dmN6a3pyanh3ZWJmZmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NTMwNDksImV4cCI6MjA0NjEyOTA0OX0.t8rYo3e8v2ZD-8mCuT-sPHdLPjeqOygvpNjIxzZvh7c"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase