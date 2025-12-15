"use client";

import { useState } from "react";
import { CryptoToCashWidget } from "@/components/screens/CryptoToCashWidget";
import { RecipientDetails } from "@/components/screens/RecipientDetails";

type Screen = "widget" | "recipient";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("widget");

  return (
    <main className="min-h-screen bg-[#1a1a1a] py-8 px-4 flex items-center justify-center">
      {currentScreen === "widget" && (
        <CryptoToCashWidget onConvert={() => setCurrentScreen("recipient")} />
      )}
      {currentScreen === "recipient" && (
        <RecipientDetails
          onBack={() => setCurrentScreen("widget")}
          onNext={() => {}}
        />
      )}
    </main>
  );
}
