// Seed script to create the first admin user
// Run with: npx tsx scripts/seed-admin.ts

import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function seedAdmin() {
  const { createClient } = await import("@supabase/supabase-js");
  const bcryptjs = await import("bcryptjs");

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env.local",
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Check if admin already exists
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", "admin@erp-bd.org")
      .maybeSingle();

    if (existing) {
      console.log("Admin user already exists. Skipping seed.");
      return;
    }

    // Create admin user with bcrypt hashed password
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash("admin123", salt);

    const { error } = await supabase.from("users").insert({
      name: "ERP Admin",
      email: "admin@erp-bd.org",
      password_hash: hashedPassword,
      role: "superadmin",
      is_active: true,
    });

    if (error) throw error;

    console.log("✓ Admin user created successfully!");
    console.log("  Email: admin@erp-bd.org");
    console.log("  ⚠ Change this password after first login!");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seedAdmin();
