import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    // Protect the route - user must be authenticated
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mock payment methods data
    const paymentMethods = [
      {
        id: "card",
        name: "Credit/Debit Card",
        description: "Visa, Mastercard, American Express",
        icon: "💳",
        processing_time: "Instant",
        fee: "2.9% + $0.30",
      },
      {
        id: "bank",
        name: "Bank Transfer",
        description: "Direct bank account transfer",
        icon: "🏦",
        processing_time: "1-3 business days",
        fee: "$5.00",
      },
      {
        id: "paypal",
        name: "PayPal",
        description: "Pay with your PayPal account",
        icon: "/paypal-logo.png",
        processing_time: "Instant",
        fee: "3.4% + $0.30",
      },
      {
        id: "apple_pay",
        name: "Apple Pay",
        description: "Quick payment with Touch ID",
        icon: "/apple-pay.png",
        processing_time: "Instant",
        fee: "2.9% + $0.30",
      },
      {
        id: "google_pay",
        name: "Google Pay",
        description: "Pay with Google account",
        icon: "/google-pay.png",
        processing_time: "Instant",
        fee: "2.9% + $0.30",
      },
      {
        id: "crypto",
        name: "Cryptocurrency",
        description: "Bitcoin, Ethereum, USDC",
        icon: "₿",
        processing_time: "10-30 minutes",
        fee: "1.5%",
      },
    ];

    return NextResponse.json({
      success: true,
      data: paymentMethods,
      user_id: userId,
    });
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
