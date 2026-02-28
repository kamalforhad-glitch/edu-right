// Seed script to create the first admin user
// Run with: npx tsx scripts/seed-admin.ts

import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/eduright";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection failed");

    const usersCollection = db.collection("users");

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({
      email: "admin@erp-bd.org",
    });

    if (existingAdmin) {
      console.log("Admin user already exists. Skipping seed.");
      await mongoose.disconnect();
      return;
    }

    // Create admin user
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash("admin123", salt);

    await usersCollection.insertOne({
      name: "ERP Admin",
      email: "admin@erp-bd.org",
      password: hashedPassword,
      role: "superadmin",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("✓ Admin user created successfully!");
    console.log("  Email: admin@erp-bd.org");
    console.log("  Password: admin123");
    console.log("  ⚠ Change this password after first login!");

    await mongoose.disconnect();
    console.log("Done.");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seedAdmin();
