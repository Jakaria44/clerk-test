"use client";

import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Download,
  Search,
  Clock,
  Check,
  AlertCircle,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number;
  currency: string;
  description: string;
  status: "completed" | "pending" | "failed";
  date: string;
  payment_method: string;
  reference: string;
  user_id?: string;
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "deposit" | "withdrawal">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/transactions");
      const data = await response.json();
      if (data.success) {
        setTransactions(data.data);
        setTotalBalance(data.total_balance);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount: number, type: string) => {
    const absoluteAmount = Math.abs(amount);
    const formattedAmount = absoluteAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return type === "deposit" ? `+$${formattedAmount}` : `-$${formattedAmount}`;
  };

  const getTransactionIcon = (type: string, status: string) => {
    if (status === "pending") {
      return <Clock className="w-5 h-5 text-yellow-600" />;
    }
    if (status === "failed") {
      return <AlertCircle className="w-5 h-5 text-red-600" />;
    }

    return type === "deposit" ? (
      <ArrowDownLeft className="w-5 h-5 text-green-600" />
    ) : (
      <ArrowUpRight className="w-5 h-5 text-red-600" />
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { bg: "bg-green-100", text: "text-green-800", icon: Check },
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
      failed: { bg: "bg-red-100", text: "text-red-800", icon: AlertCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === "all" || transaction.type === filter;
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.payment_method
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-3">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Transaction History
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Total Balance:{" "}
            <span className="font-semibold text-green-600">
              $
              {totalBalance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Download"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 mb-4 sm:mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "deposit" | "withdrawal")
            }
            className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            <option value="all">All Transactions</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
          </select>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-2 sm:space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions found</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="block sm:flex sm:items-center sm:justify-between p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100 sm:border-0"
            >
              {/* Mobile Layout */}
              <div className="sm:hidden">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      transaction.type === "deposit"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    {getTransactionIcon(transaction.type, transaction.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900 leading-tight pr-2">
                        {transaction.description}
                      </p>
                      <div
                        className={`text-lg font-semibold flex-shrink-0 ${
                          transaction.type === "deposit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {formatAmount(transaction.amount, transaction.type)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      {getStatusBadge(transaction.status)}
                      <div className="text-xs text-gray-500">
                        {transaction.currency}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-xs text-gray-500 ml-13">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(transaction.date)}
                  </span>
                  <span>{transaction.payment_method}</span>
                  <span>{transaction.reference}</span>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex sm:items-center sm:gap-4 sm:flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === "deposit"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {getTransactionIcon(transaction.type, transaction.status)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {transaction.description}
                    </p>
                    {getStatusBadge(transaction.status)}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(transaction.date)}
                    </span>
                    <span>{transaction.payment_method}</span>
                    <span>{transaction.reference}</span>
                  </div>
                </div>
              </div>

              {/* Desktop Amount */}
              <div className="hidden sm:block text-right">
                <div
                  className={`text-lg font-semibold ${
                    transaction.type === "deposit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formatAmount(transaction.amount, transaction.type)}
                </div>
                <div className="text-xs text-gray-500">
                  {transaction.currency}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredTransactions.length > 0 && (
        <div className="text-center mt-6">
          <button className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Load More Transactions
          </button>
        </div>
      )}
    </div>
  );
}
