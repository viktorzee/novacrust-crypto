"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/Button";
import { Tabs } from "../ui/Tabs";
import { AmountInput } from "../ui/AmountInput";
import {
  EthIcon,
  UsdtCeloIcon,
  UsdtTonIcon,
  UsdtBnbIcon,
  NgnIcon,
  GhsIcon,
  KesIcon,
  ZarIcon,
  MetamaskIcon,
  RainbowIcon,
  WalletConnectIcon,
  OtherWalletIcon,
} from "../ui/Icons";

interface Currency {
  symbol: string;
  name: string;
  icon?: React.ReactNode;
}

interface Wallet {
  id: string;
  name: string;
  icon: React.ReactNode;
  description?: string;
}

const tabs = [
  { id: "crypto-to-cash", label: "Crypto to cash" },
  { id: "cash-to-crypto", label: "Cash to crypto" },
  { id: "crypto-to-fiat-loan", label: "Crypto to fiat loan" },
];

const payCurrencies: Currency[] = [
  { symbol: "ETH", name: "Ethereum", icon: <EthIcon size={28} /> },
  { symbol: "USDT - CELO", name: "CELO", icon: <UsdtCeloIcon size={28} /> },
  { symbol: "USDT - TON", name: "TON", icon: <UsdtTonIcon size={28} /> },
  { symbol: "USDT - BNB", name: "BNB", icon: <UsdtBnbIcon size={28} /> },
];

const receiveCurrencies: Currency[] = [
  { symbol: "NGN", name: "Nigerian Naira", icon: <NgnIcon size={28} /> },
  { symbol: "GHS", name: "Ghanaian Cedi", icon: <GhsIcon size={28} /> },
  { symbol: "KES", name: "Kenyan Shilling", icon: <KesIcon size={28} /> },
  { symbol: "ZAR", name: "South African Rand", icon: <ZarIcon size={28} /> },
];

const wallets: Wallet[] = [
  { id: "metamask", name: "Metamask", icon: <MetamaskIcon size={24} /> },
  { id: "rainbow", name: "Rainbow", icon: <RainbowIcon size={24} /> },
  { id: "walletconnect", name: "WalletConnect", icon: <WalletConnectIcon size={24} /> },
  {
    id: "other",
    name: "Other Crypto Wallets",
    icon: <OtherWalletIcon size={24} />,
    description: "Binance, Coinbase, Bybit etc",
  },
];

interface CryptoToCashWidgetProps {
  onConvert?: (data: {
    payAmount: string;
    payCurrency: Currency;
    receiveAmount: string;
    receiveCurrency: Currency;
    payFrom: Wallet | null;
    payTo: string;
  }) => void;
}

interface FormErrors {
  payAmount?: string;
  payFrom?: string;
  payTo?: string;
}

