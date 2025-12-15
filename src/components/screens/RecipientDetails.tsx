"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/Button";
import { BackArrowIcon } from "../ui/Icons";

interface Bank {
  id: string;
  name: string;
  code: string;
}

const banks: Bank[] = [
  { id: "1", name: "Access Bank", code: "044" },
  { id: "2", name: "First Bank", code: "011" },
  { id: "3", name: "GTBank", code: "058" },
  { id: "4", name: "UBA", code: "033" },
  { id: "5", name: "Zenith Bank", code: "057" },
  { id: "6", name: "Kuda Bank", code: "090267" },
  { id: "7", name: "Opay", code: "999992" },
  { id: "8", name: "Palmpay", code: "999991" },
  { id: "9", name: "Moniepoint", code: "999993" },
  { id: "10", name: "Sterling Bank", code: "232" },
];

const mockAccountName = "ODUTUGA GBEKE";

interface RecipientDetailsProps {
  onBack?: () => void;
  onNext?: (data: {
    bank: Bank;
    accountNumber: string;
    accountName: string;
  }) => void;
}

export function RecipientDetails({ onBack, onNext }: RecipientDetailsProps) {
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBankDropdownOpen(false);
        setSearchQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (accountNumber.length === 10 && selectedBank) {
      setIsLoading(true);
      setError("");
      setAccountName("");

      const timer = setTimeout(() => {
        setAccountName(mockAccountName);
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setAccountName("");
    }
  }, [accountNumber, selectedBank]);

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setAccountNumber(value);
    if (value.length < 10) {
      setAccountName("");
      setError("");
    }
  };

  const handleNext = () => {
    if (!selectedBank) {
      setError("Please select a bank");
      return;
    }
    if (accountNumber.length !== 10) {
      setError("Please enter a valid 10-digit account number");
      return;
    }
    if (!accountName) {
      setError("Unable to verify account. Please try again.");
      return;
    }

    onNext?.({
      bank: selectedBank,
      accountNumber,
      accountName,
    });
  };

  const isFormValid = selectedBank && accountNumber.length === 10 && accountName && !isLoading;

  return (
    <div className="w-full max-w-[512px] mx-auto">
      <div className="bg-white rounded-3xl shadow-xl">
        <div className="p-6 pb-8">
          <div className="flex items-center mb-8">
            <button
              type="button"
              onClick={onBack}
              className="p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Go back"
            >
              <BackArrowIcon size={20} />
            </button>
            <h1 className="flex-1 text-center text-lg font-semibold text-gray-900 pr-8">
              Recipient details
            </h1>
          </div>

          <div className="mb-6" ref={dropdownRef}>
            <label className="block text-sm font-medium text-[#0d3b3b] mb-2">Bank</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsBankDropdownOpen(!isBankDropdownOpen)}
                className={`
                  w-full px-4 py-3
                  bg-white border border-gray-200 rounded-full
                  text-left flex items-center justify-between gap-2
                  transition-all duration-200 hover:border-gray-300
                  ${isBankDropdownOpen ? "ring-2 ring-[#0d3b3b]/20 border-[#0d3b3b]" : ""}
                `}
              >
                <span className={selectedBank ? "text-gray-900" : "text-gray-400"}>
                  {selectedBank?.name || "Select an option"}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isBankDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isBankDropdownOpen && (
                <div className="absolute left-0 right-0 z-50 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-3 border-b border-gray-100">
                    <div className="relative">
                      <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search banks..."
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="max-h-60 overflow-y-auto py-1">
                    {filteredBanks.length === 0 ? (
                      <div className="px-4 py-3 text-gray-500 text-sm text-center">
                        No banks found
                      </div>
                    ) : (
                      filteredBanks.map((bank) => (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => {
                            setSelectedBank(bank);
                            setIsBankDropdownOpen(false);
                            setSearchQuery("");
                          }}
                          className={`
                            w-full px-6 py-3 text-left
                            hover:bg-gray-50 transition-colors duration-150
                            ${selectedBank?.id === bank.id ? "bg-gray-50 text-[#0d3b3b]" : "text-gray-900"}
                          `}
                        >
                          {bank.name}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#0d3b3b] mb-2">Account number</label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={accountNumber}
                onChange={handleAccountNumberChange}
                placeholder="Enter your account number"
                className={`
                  w-full px-4 py-3
                  bg-white border border-gray-200 rounded-full
                  text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-[#0d3b3b]/20 focus:border-[#0d3b3b]
                  transition-all duration-200
                `}
              />
              {isLoading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg
                    className="animate-spin h-5 w-5 text-[#0d3b3b]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              )}
            </div>

          </div>

          {accountName && !isLoading && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0d3b3b] mb-2">Account name</label>
              <div className="w-full px-4 py-3 bg-gray-100 rounded-full text-gray-900">
                {accountName}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="min-h-[200px] flex items-end">
            <Button fullWidth onClick={handleNext} disabled={!isFormValid}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
