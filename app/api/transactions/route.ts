import { NextResponse } from "next/server"

// Mock transaction data
const mockTransactions = [
  {
    id: "txn_001",
    description: "Grocery Store Purchase",
    amount: -87.32,
    type: "debit",
    category: "Food & Dining",
    date: "2024-01-20T14:30:00Z",
    status: "completed",
    merchant: "Whole Foods Market",
    cardId: "card_001",
    cardLast4: "9012",
  },
  {
    id: "txn_002",
    description: "Salary Deposit",
    amount: 3500.0,
    type: "credit",
    category: "Income",
    date: "2024-01-19T09:00:00Z",
    status: "completed",
    merchant: "ABC Corporation",
  },
  {
    id: "txn_003",
    description: "Netflix Subscription",
    amount: -15.99,
    type: "debit",
    category: "Entertainment",
    date: "2024-01-18T12:00:00Z",
    status: "completed",
    merchant: "Netflix Inc.",
    cardId: "card_001",
    cardLast4: "9012",
  },
  {
    id: "txn_004",
    description: "Gas Station",
    amount: -45.67,
    type: "debit",
    category: "Transportation",
    date: "2024-01-17T16:45:00Z",
    status: "completed",
    merchant: "Shell Gas Station",
    cardId: "card_002",
    cardLast4: "1111",
  },
  {
    id: "txn_005",
    description: "Online Shopping",
    amount: -129.99,
    type: "debit",
    category: "Shopping",
    date: "2024-01-16T20:15:00Z",
    status: "completed",
    merchant: "Amazon.com",
    cardId: "card_001",
    cardLast4: "9012",
  },
  {
    id: "txn_006",
    description: "Electric Bill",
    amount: -89.45,
    type: "debit",
    category: "Bills & Utilities",
    date: "2024-01-15T10:00:00Z",
    status: "completed",
    merchant: "City Electric Company",
    cardId: "card_001",
    cardLast4: "9012",
  },
  {
    id: "txn_007",
    description: "Coffee Shop",
    amount: -4.75,
    type: "debit",
    category: "Food & Dining",
    date: "2024-01-15T08:30:00Z",
    status: "completed",
    merchant: "Starbucks",
    cardId: "card_002",
    cardLast4: "1111",
  },
  {
    id: "txn_008",
    description: "Freelance Payment",
    amount: 750.0,
    type: "credit",
    category: "Income",
    date: "2024-01-14T14:20:00Z",
    status: "completed",
    merchant: "XYZ Client",
  },
  {
    id: "txn_009",
    description: "Uber Ride",
    amount: -18.5,
    type: "debit",
    category: "Transportation",
    date: "2024-01-13T22:15:00Z",
    status: "completed",
    merchant: "Uber Technologies",
    cardId: "card_001",
    cardLast4: "9012",
  },
  {
    id: "txn_010",
    description: "Pharmacy",
    amount: -23.99,
    type: "debit",
    category: "Healthcare",
    date: "2024-01-12T11:30:00Z",
    status: "completed",
    merchant: "CVS Pharmacy",
    cardId: "card_002",
    cardLast4: "1111",
  },
  {
    id: "txn_011",
    description: "Pending Transfer",
    amount: -200.0,
    type: "debit",
    category: "Transfer",
    date: "2024-01-20T18:00:00Z",
    status: "pending",
    merchant: "Bank Transfer",
    cardId: "card_001",
    cardLast4: "9012",
  },
  {
    id: "txn_012",
    description: "Failed Payment",
    amount: -50.0,
    type: "debit",
    category: "Shopping",
    date: "2024-01-19T15:30:00Z",
    status: "failed",
    merchant: "Online Store",
    cardId: "card_002",
    cardLast4: "1111",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const type = searchParams.get("type")
  const status = searchParams.get("status")
  const limit = Number.parseInt(searchParams.get("limit") || "50")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  let filteredTransactions = [...mockTransactions]

  // Apply filters
  if (category && category !== "all") {
    filteredTransactions = filteredTransactions.filter((t) => t.category === category)
  }

  if (type && type !== "all") {
    filteredTransactions = filteredTransactions.filter((t) => t.type === type)
  }

  if (status && status !== "all") {
    filteredTransactions = filteredTransactions.filter((t) => t.status === status)
  }

  // Sort by date (newest first)
  filteredTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Apply pagination
  const paginatedTransactions = filteredTransactions.slice(offset, offset + limit)

  // Calculate summary statistics
  const totalIncome = filteredTransactions.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  return NextResponse.json({
    transactions: paginatedTransactions,
    total: filteredTransactions.length,
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses,
    pagination: {
      limit,
      offset,
      hasMore: offset + limit < filteredTransactions.length,
    },
  })
}

export async function POST(request: Request) {
  try {
    const transactionData = await request.json()

    // Simulate creating a new transaction
    const newTransaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...transactionData,
      date: new Date().toISOString(),
      status: "completed",
    }

    mockTransactions.unshift(newTransaction)

    return NextResponse.json({
      success: true,
      transaction: newTransaction,
      message: "Transaction created successfully",
    })
  } catch (error) {
    console.error("Transaction API error:", error)
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}
