import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function check() {
  console.log('Checking tables...');
  const { data: users, error: uErr } = await supabase.from('users').select('id').limit(1);
  console.log('users table:', uErr ? uErr.message : 'OK, count:', users?.length);
  
  const { data: content, error: cErr } = await supabase.from('content').select('id').limit(1);
  console.log('content table:', cErr ? cErr.message : 'OK, count:', content?.length);
}

check();