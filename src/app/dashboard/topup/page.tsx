"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  DollarSign,
  CreditCard,
  Clock,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  processing_time: string;
  fee: string;
}

export default function TopUpPage() {
  const { user } = useUser();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch("/api/payment-methods");
      const data = await response.json();
      if (data.success) {
        setPaymentMethods(data.data);
      }
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTopUp = async () => {
    if (!selectedMethod || !amount) return;

    setProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      const userName = user?.firstName || user?.fullName || "User";
      alert(
        `Hi ${userName}! Successfully initiated top-up of $${amount} via ${selectedMethod}`
      );
      // Reset form
      setAmount("");
      setSelectedMethod("");
    }, 2000);
  };

  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === selectedMethod
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Add Money
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.firstName ? `Hi ${user.firstName}! ` : ""}Top up your account
            balance to fund your campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Amount Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Enter Amount
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Amount (USD)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="1"
                  max="10000000"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Quick Amount Buttons */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">Quick amounts:</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className="py-2 px-4 text-sm font-medium border border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      ${quickAmount}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Select Payment Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <div key={method.id}>
                    <label className="flex flex-col p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors h-full">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-3xl">{method.icon}</span>
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            selectedMethod === method.id
                              ? "border-blue-600 bg-blue-600"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedMethod === method.id && (
                            <div className="w-2.5 h-2.5 bg-white rounded-full mx-auto mt-0.5"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-2">
                          {method.name}
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          {method.description}
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {method.processing_time}
                          </span>
                          <span className="text-xs text-gray-500 block">
                            Fee: {method.fee}
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium">${amount || "0.00"}</span>
                </div>

                {selectedPaymentMethod && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Fee</span>
                      <span className="font-medium">
                        {selectedPaymentMethod.fee}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${amount || "0.00"}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {selectedPaymentMethod && (
                <div className="bg-blue-50 p-3 rounded-lg mb-6">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <strong>Processing Time:</strong>{" "}
                      {selectedPaymentMethod.processing_time}
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleTopUp}
                disabled={!amount || !selectedMethod || processing}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
              >
                {processing ? "Processing..." : `Add $${amount || "0.00"}`}
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Your payment information is secured with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
