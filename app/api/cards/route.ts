import { NextResponse } from "next/server"

// Mock cards data
const mockCards = [
  {
    id: "card_001",
    cardNumber: "4532123456789012",
    cardholderName: "JOHN DOE",
    expiryDate: "12/25",
    cvv: "123",
    cardType: "visa",
    balance: 5420.75,
    isDefault: true,
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
    lastUsed: "2024-01-20T14:22:00Z",
  },
  {
    id: "card_002",
    cardNumber: "5555444433221111",
    cardholderName: "JOHN DOE",
    expiryDate: "08/26",
    cvv: "456",
    cardType: "mastercard",
    balance: 2150.3,
    isDefault: false,
    status: "active",
    createdAt: "2024-02-01T09:15:00Z",
    lastUsed: "2024-01-19T16:45:00Z",
  },
  {
    id: "card_003",
    cardNumber: "378282246310005",
    cardholderName: "JOHN DOE",
    expiryDate: "03/24",
    cvv: "789",
    cardType: "amex",
    balance: 0,
    isDefault: false,
    status: "blocked",
    createdAt: "2023-12-10T11:20:00Z",
    lastUsed: "2024-01-10T12:30:00Z",
  },
]

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return NextResponse.json({
    cards: mockCards,
    total: mockCards.length,
    activeCards: mockCards.filter((card) => card.status === "active").length,
    totalBalance: mockCards.reduce((sum, card) => sum + card.balance, 0),
  })
}

export async function POST(request: Request) {
  try {
    const cardData = await request.json()

    // Simulate adding a new card
    const newCard = {
      id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...cardData,
      balance: 0,
      isDefault: mockCards.length === 0,
      status: "active",
      createdAt: new Date().toISOString(),
      lastUsed: null,
    }

    mockCards.push(newCard)

    return NextResponse.json({
      success: true,
      card: newCard,
      message: "Card added successfully",
    })
  } catch (error) {
    console.error("Cards API error:", error)
    return NextResponse.json({ error: "Failed to add card" }, { status: 500 })
  }
}