export function CryptoToCashWidget({ onConvert }: CryptoToCashWidgetProps) {
  const [activeTab, setActiveTab] = useState("crypto-to-cash");
  const [payAmount, setPayAmount] = useState("1.00");
  const [payCurrency, setPayCurrency] = useState<Currency>(payCurrencies[0]);
  const [receiveAmount, setReceiveAmount] = useState("1.00");
  const [receiveCurrency, setReceiveCurrency] = useState<Currency>(receiveCurrencies[0]);
  const [payFrom, setPayFrom] = useState<Wallet | null>(null);
  const [payTo, setPayTo] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isPayFromDropdownOpen, setIsPayFromDropdownOpen] = useState(false);
  const [isPayToDropdownOpen, setIsPayToDropdownOpen] = useState(false);

  const payFromDropdownRef = useRef<HTMLDivElement>(null);
  const payToDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (payFromDropdownRef.current && !payFromDropdownRef.current.contains(event.target as Node)) {
        setIsPayFromDropdownOpen(false);
      }
      if (payToDropdownRef.current && !payToDropdownRef.current.contains(event.target as Node)) {
        setIsPayToDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const amount = parseFloat(payAmount) || 0;
    const rate = payCurrency.symbol === "ETH" ? 3500000 : 1500;
    setReceiveAmount((amount * rate).toFixed(2));
  }, [payAmount, payCurrency]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const amount = parseFloat(payAmount);
    if (!payAmount || isNaN(amount) || amount <= 0) {
      newErrors.payAmount = "Please enter a valid amount";
    }

    if (!payFrom) {
      newErrors.payFrom = "Please select a wallet";
    }

    if (!payTo) {
      newErrors.payTo = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConvert = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);

    onConvert?.({
      payAmount,
      payCurrency,
      receiveAmount,
      receiveCurrency,
      payFrom,
      payTo,
    });
  };

  const handlePayAmountChange = (amount: string) => {
    setPayAmount(amount);
    if (errors.payAmount) {
      setErrors(prev => ({ ...prev, payAmount: undefined }));
    }
  };

  const handlePayFromChange = (wallet: Wallet) => {
    setPayFrom(wallet);
    if (errors.payFrom) {
      setErrors(prev => ({ ...prev, payFrom: undefined }));
    }
  };

  const handlePayToChange = (option: string) => {
    setPayTo(option);
    if (errors.payTo) {
      setErrors(prev => ({ ...prev, payTo: undefined }));
    }
  };

  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistError, setWaitlistError] = useState("");
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [waitlistLoading, setWaitlistLoading] = useState(false);

  useEffect(() => {
    setWaitlistEmail("");
    setWaitlistError("");
    setWaitlistSuccess(false);
    setWaitlistLoading(false);
  }, [activeTab]);

  const handleWaitlistSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!waitlistEmail) {
      setWaitlistError("Please enter your email");
      return;
    }
    if (!emailRegex.test(waitlistEmail)) {
      setWaitlistError("Please enter a valid email address");
      return;
    }

    setWaitlistLoading(true);
    setWaitlistError("");
    await new Promise(resolve => setTimeout(resolve, 1000));
    setWaitlistLoading(false);
    setWaitlistSuccess(true);
    setWaitlistEmail("");
  };

  if (activeTab !== "crypto-to-cash") {
    return (
      <div className="w-full max-w-[512px] mx-auto">
        <div className="bg-white rounded-3xl shadow-xl">
          <div className="p-6 pb-8">
            <div className="flex justify-center mb-8">
              <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
            </div>

            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-[#0d3b3b] mb-4">Coming Soon!</h2>
              <p className="text-gray-600 mb-2">
                {activeTab === "cash-to-crypto" ? "Cash to Crypto" : "Crypto to Fiat Loan"} is almost here.
              </p>
              <p className="text-gray-500 text-sm mb-8">
                Enter your email and we&apos;ll let you know the moment it&apos;s live.
              </p>

              {waitlistSuccess ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
                  <p className="font-medium">You&apos;re on the list!</p>
                  <p className="text-sm mt-1">We&apos;ll notify you when this feature launches.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-left">
                    <label className="block text-sm font-medium text-[#0d3b3b] mb-2">Email</label>
                    <input
                      type="email"
                      value={waitlistEmail}
                      onChange={(e) => {
                        setWaitlistEmail(e.target.value);
                        if (waitlistError) setWaitlistError("");
                      }}
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 bg-white border rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d3b3b]/20 focus:border-[#0d3b3b] ${waitlistError ? "border-red-500" : "border-gray-200"}`}
                    />
                    {waitlistError && (
                      <p className="mt-1.5 text-sm text-red-500">{waitlistError}</p>
                    )}
                  </div>
                  <Button fullWidth onClick={handleWaitlistSubmit} isLoading={waitlistLoading}>
                    Update me
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[512px] mx-auto">
      <div className="bg-white rounded-3xl shadow-xl">
        <div className="p-6 pb-8">
          <div className="flex justify-center mb-8">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>

          <div className="mb-4">
            <AmountInput
              label="You pay"
              amount={payAmount}
              onAmountChange={handlePayAmountChange}
              currency={payCurrency}
              onCurrencyChange={(c) => setPayCurrency(c)}
              currencies={payCurrencies}
              searchable
            />
            {errors.payAmount && (
              <p className="mt-1.5 text-sm text-red-500">{errors.payAmount}</p>
            )}
          </div>

          <div className="mb-6">
            <AmountInput
              label="You receive"
              amount={receiveAmount}
              currency={receiveCurrency}
              onCurrencyChange={(c) => setReceiveCurrency(c)}
              currencies={receiveCurrencies}
              readOnly
              searchable
            />
          </div>

          <div className="mb-4" ref={payFromDropdownRef}>
            <label className="block text-sm font-medium text-[#0d3b3b] mb-2">Pay from</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPayFromDropdownOpen(!isPayFromDropdownOpen)}
                className={`w-full px-4 py-3 bg-white border rounded-full text-left flex items-center justify-between gap-2 transition-all duration-200 hover:border-gray-300 ${isPayFromDropdownOpen ? "ring-2 ring-[#0d3b3b]/20 border-[#0d3b3b]" : ""} ${errors.payFrom ? "border-red-500" : "border-gray-200"}`}
              >
                <div className="flex items-center gap-3">
                  {payFrom?.icon}
                  <span className={payFrom ? "text-gray-900" : "text-gray-400"}>
                    {payFrom?.name || "Select an option"}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isPayFromDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isPayFromDropdownOpen && (
                <div className="absolute left-0 right-0 z-50 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="py-1">
                    {wallets.map((wallet) => (
                      <button
                        key={wallet.id}
                        type="button"
                        onClick={() => {
                          handlePayFromChange(wallet);
                          setIsPayFromDropdownOpen(false);
                        }}
                        className={`w-full px-6 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors duration-150 ${payFrom?.id === wallet.id ? "bg-gray-50" : ""}`}
                      >
                        {wallet.icon}
                        <div>
                          <div className="text-gray-900">{wallet.name}</div>
                          {wallet.description && (
                            <div className="text-sm text-gray-500">{wallet.description}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {errors.payFrom && (
              <p className="mt-1.5 text-sm text-red-500">{errors.payFrom}</p>
            )}
          </div>

          <div className="mb-8" ref={payToDropdownRef}>
            <label className="block text-sm font-medium text-[#0d3b3b] mb-2">Pay to</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPayToDropdownOpen(!isPayToDropdownOpen)}
                className={`w-full px-4 py-3 bg-white border rounded-full text-left flex items-center justify-between gap-2 transition-all duration-200 hover:border-gray-300 ${isPayToDropdownOpen ? "ring-2 ring-[#0d3b3b]/20 border-[#0d3b3b]" : ""} ${errors.payTo ? "border-red-500" : "border-gray-200"}`}
              >
                <span className={payTo ? "text-gray-900" : "text-gray-400"}>
                  {payTo || "Select an option"}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isPayToDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isPayToDropdownOpen && (
                <div className="absolute left-0 right-0 z-50 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="py-1">
                    {["Bank Account", "Mobile Money", "Cash Pickup"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          handlePayToChange(option);
                          setIsPayToDropdownOpen(false);
                        }}
                        className={`w-full px-6 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${payTo === option ? "bg-gray-50 text-[#0d3b3b]" : "text-gray-900"}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {errors.payTo && (
              <p className="mt-1.5 text-sm text-red-500">{errors.payTo}</p>
            )}
          </div>

          <Button fullWidth onClick={handleConvert} isLoading={isSubmitting}>
            Convert now
          </Button>
        </div>
      </div>
    </div>
  );
}
