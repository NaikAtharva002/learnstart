import { supabase } from './src/lib/supabase';

async function checkSchema() {
    const tables = ['categories', 'businesses', 'phases', 'videos', 'tasks', 'problems'];
    for (const table of tables) {
        const { data, error } = await supabase.from(table).select('*').limit(1);
        if (error) {
            console.error(`Error fetching from ${table}:`, error.message);
        } else {
            console.log(`Table ${table} exists. Columns:`, data.length > 0 ? Object.keys(data[0]) : 'Empty table');
        }
    }
}

checkSchema();
