"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Smartphone, Building2, Wallet, ArrowLeft, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

const quickAmounts = [50, 100, 250, 500, 1000]

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Visa, Mastercard, American Express",
    icon: CreditCard,
    processingTime: "Instant",
    fee: "Free",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    description: "Direct transfer from your bank account",
    icon: Building2,
    processingTime: "1-2 business days",
    fee: "Free",
  },
  {
    id: "mobile",
    name: "Mobile Payment",
    description: "Apple Pay, Google Pay, Samsung Pay",
    icon: Smartphone,
    processingTime: "Instant",
    fee: "Free",
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    description: "Bitcoin, Ethereum, USDC",
    icon: Wallet,
    processingTime: "10-30 minutes",
    fee: "Network fees apply",
  },
]

export default function TopUpPage() {
  const [amount, setAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString())
  }

  const handleTopUp = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to add to your account.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch("/api/topup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number.parseFloat(amount),
          paymentMethod: selectedMethod,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Top-up Successful!",
          description: `$${amount} has been added to your account.`,
        })
        setAmount("")
      } else {
        throw new Error(data.error || "Top-up failed")
      }
    } catch (error) {
      toast({
        title: "Top-up Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const selectedPaymentMethod = paymentMethods.find((method) => method.id === selectedMethod)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add Money</h1>
          <p className="text-muted-foreground">Top up your GGMedia account</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Amount Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enter Amount</CardTitle>
              <CardDescription>Choose how much you'd like to add to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8"
                    min="1"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <Label>Quick Select</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickAmounts.map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAmount(value)}
                      className="bg-transparent"
                    >
                      ${value}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <div key={method.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label
                        htmlFor={method.id}
                        className="flex items-center gap-3 flex-1 cursor-pointer p-4 border border-border rounded-lg hover:bg-muted/50"
                      >
                        <Icon className="h-5 w-5 text-accent" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{method.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {method.fee}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {method.processingTime}
                          </p>
                        </div>
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">${amount || "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processing Fee</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${amount || "0.00"}</span>
              </div>

              {selectedPaymentMethod && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <selectedPaymentMethod.icon className="h-4 w-4 text-accent" />
                    <span className="font-medium text-sm">{selectedPaymentMethod.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Processing time: {selectedPaymentMethod.processingTime}
                  </p>
                </div>
              )}

              <Button
                onClick={handleTopUp}
                disabled={!amount || Number.parseFloat(amount) <= 0 || isProcessing}
                className="w-full bg-accent hover:bg-accent/90"
              >
                {isProcessing ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Add ${amount || "0.00"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Secure Transaction</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your payment information is encrypted and secure. We never store your payment details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
