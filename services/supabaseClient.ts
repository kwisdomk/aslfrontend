
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const getSupabase = () => {
    if (supabaseUrl && supabaseAnonKey) {
        return createClient(supabaseUrl, supabaseAnonKey);
    }

    console.warn("Supabase credentials not found. App is running in offline mode.");
    return {
        from: () => ({
            select: () => new Promise(resolve => resolve({ data: [], error: null })),
            insert: () => new Promise(resolve => resolve({ data: [], error: { message: 'Offline mode' } })),
            update: () => new Promise(resolve => resolve({ data: [], error: { message: 'Offline mode' } })),
            delete: () => new Promise(resolve => resolve({ data: [], error: { message: 'Offline mode' } })),
        }),
    };
};


export const supabase = getSupabase();
