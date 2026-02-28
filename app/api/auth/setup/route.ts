import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

// POST: Create initial admin if no users exist
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Only allow setup if no users exist
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return NextResponse.json(
        { error: "Setup already completed. Admin users exist." },
        { status: 403 },
      );
    }

    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 },
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "superadmin",
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Initial admin created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Failed to create admin" },
      { status: 500 },
    );
  }
}

// GET: Check if setup is needed
export async function GET() {
  try {
    await connectDB();
    const userCount = await User.countDocuments();
    return NextResponse.json({
      setupRequired: userCount === 0,
    });
  } catch (error) {
    console.error("Setup check error:", error);
    return NextResponse.json(
      { error: "Failed to check setup status" },
      { status: 500 },
    );
  }
}
