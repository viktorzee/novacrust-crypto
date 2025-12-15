"use client";

import React from "react";

interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="inline-flex items-center gap-1 p-1 border border-gray-200 rounded-full bg-white whitespace-nowrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => !tab.disabled && onChange(tab.id)}
          disabled={tab.disabled}
          className={`
            px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap
            transition-all duration-200
            ${
              activeTab === tab.id
                ? "bg-[#0d3b3b] text-white"
                : "text-gray-500 hover:text-gray-700"
            }
            ${tab.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
