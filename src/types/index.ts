export interface Currency {
  symbol: string;
  name: string;
  icon?: string;
  network?: string;
}

export interface Wallet {
  id: string;
  name: string;
  icon?: string;
}

export interface Bank {
  id: string;
  name: string;
  code: string;
}

export interface RecipientDetails {
  bank?: Bank;
  accountNumber?: string;
  accountName?: string;
  email?: string;
  phoneNumber?: string;
  countryCode?: string;
}

export type TabType = 'crypto-to-cash' | 'cash-to-crypto' | 'crypto-to-fiat-loan';

export interface ConversionState {
  payAmount: string;
  payCurrency: Currency;
  receiveAmount: string;
  receiveCurrency: Currency;
  payFrom: Wallet | null;
  payTo: string;
}
