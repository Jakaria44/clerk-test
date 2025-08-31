import { NextResponse } from "next/server"

// Mock payment methods data
const mockPaymentMethods = [
  {
    id: "card_1",
    type: "card",
    last4: "4242",
    brand: "visa",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
  {
    id: "card_2",
    type: "card",
    last4: "5555",
    brand: "mastercard",
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
  },
  {
    id: "bank_1",
    type: "bank",
    bankName: "Chase Bank",
    accountType: "checking",
    last4: "1234",
    isDefault: false,
  },
]

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    paymentMethods: mockPaymentMethods,
    total: mockPaymentMethods.length,
  })
}

export async function POST(request: Request) {
  try {
    const paymentMethodData = await request.json()

    // Simulate adding a new payment method
    const newPaymentMethod = {
      id: `pm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...paymentMethodData,
      isDefault: false,
    }

    mockPaymentMethods.push(newPaymentMethod)

    return NextResponse.json({
      success: true,
      paymentMethod: newPaymentMethod,
      message: "Payment method added successfully",
    })
  } catch (error) {
    console.error("Payment method API error:", error)
    return NextResponse.json({ error: "Failed to add payment method" }, { status: 500 })
  }
}
