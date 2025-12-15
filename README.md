# Novacrust

A crypto-to-cash conversion widget built with Next.js, TypeScript, and Tailwind CSS.


## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yar

### Installation

1. Clone the repository:
```bash
git clone https://github.com/viktorzee/novacrust-crypto.git
cd novacrust-crypto
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

## Assumptions & Trade-offs

### Assumptions


1. **10-digit Account Numbers**: Nigerian bank account validation assumes 10-digit format.

2. **Static Bank List**: The bank list is hardcoded with major Nigerian banks instead of fetching from an API.

3. **Single Currency Conversion**: The widget currently shows conversion to one fiat currency at the current time of development. The rate calculation is simplified (ETH: 3,500,000 NGN, USDT: 1,500 NGN).

### Trade-offs

1. **CSS-based Flag Icons**: Some currency icons (GHS, KES, ZAR) use CSS instead of images for faster loading and smaller bundle size, with slight visual simplification.

2. **Client-side Only**: All logic runs client-side.

3. **No State Management Library**: Uses React's built-in useState for simplicity instead of the known state management libraries e.g Redux, Zustand, react query.

4. **Inline SVGs**: Wallet icons (MetaMask, WalletConnect) use inline SVGs for reliability without external dependencies.

5. **Tailwind Utility Classes**: Heavy use of utility classes prioritizes rapid development over semantic CSS.