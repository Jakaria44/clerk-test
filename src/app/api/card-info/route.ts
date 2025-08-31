import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    // Protect the route - user must be authenticated
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the current user information
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate user-specific card data based on their info
    const fullName =
      user.fullName ||
      `${user.firstName || "User"} ${user.lastName || ""}`.trim();

    const cardInfo = {
      id: `card_${userId.slice(-6)}`,
      type: "mastercard",
      last4: "4242",
      holder_name: fullName.toUpperCase(),
      expiry_month: "12",
      expiry_year: "2027",
      balance: 5847.32,
      currency: "USD",
      card_number: "5555 5555 5555 4242", // This would be encrypted in real app
      cvv: "123", // This would never be stored in real app
      status: "active",
      created_at: user.createdAt
        ? new Date(user.createdAt).toISOString()
        : new Date().toISOString(),
      spending_limit: 10000,
      user_id: userId,
      user_email: user.primaryEmailAddress?.emailAddress,
    };

    return NextResponse.json({
      success: true,
      data: cardInfo,
    });
  } catch (error) {
    console.error("Error fetching card info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    // Protect the route - user must be authenticated
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { spending_limit } = body;

    // Mock response for updating spending limit
    return NextResponse.json({
      success: true,
      message: "Card spending limit updated successfully",
      data: { spending_limit, user_id: userId },
    });
  } catch (error) {
    console.error("Error updating card info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
