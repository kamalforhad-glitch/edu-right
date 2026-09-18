import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function check() {
  console.log('Checking tables...');
  const { data, error } = await supabase.rpc('exec_sql', { 
    sql: "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'" 
  });
  console.log('Tables query result:', data, error);
}

check();