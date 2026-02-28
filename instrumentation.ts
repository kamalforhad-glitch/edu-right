// Next.js Instrumentation Hook - runs once on server start
// Used to auto-seed the default admin user if no users exist

export async function register() {
  // Only run on the server (Node.js runtime), not on Edge
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      const { connectDB } = await import("@/lib/mongodb");
      const { default: User } = await import("@/lib/models/User");

      await connectDB();

      const userCount = await User.countDocuments();

      if (userCount === 0) {
        await User.create({
          name: "ERP Admin",
          email: "admin@erp-bd.org",
          password: "admin123",
          role: "superadmin",
          isActive: true,
        });

        console.log("═══════════════════════════════════════════");
        console.log("  ✓ Default admin user created!");
        console.log("  Email:    admin@erp-bd.org");
        console.log("  Password: admin123");
        console.log("  ⚠ Change this password after first login!");
        console.log("═══════════════════════════════════════════");
      } else {
        console.log(`✓ ${userCount} admin user(s) found. Skipping seed.`);
      }
    } catch (error) {
      console.error("Auto-seed admin failed:", error);
      // Don't crash the server if seeding fails
    }
  }
}
