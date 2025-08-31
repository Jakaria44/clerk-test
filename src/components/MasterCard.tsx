"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Copy, Settings, DollarSign } from "lucide-react";

interface CardData {
  id: string;
  type: string;
  last4: string;
  holder_name: string;
  expiry_month: string;
  expiry_year: string;
  balance: number;
  currency: string;
  card_number: string;
  cvv: string;
  status: string;
  spending_limit: number;
  user_id?: string;
  user_email?: string;
  created_at?: string;
}

export default function MasterCard() {
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchCardData();
  }, []);

  const fetchCardData = async () => {
    try {
      const response = await fetch("/api/card-info");
      const data = await response.json();
      if (data.success) {
        setCardData(data.data);
      }
    } catch (error) {
      console.error("Error fetching card data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (cardNumber: string, hide: boolean = true) => {
    if (!cardNumber) return "";

    if (hide && !showDetails) {
      return `**** **** **** ${cardNumber.slice(-4)}`;
    }
    return cardNumber;
  };

  const formatExpiryDate = () => {
    if (!cardData) return "";
    return `${cardData.expiry_month}/${cardData.expiry_year}`;
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const getCardGradient = (type: string) => {
    // Using grayish-silverish gradient for all card types
    return "bg-gradient-to-br from-slate-400 via-gray-500 to-slate-700";
  };

  const getCardLogo = (type: string) => {
    switch (type) {
      case "mastercard":
        return (
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 bg-red-500 rounded-full opacity-90"></div>
            <div className="w-8 h-8 bg-yellow-400 rounded-full opacity-90 -ml-3"></div>
          </div>
        );
      case "visa":
        return (
          <div className="text-white font-bold text-xl tracking-wider">
            VISA
          </div>
        );
      case "amex":
        return <div className="text-white font-bold text-lg">AMEX</div>;
      default:
        return <div className="text-white font-bold text-lg">CARD</div>;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center py-8">
          <p className="text-gray-500">No card information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Payment Card</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title={showDetails ? "Hide details" : "Show details"}
          >
            {showDetails ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Card Design */}
      <div
        className={`relative w-full h-48 rounded-xl ${getCardGradient(
          cardData.type
        )} text-white p-6 mb-6 overflow-hidden`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full border border-white/20"></div>
        <div className="absolute bottom-6 left-6 w-12 h-12 rounded-full border border-white/20"></div>

        {/* Card Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="text-sm font-medium">
              {cardData.holder_name.toUpperCase()}
            </div>
            {getCardLogo(cardData.type)}
          </div>

          <div className="space-y-4">
            <div className="font-mono text-lg tracking-wider">
              {formatCardNumber(cardData.card_number)}
            </div>

            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs opacity-75">VALID THRU</div>
                <div className="font-mono text-sm">
                  {showDetails ? formatExpiryDate() : "**/**"}
                </div>
              </div>

              {showDetails && (
                <div className="text-right">
                  <div className="text-xs opacity-75">CVV</div>
                  <div className="font-mono text-sm">{cardData.cvv}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-sm text-gray-600">Available Balance</div>
              <div className="text-lg font-semibold text-gray-900">
                $
                {cardData.balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Spending Limit</div>
            <div className="text-sm font-medium text-gray-700">
              ${cardData.spending_limit.toLocaleString()}
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Card Number</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm">
                  {cardData.card_number}
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(cardData.card_number, "card number")
                  }
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Expiry Date</span>
              <span className="font-mono text-sm">{formatExpiryDate()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">CVV</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm">{cardData.cvv}</span>
                <button
                  onClick={() => copyToClipboard(cardData.cvv, "CVV")}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  cardData.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {cardData.status.toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {copied && (
          <div className="text-center py-2">
            <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
              Copied to clipboard!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
