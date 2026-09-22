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
      .eq("email", "admin@sejbd.org")
      .maybeSingle();

    if (existing) {
      console.log("Admin user already exists. Skipping seed.");
      return;
    }

    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
    if (!adminPassword) {
      console.error("DEFAULT_ADMIN_PASSWORD env var is required");
      process.exit(1);
    }

    // Create admin user with bcrypt hashed password
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(adminPassword, salt);

    const { error } = await supabase.from("users").insert({
      name: "SEJ Admin",
      email: "admin@sejbd.org",
      password_hash: hashedPassword,
      role: "superadmin",
      is_active: true,
    });

    if (error) throw error;

    console.log("✓ Admin user created successfully!");
    console.log("  Email: admin@sejbd.org");
    console.log("  ⚠ Change this password after first login!");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seedAdmin();
