"use client"

import { useState, useEffect } from "react"
import { MasterCard } from "@/components/master-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, ArrowLeft, CreditCard, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"

// Mock card data
const mockCards = [
  {
    id: "card_001",
    cardNumber: "4532123456789012",
    cardholderName: "JOHN DOE",
    expiryDate: "12/25",
    cvv: "123",
    cardType: "visa" as const,
    balance: 5420.75,
    isDefault: true,
    status: "active" as const,
  },
  {
    id: "card_002",
    cardNumber: "5555444433221111",
    cardholderName: "JOHN DOE",
    expiryDate: "08/26",
    cvv: "456",
    cardType: "mastercard" as const,
    balance: 2150.3,
    isDefault: false,
    status: "active" as const,
  },
  {
    id: "card_003",
    cardNumber: "378282246310005",
    cardholderName: "JOHN DOE",
    expiryDate: "03/24",
    cvv: "789",
    cardType: "amex" as const,
    balance: 0,
    isDefault: false,
    status: "blocked" as const,
  },
]

export default function CardsPage() {
  const [cards, setCards] = useState(mockCards)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchCards = async () => {
      setIsLoading(true)
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCards(mockCards)
      setIsLoading(false)
    }

    fetchCards()
  }, [])

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0)
  const activeCards = cards.filter((card) => card.status === "active").length

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Cards</h1>
            <p className="text-muted-foreground">Loading your cards...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Cards</h1>
            <p className="text-muted-foreground">Manage your payment cards</p>
          </div>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Plus className="h-4 w-4 mr-2" />
          Add New Card
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all cards</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCards}</div>
            <p className="text-xs text-muted-foreground">Out of {cards.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Secure</div>
            <p className="text-xs text-muted-foreground">All cards protected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                Freeze All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <MasterCard key={card.id} card={card} />
        ))}
      </div>

      {/* Add Card Placeholder */}
      <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-accent/50 transition-colors cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Plus className="h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle className="text-lg mb-2">Add New Card</CardTitle>
          <CardDescription className="text-center mb-4">
            Connect your bank account or credit card to start making transactions
          </CardDescription>
          <Button className="bg-accent hover:bg-accent/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Card
          </Button>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-sm mb-1">Your cards are secure</h4>
              <p className="text-xs text-muted-foreground">
                All card information is encrypted and stored securely. Use the eye icon to show/hide sensitive
                information. We never store your full card details on our servers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
