# zkHole SDK

[![npm version](https://img.shields.io/npm/v/@zkhole/sdk.svg)](https://www.npmjs.com/package/@zkhole/sdk)
[![npm downloads](https://img.shields.io/npm/dm/@zkhole/sdk.svg)](https://www.npmjs.com/package/@zkhole/sdk)
[![GitHub release](https://img.shields.io/github/v/release/zkHole/zkhole-sdk)](https://github.com/zkHole/zkhole-sdk/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official TypeScript/JavaScript SDK for zkHole - enabling anonymous transactions on Solana.

## Installation

```bash
npm install @zkhole/sdk @solana/web3.js
```

## Quick Start

```typescript
import { ZkHoleClient } from "@zkhole/sdk";
import { Connection, clusterApiUrl } from "@solana/web3.js";

// Initialize connection
const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

// Create client
const client = new ZkHoleClient({
  connection,
  wallet: window.solana, // or any Solana wallet adapter
  network: "mainnet-beta",
});

// Send anonymous transaction
const transaction = await client.sendAnonymous({
  recipient: "RECIPIENT_ADDRESS",
  amount: 1.0,
  memo: "Anonymous transfer",
});

console.log("Transaction signature:", transaction.signature);
```

## API Reference

### ZkHoleClient

Main client for interacting with zkHole protocol.

#### Constructor

```typescript
new ZkHoleClient(config: ZkHoleConfig)
```

**Parameters:**

- `connection`: Solana Connection instance
- `wallet`: Wallet adapter instance
- `network`: 'mainnet-beta' | 'devnet' | 'testnet'
- `timeout` (optional): Request timeout in ms (default: 30000)

#### Methods

##### sendAnonymous()

Send an anonymous transaction through zkHole protocol.

```typescript
async sendAnonymous(params: TransactionParams): Promise<Transaction>
```

**Parameters:**

- `recipient`: Destination wallet address (string)
- `amount`: Amount in SOL (number)
- `memo` (optional): Transaction memo (string)

**Returns:** Promise<Transaction>

##### confirmTransaction()

Confirm a transaction by signature.

```typescript
async confirmTransaction(signature: string): Promise<Confirmation>
```

##### getBalance()

Get wallet balance.

```typescript
async getBalance(address: string): Promise<number>
```

##### getTransactionHistory()

Get transaction history.

```typescript
async getTransactionHistory(limit?: number): Promise<Transaction[]>
```

## Type Definitions

### ZkHoleConfig

```typescript
interface ZkHoleConfig {
  connection: Connection;
  wallet: WalletAdapter;
  network: "mainnet-beta" | "devnet" | "testnet";
  timeout?: number;
}
```

### TransactionParams

```typescript
interface TransactionParams {
  recipient: string;
  amount: number;
  memo?: string;
}
```

### Transaction

```typescript
interface Transaction {
  signature: string;
  status: "pending" | "confirmed" | "failed";
  timestamp: number;
  amount?: number;
  recipient?: string;
}
```

## Error Handling

```typescript
try {
  const tx = await client.sendAnonymous({
    recipient: "ADDRESS",
    amount: 1.0,
  });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("Invalid parameters:", error.message);
  } else if (error instanceof InsufficientFundsError) {
    console.error("Not enough SOL:", error.message);
  } else if (error instanceof NetworkError) {
    console.error("Network issue:", error.message);
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Run tests
npm test

# Lint
npm run lint
```

## License

MIT

## Links

- 📦 [npm Package](https://www.npmjs.com/package/@zkhole/sdk)
- 📚 [Documentation](https://zk-hole.xyz/docs)
- 🌐 [Website](https://zk-hole.xyz)
- 💻 [GitHub](https://github.com/zkHole/zkhole-sdk)
- 📋 [Changelog](https://github.com/zkHole/zkhole-sdk/blob/main/CHANGELOG.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

- 🐛 [Report Issues](https://github.com/zkHole/zkhole-sdk/issues)
- 💬 [Discussions](https://github.com/zkHole/zkhole-sdk/discussions)
- 🐦 [Twitter/X](https://x.com/zkholexyz)
