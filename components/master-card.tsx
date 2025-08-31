"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Copy, MoreVertical, Trash2, Edit, Star } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface MasterCardProps {
  card: {
    id: string
    cardNumber: string
    cardholderName: string
    expiryDate: string
    cvv: string
    cardType: "visa" | "mastercard" | "amex" | "discover"
    balance: number
    isDefault: boolean
    status: "active" | "blocked" | "expired"
  }
  className?: string
}

const cardTypeColors = {
  visa: "from-blue-600 to-blue-800",
  mastercard: "from-red-600 to-orange-600",
  amex: "from-green-600 to-teal-600",
  discover: "from-purple-600 to-pink-600",
}

const cardTypeLogos = {
  visa: "VISA",
  mastercard: "Mastercard",
  amex: "AMEX",
  discover: "DISCOVER",
}

export function MasterCard({ card, className }: MasterCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { toast } = useToast()

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const maskCardNumber = (cardNumber: string) => {
    if (isVisible) return cardNumber
    return cardNumber.replace(/\d(?=\d{4})/g, "*")
  }

  const maskCVV = (cvv: string) => {
    if (isVisible) return cvv
    return "***"
  }

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  const formatCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(.{4})/g, "$1 ").trim()
  }

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-0">
        {/* Card Front */}
        <div
          className={cn(
            "relative p-6 text-white bg-gradient-to-br min-h-[200px] flex flex-col justify-between",
            cardTypeColors[card.cardType],
          )}
        >
          {/* Card Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {card.isDefault && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Default
                </Badge>
              )}
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs",
                  card.status === "active"
                    ? "bg-green-500/20 text-green-100 border-green-400/30"
                    : card.status === "blocked"
                      ? "bg-red-500/20 text-red-100 border-red-400/30"
                      : "bg-yellow-500/20 text-yellow-100 border-yellow-400/30",
                )}
              >
                {card.status.toUpperCase()}
              </Badge>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Card
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => copyToClipboard(card.cardNumber, "Card number")}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Number
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Card
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Card Number */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-mono text-lg tracking-wider">
                {formatCardNumber(maskCardNumber(card.cardNumber))}
              </div>
              <Button variant="ghost" size="icon" onClick={toggleVisibility} className="text-white hover:bg-white/20">
                {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>

            {/* Card Details */}
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <div className="text-xs opacity-80">CARDHOLDER NAME</div>
                <div className="font-medium text-sm">{card.cardholderName}</div>
              </div>

              <div className="space-y-1 text-right">
                <div className="text-xs opacity-80">EXPIRES</div>
                <div className="font-medium text-sm">{card.expiryDate}</div>
              </div>

              <div className="space-y-1 text-right">
                <div className="text-xs opacity-80">CVV</div>
                <div className="font-medium text-sm font-mono">{maskCVV(card.cvv)}</div>
              </div>
            </div>
          </div>

          {/* Card Brand */}
          <div className="absolute top-6 right-6">
            <div className="text-xl font-bold opacity-90">{cardTypeLogos[card.cardType]}</div>
          </div>

          {/* Chip */}
          <div className="absolute top-16 left-6">
            <div className="w-8 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm"></div>
          </div>
        </div>

        {/* Card Info */}
        <div className="p-4 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-2xl font-bold text-foreground">${card.balance.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Card ID</p>
              <p className="text-sm font-mono text-foreground">#{card.id}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
