import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function check() {
  console.log('Checking for tables in different cases...');
  
  // Try different case variations
  const tables = ['users', 'Users', 'USERS', 'content', 'Content', 'CONTENT'];
  
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    console.log(`${table}:`, error ? error.message : 'OK, count:', data?.length);
  }
  
  // Try to get all tables via information_schema
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/`, {
    headers: {
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
    }
  });
  
  const openapi = await response.json();
  console.log('\nAvailable tables from OpenAPI:');
  const tablePaths = Object.keys(openapi.paths || {}).filter(p => p !== '/');
  console.log(tablePaths.length > 0 ? tablePaths.join(', ') : 'None');
}

check();