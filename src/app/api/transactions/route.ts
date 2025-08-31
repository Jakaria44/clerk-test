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

    // Generate user-specific transaction data
    const userIdSuffix = userId.slice(-3);
    const transactions = [
      {
        id: `txn_${userIdSuffix}001`,
        type: "deposit",
        amount: 1200.0,
        currency: "USD",
        description: "Bank Transfer Deposit",
        status: "completed",
        date: "2024-01-20T14:30:00Z",
        payment_method: "Bank Transfer",
        reference: `DEP-2024-${userIdSuffix}001`,
        user_id: userId,
      },
      {
        id: `txn_${userIdSuffix}002`,
        type: "withdrawal",
        amount: -89.99,
        currency: "USD",
        description: "Campaign Budget - Fashion Brand Q4",
        status: "completed",
        date: "2024-01-19T16:45:00Z",
        payment_method: "Card",
        reference: `WTH-2024-${userIdSuffix}002`,
        user_id: userId,
      },
      {
        id: `txn_${userIdSuffix}003`,
        type: "deposit",
        amount: 500.0,
        currency: "USD",
        description: "PayPal Top-up",
        status: "completed",
        date: "2024-01-18T09:15:00Z",
        payment_method: "PayPal",
        reference: `DEP-2024-${userIdSuffix}003`,
        user_id: userId,
      },
      {
        id: `txn_${userIdSuffix}004`,
        type: "withdrawal",
        amount: -234.5,
        currency: "USD",
        description: "Campaign Budget - Tech Startup Launch",
        status: "completed",
        date: "2024-01-17T11:20:00Z",
        payment_method: "Card",
        reference: `WTH-2024-${userIdSuffix}004`,
        user_id: userId,
      },
      {
        id: `txn_${userIdSuffix}005`,
        type: "deposit",
        amount: 2000.0,
        currency: "USD",
        description: "Credit Card Deposit",
        status: "completed",
        date: "2024-01-16T13:00:00Z",
        payment_method: "Credit Card",
        reference: `DEP-2024-${userIdSuffix}005`,
        user_id: userId,
      },
      {
        id: `txn_${userIdSuffix}006`,
        type: "withdrawal",
        amount: -445.75,
        currency: "USD",
        description: "Campaign Budget - Global Awareness",
        status: "completed",
        date: "2024-01-15T10:30:00Z",
        payment_method: "Card",
        reference: `WTH-2024-${userIdSuffix}006`,
        user_id: userId,
      },
      {
        id: `txn_${userIdSuffix}007`,
        type: "deposit",
        amount: 750.0,
        currency: "USD",
        description: "Apple Pay Top-up",
        status: "pending",
        date: "2024-01-14T15:45:00Z",
        payment_method: "Apple Pay",
        reference: `DEP-2024-${userIdSuffix}007`,
        user_id: userId,
      },
      {
        id: `txn_${userIdSuffix}008`,
        type: "withdrawal",
        amount: -156.99,
        currency: "USD",
        description: "Campaign Budget - Holiday Promotion",
        status: "completed",
        date: "2024-01-13T08:20:00Z",
        payment_method: "Card",
        reference: `WTH-2024-${userIdSuffix}008`,
        user_id: userId,
      },
    ];

    return NextResponse.json({
      success: true,
      data: transactions,
      total: transactions.length,
      total_balance: 5847.32,
      user_id: userId,
      user_name:
        user.fullName ||
        `${user.firstName || "User"} ${user.lastName || ""}`.trim(),
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
