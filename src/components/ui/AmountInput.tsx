"use client";

import React, { useState, useRef, useEffect } from "react";

interface Currency {
  symbol: string;
  name: string;
  icon?: React.ReactNode;
}

interface AmountInputProps {
  label: string;
  amount: string;
  onAmountChange?: (amount: string) => void;
  currency: Currency;
  onCurrencyChange?: (currency: Currency) => void;
  currencies?: Currency[];
  readOnly?: boolean;
  placeholder?: string;
  searchable?: boolean;
}

export function AmountInput({
  label,
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  currencies = [],
  readOnly = false,
  placeholder = "0.00",
  searchable = false,
}: AmountInputProps) {
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
        setSearchQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isCurrencyOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isCurrencyOpen, searchable]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      onAmountChange?.(value);
    }
  };

  const filteredCurrencies = searchable
    ? currencies.filter(
        (c) =>
          c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currencies;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4">
      <label className="block text-sm text-gray-500 mb-2">{label}</label>
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={handleAmountChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`
            flex-1 text-2xl font-semibold bg-transparent text-gray-900
            focus:outline-none min-w-0
            ${readOnly ? "cursor-default" : ""}
          `}
        />
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => currencies.length > 0 && setIsCurrencyOpen(!isCurrencyOpen)}
            className={`
              flex items-center gap-2 px-3 py-1.5
              bg-white border border-gray-200 rounded-full
              text-sm font-medium
              ${currencies.length > 0 ? "hover:border-gray-300 cursor-pointer" : "cursor-default"}
            `}
          >
            {currency.icon}
            <span className="text-gray-900">{currency.symbol}</span>
            {currencies.length > 0 && (
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  isCurrencyOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>

          {isCurrencyOpen && currencies.length > 0 && (
            <div className="absolute right-0 z-50 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
              {searchable && (
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search"
                      className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none"
                    />
                  </div>
                </div>
              )}
              <div className="max-h-60 overflow-y-auto py-1">
                {filteredCurrencies.length === 0 ? (
                  <div className="px-4 py-3 text-gray-500 text-sm text-center">
                    No currencies found
                  </div>
                ) : (
                  filteredCurrencies.map((curr) => (
                    <button
                      key={curr.symbol}
                      type="button"
                      onClick={() => {
                        onCurrencyChange?.(curr);
                        setIsCurrencyOpen(false);
                        setSearchQuery("");
                      }}
                      className={`
                        w-full px-6 py-3 flex items-center gap-3 text-left
                        hover:bg-gray-50 transition-colors duration-150
                        ${currency.symbol === curr.symbol ? "bg-gray-50" : ""}
                      `}
                    >
                      {curr.icon}
                      <span className="text-gray-900">{curr.symbol}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
