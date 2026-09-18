import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const schema = fs.readFileSync('scripts/supabase-schema.sql', 'utf-8');

async function run() {
  console.log('Running schema...');
  const statements = schema.split(';').filter(s => s.trim());
  
  for (const stmt of statements) {
    const trimmed = stmt.trim();
    if (!trimmed) continue;
    console.log('Executing:', trimmed.substring(0, 80) + '...');
    const { error } = await supabase.rpc('exec_sql', { sql: trimmed + ';' });
    if (error) {
      console.error('Error:', error.message);
    } else {
      console.log('OK');
    }
  }
}

run();