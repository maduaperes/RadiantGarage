import { createClient } from '@supabase/supabase-js';

// substitui pelos dados do teu projeto no site do Supabase
const SUPABASE_URL = 'https://joblhghvipszcgmwujpv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvYmxoZ2h2aXBzemNnbXd1anB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMjc5MzgsImV4cCI6MjA3MjYwMzkzOH0.s2qdTK8IGsHQRBbExB37sHkBc_oj2QQrmMwy75RWecQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
