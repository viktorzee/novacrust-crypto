"use client";

import React from "react";
import Image from "next/image";
import { FiArrowLeft, FiCopy, FiCheck, FiInfo } from "react-icons/fi";
import { RiWallet3Line } from "react-icons/ri";

interface IconProps {
  className?: string;
  size?: number;
}

export function EthIcon({ className = "", size = 20 }: IconProps) {
  return (
    <div className={`shrink-0 ${className}`} style={{ width: size, height: size }}>
      <Image src="/icons/eth.png" alt="ETH" width={size} height={size} />
    </div>
  );
}

export function UsdtCeloIcon({ className = "", size = 20 }: IconProps) {
  return (
    <div className={`shrink-0 ${className}`} style={{ width: size, height: size }}>
      <Image src="/icons/celo.png" alt="USDT CELO" width={size} height={size} />
    </div>
  );
}

export function UsdtTonIcon({ className = "", size = 20 }: IconProps) {
  return (
    <div className={`shrink-0 ${className}`} style={{ width: size, height: size }}>
      <Image src="/icons/ton.png" alt="USDT TON" width={size} height={size} />
    </div>
  );
}

export function UsdtBnbIcon({ className = "", size = 20 }: IconProps) {
  return (
    <div className={`shrink-0 ${className}`} style={{ width: size, height: size }}>
      <Image src="/icons/bnb.png" alt="USDT BNB" width={size} height={size} />
    </div>
  );
}

