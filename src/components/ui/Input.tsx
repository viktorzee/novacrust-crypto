"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export function Input({
  label,
  error,
  hint,
  leftAddon,
  rightAddon,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[#0d3b3b] mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftAddon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-gray-500">
            {leftAddon}
          </div>
        )}
        <input
          id={inputId}
          className={`
            w-full px-4 py-3
            bg-white border border-gray-200 rounded-full
            text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#0d3b3b]/20 focus:border-[#0d3b3b]
            transition-all duration-200
            ${leftAddon ? "pl-10" : ""}
            ${rightAddon ? "pr-10" : ""}
            ${error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}
            ${className}
          `}
          {...props}
        />
        {rightAddon && (
          <div className="absolute right-3 flex items-center">
            {rightAddon}
          </div>
        )}
      </div>
      {hint && !error && (
        <p className="mt-1.5 text-sm text-gray-500">{hint}</p>
      )}
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
