// Next.js Instrumentation Hook - runs once on server start
// Used to auto-seed the default admin user if no users exist

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      const { getUserCount, createNewUser } = await import(
        "@/lib/models/User"
      );

      const userCount = await getUserCount();

      if (userCount === 0) {
        const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
        const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;

        if (adminEmail && adminPassword) {
          // Enforce the strong-password policy before auto-seeding.
          const strongEnough =
            adminPassword.length >= 10 &&
            /[A-Z]/.test(adminPassword) &&
            /[a-z]/.test(adminPassword) &&
            /[0-9]/.test(adminPassword);
          if (!strongEnough) {
            console.log(
              "  ✗ DEFAULT_ADMIN_PASSWORD does not meet the password policy (min 10 chars, upper + lower + number). Skipping auto-seed.",
            );
          } else {
            await createNewUser({
              name: "SEJ Admin",
              email: adminEmail,
              password: adminPassword,
              role: "superadmin",
              is_active: true,
            });

            console.log("═══════════════════════════════════════════");
            console.log("  ✓ Default admin user created!");
            console.log("  ⚠ Change this password after first login!");
            console.log("═══════════════════════════════════════════");
          }
        } else {
          console.log(
            "  ℹ No admin users found. Set DEFAULT_ADMIN_EMAIL and DEFAULT_ADMIN_PASSWORD env vars to auto-create, or use /api/auth/setup.",
          );
        }
      } else {
        console.log(`✓ ${userCount} admin user(s) found. Skipping seed.`);
      }
    } catch (error) {
      console.error("Auto-seed admin failed:", error);
    }
  }
}
