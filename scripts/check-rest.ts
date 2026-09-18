import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function check() {
  console.log('Checking tables via REST API...');
  
  // Try to query users table
  const { data: users, error: uErr } = await supabase.from('users').select('*').limit(1);
  console.log('users table:', uErr ? uErr.message : 'OK, count:', users?.length);
  
  // Try to query content table
  const { data: content, error: cErr } = await supabase.from('content').select('*').limit(1);
  console.log('content table:', cErr ? cErr.message : 'OK, count:', content?.length);
  
  // Try to get schema info via REST
  const response = await fetch(process.env.SUPABASE_URL! + '/rest/v1/?select=*', {
    headers: {
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
      'Authorization': 'Bearer ' + process.env.SUPABASE_SERVICE_ROLE_KEY!,
      'Prefer': 'count=exact',
    }
  });
  console.log('REST API tables list:', response.status, response.statusText);
  const text = await response.text();
  console.log('Response:', text.substring(0, 500));
}

check();