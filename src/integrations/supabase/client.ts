// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kfmpoinsxobrhxtiwbwr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmbXBvaW5zeG9icmh4dGl3YndyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTc1NDcsImV4cCI6MjA2Mzc3MzU0N30.52dIn4L7XSWe6xMLgpAuABYZ1nHGcgjlxByKtzzkxlI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);