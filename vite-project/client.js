import { createClient } from "@supabase/supabase-js";


export const supabase = createClient(
  "https://fjkkzedcccdrqnqyhjwd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqa2t6ZWRjY2NkcnFucXloandkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzNzQ3NjgsImV4cCI6MjAxNjk1MDc2OH0.YaWIyKB5Q94NzU9HqkK6eB7lJn7HWzIGt-XLC3FxoP0"
);
