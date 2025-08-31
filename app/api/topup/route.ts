import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration
const mockTransactions: Array<{
  id: string
  amount: number
  paymentMethod: string
  status: "pending" | "completed" | "failed"
  timestamp: string
  transactionId: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const { amount, paymentMethod } = await request.json()

    // Validate input
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount provided" }, { status: 400 })
    }

    if (!paymentMethod) {
      return NextResponse.json({ error: "Payment method is required" }, { status: 400 })
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate mock transaction
    const transaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      paymentMethod,
      status: "completed" as const,
      timestamp: new Date().toISOString(),
      transactionId: `TXN${Date.now()}`,
    }

    // Add to mock storage
    mockTransactions.push(transaction)

    // Simulate occasional failures for testing
    const shouldFail = Math.random() < 0.1 // 10% chance of failure
    if (shouldFail) {
      transaction.status = "failed"
      return NextResponse.json({ error: "Payment processing failed. Please try again." }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      transaction,
      message: `Successfully added $${amount} to your account`,
    })
  } catch (error) {
    console.error("Top-up API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  // Return recent top-up transactions
  const recentTransactions = mockTransactions
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10)

  return NextResponse.json({
    transactions: recentTransactions,
    total: mockTransactions.length,
  })
}