export function NgnIcon({ className = "", size = 20 }: IconProps) {
  return (
    <div
      className={`shrink-0 rounded-full overflow-hidden flex ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="h-full" style={{ width: '33.33%', backgroundColor: '#008751' }} />
      <div className="h-full" style={{ width: '33.33%', backgroundColor: '#FFFFFF' }} />
      <div className="h-full" style={{ width: '33.34%', backgroundColor: '#008751' }} />
    </div>
  );
}

export function GhsIcon({ className = "", size = 20 }: IconProps) {
  return (
    <div
      className={`rounded-full bg-[#CE1126] flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="text-white font-bold" style={{ fontSize: size * 0.5 }}>₵</span>
    </div>
  );
}

export function KesIcon({ className = "", size = 20 }: IconProps) {
  return (
    <div
      className={`rounded-full bg-[#006600] flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="text-white font-bold" style={{ fontSize: size * 0.4 }}>KSh</span>
    </div>
  );
}

export function ZarIcon({ className = "", size = 20 }: IconProps) {
  return (
    <div
      className={`rounded-full bg-[#007749] flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="text-white font-bold" style={{ fontSize: size * 0.5 }}>R</span>
    </div>
  );
}

export function MetamaskIcon({ className = "", size = 20 }: IconProps) {
  return (
    <div
      className={`flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 318.6 318.6">
        <path fill="#e2761b" stroke="#e2761b" strokeLinecap="round" strokeLinejoin="round" d="m274.1 35.5-99.5 73.9 18.4-43.6z"/>
        <path fill="#e4761b" stroke="#e4761b" strokeLinecap="round" strokeLinejoin="round" d="m44.4 35.5 98.7 74.6-17.5-44.3zm193.9 171.3-26.5 40.6 56.7 15.6 16.3-55.3zm-204.4.9 16.2 55.3 56.7-15.6-26.5-40.6z"/>
        <path fill="#e4761b" stroke="#e4761b" strokeLinecap="round" strokeLinejoin="round" d="m103.6 138.2-15.8 23.9 56.3 2.5-2-60.5zm111.3 0-39-34.8-1.3 61.2 56.2-2.5zM106.8 247.4l33.8-16.5-29.2-22.8zm71.1-16.5 33.9 16.5-4.7-39.3z"/>
        <path fill="#d7c1b3" stroke="#d7c1b3" strokeLinecap="round" strokeLinejoin="round" d="m211.8 247.4-33.9-16.5 2.7 22.1-.3 9.3zm-105 0 31.5 14.9-.2-9.3 2.5-22.1z"/>
        <path fill="#233447" stroke="#233447" strokeLinecap="round" strokeLinejoin="round" d="m138.8 193.5-28.2-8.3 19.9-9.1zm40.9 0 8.3-17.4 20 9.1z"/>
        <path fill="#cd6116" stroke="#cd6116" strokeLinecap="round" strokeLinejoin="round" d="m106.8 247.4 4.8-40.6-31.3.9zm100.1-40.6 4.9 40.6 26.4-39.7zm23.8-44.7-56.2 2.5 5.2 28.9 8.3-17.4 20 9.1zm-120.2 23.1 20-9.1 8.2 17.4 5.3-28.9-56.3-2.5z"/>
        <path fill="#e4751f" stroke="#e4751f" strokeLinecap="round" strokeLinejoin="round" d="m87.8 162.1 23.6 46-.8-22.9zm120.3 23.1-.7 22.9 23.5-46zm-64-20.6-5.3 28.9 6.6 34.1 1.5-44.9zm30.5 0-2.7 18 1.2 45 6.7-34.1z"/>
        <path fill="#f6851b" stroke="#f6851b" strokeLinecap="round" strokeLinejoin="round" d="m179.8 193.5-6.7 34.1 4.8 3.3 29.2-22.8.7-22.9zm-69.2-8.3.8 22.9 29.2 22.8 4.8-3.3-6.6-34.1z"/>
        <path fill="#c0ad9e" stroke="#c0ad9e" strokeLinecap="round" strokeLinejoin="round" d="m180.3 262.3.3-9.3-2.5-2.2h-37.7l-2.3 2.2.2 9.3-31.5-14.9 11 9 22.3 15.5h38.3l22.4-15.5 11-9z"/>
        <path fill="#161616" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" d="m177.9 230.9-4.8-3.3h-27.7l-4.8 3.3-2.5 22.1 2.3-2.2h37.7l2.5 2.2z"/>
        <path fill="#763d16" stroke="#763d16" strokeLinecap="round" strokeLinejoin="round" d="m278.3 114.2 8.5-40.8-12.7-37.9-96.2 71.4 37 31.3 52.3 15.3 11.6-13.5-5-3.6 8-7.3-6.2-4.8 8-6.1zM31.8 73.4l8.5 40.8-5.4 4 8 6.1-6.1 4.8 8 7.3-5 3.6 11.5 13.5 52.3-15.3 37-31.3-96.2-71.4z"/>
        <path fill="#f6851b" stroke="#f6851b" strokeLinecap="round" strokeLinejoin="round" d="m267.2 153.5-52.3-15.3 15.9 23.9-23.5 46 31.2-.4h46.5zm-163.6-15.3-52.3 15.3-17.4 54.2h46.4l31.1.4-23.5-46zm71 26.4 3.3-57.7 15.2-41.1h-67.5l15 41.1 3.5 57.7 1.2 18.2.1 44.8h27.7l.2-44.8z"/>
      </svg>
    </div>
  );
}

export function RainbowIcon({ className = "", size = 20 }: IconProps) {
  return (
    <div className={`shrink-0 ${className}`} style={{ width: size, height: size }}>
      <Image src="/icons/rainbow.png" alt="Rainbow" width={size} height={size} />
    </div>
  );
}

export function WalletConnectIcon({ className = "", size = 20 }: IconProps) {
  return (
    <div
      className={`rounded-full bg-[#3B99FC] flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 300 185" fill="none">
        <path d="M61.4 36.3c49.1-48.1 128.6-48.1 177.7 0l5.9 5.8c2.5 2.4 2.5 6.3 0 8.7l-20.2 19.8c-1.2 1.2-3.2 1.2-4.4 0l-8.1-8c-34.3-33.5-89.8-33.5-124 0l-8.7 8.5c-1.2 1.2-3.2 1.2-4.4 0L54.9 51.3c-2.5-2.4-2.5-6.3 0-8.7l6.5-6.3zM280.2 77l18 17.6c2.5 2.4 2.5 6.3 0 8.7l-81.2 79.5c-2.5 2.4-6.4 2.4-8.9 0l-57.6-56.5c-.6-.6-1.6-.6-2.2 0L90.6 182.9c-2.5 2.4-6.4 2.4-8.9 0L.5 103.3c-2.5-2.4-2.5-6.3 0-8.7l18-17.6c2.5-2.4 6.4-2.4 8.9 0l57.6 56.5c.6.6 1.6.6 2.2 0l57.6-56.5c2.5-2.4 6.4-2.4 8.9 0l57.6 56.5c.6.6 1.6.6 2.2 0L271.3 77c2.4-2.4 6.4-2.4 8.9 0z" fill="#fff"/>
      </svg>
    </div>
  );
}

export function OtherWalletIcon({ className = "", size = 20 }: IconProps) {
  return (
    <div
      className={`rounded-full bg-gray-500 flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <RiWallet3Line color="white" size={size * 0.55} />
    </div>
  );
}

export function BackArrowIcon({ className = "", size = 20 }: IconProps) {
  return <FiArrowLeft size={size} className={className} />;
}

export function CopyIcon({ className = "", size = 16 }: IconProps) {
  return <FiCopy size={size} className={className} />;
}

export function CheckCircleIcon({ className = "", size = 64 }: IconProps) {
  return (
    <div
      className={`rounded-full bg-[#22C55E] flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <FiCheck color="white" size={size * 0.45} strokeWidth={3} />
    </div>
  );
}

export function InfoIcon({ className = "", size = 16 }: IconProps) {
  return <FiInfo size={size} className={className} />;
}
