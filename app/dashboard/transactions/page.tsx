"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Gamepad2,
  Briefcase,
  Heart,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import Link from "next/link"

interface Transaction {
  id: string
  description: string
  amount: number
  type: "credit" | "debit"
  category: string
  date: string
  status: "completed" | "pending" | "failed"
  merchant?: string
  cardId?: string
  cardLast4?: string
}

const categoryIcons: Record<string, any> = {
  "Food & Dining": Utensils,
  Transportation: Car,
  Shopping: ShoppingCart,
  Entertainment: Gamepad2,
  "Bills & Utilities": Home,
  Healthcare: Heart,
  Business: Briefcase,
  Income: TrendingUp,
  Transfer: ArrowUpRight,
  Other: MoreHorizontal,
}

const categoryColors: Record<string, string> = {
  "Food & Dining": "bg-orange-100 text-orange-600",
  Transportation: "bg-blue-100 text-blue-600",
  Shopping: "bg-purple-100 text-purple-600",
  Entertainment: "bg-pink-100 text-pink-600",
  "Bills & Utilities": "bg-green-100 text-green-600",
  Healthcare: "bg-red-100 text-red-600",
  Business: "bg-gray-100 text-gray-600",
  Income: "bg-emerald-100 text-emerald-600",
  Transfer: "bg-indigo-100 text-indigo-600",
  Other: "bg-slate-100 text-slate-600",
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    filterTransactions()
  }, [transactions, searchTerm, selectedCategory, selectedStatus, selectedType])

  const fetchTransactions = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/transactions")
      const data = await response.json()
      setTransactions(data.transactions || [])
    } catch (error) {
      console.error("Failed to fetch transactions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterTransactions = () => {
    let filtered = transactions

    if (searchTerm) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.merchant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((transaction) => transaction.category === selectedCategory)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((transaction) => transaction.status === selectedStatus)
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((transaction) => transaction.type === selectedType)
    }

    setFilteredTransactions(filtered)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  const totalIncome = transactions.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "debit").reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const categories = Array.from(new Set(transactions.map((t) => t.category)))

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
            <h1 className="text-3xl font-bold text-foreground">Transaction History</h1>
            <p className="text-muted-foreground">Loading your transactions...</p>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
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
            <h1 className="text-3xl font-bold text-foreground">Transaction History</h1>
            <p className="text-muted-foreground">Track all your financial activity</p>
          </div>
        </div>
        <Button variant="outline" className="bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {totalIncome - totalExpenses >= 0 ? "+" : ""}${(totalIncome - totalExpenses).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
          <CardDescription>Filter and search your transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Income</SelectItem>
                <SelectItem value="debit">Expenses</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
          <CardDescription>
            {filteredTransactions.length === transactions.length
              ? "All transactions"
              : `Filtered from ${transactions.length} total transactions`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transactions found matching your filters.</p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => {
                const CategoryIcon = categoryIcons[transaction.category] || MoreHorizontal
                const categoryColor = categoryColors[transaction.category] || categoryColors.Other

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${categoryColor}`}>
                        <CategoryIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{transaction.description}</p>
                          <Badge
                            variant="secondary"
                            className={
                              transaction.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : transaction.status === "pending"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{transaction.category}</span>
                          <span>•</span>
                          <span>{formatDate(transaction.date)}</span>
                          {transaction.cardLast4 && (
                            <>
                              <span>•</span>
                              <span>****{transaction.cardLast4}</span>
                            </>
                          )}
                        </div>
                        {transaction.merchant && (
                          <p className="text-xs text-muted-foreground">{transaction.merchant}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                        {transaction.type === "credit" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {transaction.type === "credit" ? (
                          <ArrowDownRight className="h-3 w-3" />
                        ) : (
                          <ArrowUpRight className="h-3 w-3" />
                        )}
                        <span>{transaction.type === "credit" ? "Received" : "Sent"}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
