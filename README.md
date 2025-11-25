# zkHole SDK

[![npm version](https://img.shields.io/npm/v/@zkhole/sdk.svg)](https://www.npmjs.com/package/@zkhole/sdk)
[![npm downloads](https://img.shields.io/npm/dm/@zkhole/sdk.svg)](https://www.npmjs.com/package/@zkhole/sdk)
[![GitHub release](https://img.shields.io/github/v/release/zkHole/zkhole-sdk)](https://github.com/zkHole/zkhole-sdk/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official TypeScript/JavaScript SDK for zkHole - A comprehensive privacy-preserving protocol suite for Solana.

## Features

- 🌀 **BlackHole Mixer** - Anonymous transactions with decentralized proxy routing
- 🆔 **HoleID** - Unlinkable private identity with zero-knowledge proofs
- ✉️ **HoleMail** - End-to-end encrypted messaging on Solana
- 🔄 **HoleSwap** - Private DEX with MEV protection and untraceable flows

## Installation

### From npm (Recommended)

```bash
npm install @zkhole/sdk @solana/web3.js
```

### From GitHub Packages

Configure your `.npmrc`:

```bash
echo "@zkhole:registry=https://npm.pkg.github.com" >> .npmrc
```

Authenticate with GitHub:

```bash
npm login --scope=@zkhole --auth-type=legacy --registry=https://npm.pkg.github.com
```

Install:

```bash
npm install @zkhole/sdk @solana/web3.js
```

## Quick Start

```typescript
import {
  ZkHoleClient,
  HoleIDClient,
  HoleMailClient,
  HoleSwapClient,
} from "@zkhole/sdk";
import { Connection, clusterApiUrl } from "@solana/web3.js";

// Initialize connection
const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
const wallet = window.solana; // or any Solana wallet adapter

// Create clients
const blackhole = new ZkHoleClient({ connection, wallet, network: "mainnet-beta" });
const holeid = new HoleIDClient({ connection, wallet, network: "mainnet-beta" });
const holemail = new HoleMailClient({ connection, wallet, network: "mainnet-beta" });
const holeswap = new HoleSwapClient({ connection, wallet, network: "mainnet-beta" });
```

---

## 🌀 BlackHole Mixer

Anonymous transaction proxy that breaks the link between sender and receiver.

### Send Anonymous Transaction

```typescript
const transaction = await blackhole.sendAnonymous({
  recipient: "RECIPIENT_ADDRESS",
  amount: 1.0,
  memo: "Anonymous transfer",
});

console.log("Transaction signature:", transaction.signature);
```

### API Reference

#### `sendAnonymous(params: TransactionParams): Promise<Transaction>`

**Parameters:**
- `recipient` (string) - Destination wallet address
- `amount` (number) - Amount in SOL
- `memo` (optional, string) - Transaction memo

**Returns:** `Promise<Transaction>`

---

## 🆔 HoleID

Unlinkable private identity system with verifiable credentials.

### Create Identity

```typescript
const identity = await holeid.createIdentity({
  username: "alice",
});

console.log("HoleID:", identity.holeId); // hole_abc123...
console.log("Credential:", identity.credential);
console.log("ZK Proof:", identity.zkProof);
```

### Generate Credential

```typescript
const credential = await holeid.generateCredential({
  holeId: identity.holeId,
  claims: {
    age: 25,
    country: "US",
    verified: true,
  },
  expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
});

console.log("Credential ID:", credential.credentialId);
```

### Verify Credential

```typescript
const result = await holeid.verifyCredential({
  credential,
  requiredClaims: ["age", "verified"],
});

console.log("Valid:", result.isValid);
console.log("Proof Valid:", result.proofValid);
console.log("Not Expired:", result.notExpired);
```

### API Reference

#### `createIdentity(params: IdentityParams): Promise<Identity>`

**Parameters:**
- `username` (string) - Unique username (min 3 characters)
- `metadata` (optional, object) - Additional metadata

**Returns:** `Promise<Identity>`

#### `generateCredential(params: CredentialParams): Promise<Credential>`

**Parameters:**
- `holeId` (string) - HoleID to issue credential for
- `claims` (object) - Key-value pairs of claims
- `expiresAt` (optional, number) - Expiration timestamp

**Returns:** `Promise<Credential>`

#### `verifyCredential(params: VerificationParams): Promise<VerificationResult>`

**Parameters:**
- `credential` (Credential) - Credential to verify
- `requiredClaims` (optional, string[]) - Required claim keys

**Returns:** `Promise<VerificationResult>`

#### `revoke(holeId: string): Promise<{ success: boolean; revokedAt: number }>`

Revoke an identity or credential.

---

## ✉️ HoleMail

End-to-end encrypted messaging with anonymous routing.

### Send Message

```typescript
const message = await holemail.sendMessage({
  recipient: "hole_xyz789...",
  subject: "Hello",
  content: "This is a private message",
});

console.log("Message ID:", message.messageId); // msg_abc123...
console.log("Status:", message.status); // "sent"
```

### Read Messages

```typescript
// Get inbox
const messages = await holemail.getInbox({
  limit: 20,
  filter: "unread",
});

// Read specific message
const message = await holemail.readMessage("msg_abc123...");
console.log("Content:", message.content);
```

### Delete Message

```typescript
await holemail.deleteMessage("msg_abc123...");
```

### API Reference

#### `sendMessage(params: MessageParams): Promise<Message>`

**Parameters:**
- `recipient` (string) - Recipient HoleID
- `subject` (string) - Message subject
- `content` (string) - Message content
- `attachments` (optional, string[]) - Attachment references

**Returns:** `Promise<Message>`

#### `getInbox(params?: InboxParams): Promise<Message[]>`

**Parameters:**
- `limit` (optional, number) - Max messages to fetch (default: 20)
- `offset` (optional, number) - Pagination offset
- `filter` (optional, string) - "all" | "unread" | "read"

**Returns:** `Promise<Message[]>`

#### `readMessage(messageId: string): Promise<Message>`

Decrypt and read a message.

#### `deleteMessage(messageId: string): Promise<{ success: boolean }>`

Delete a message.

#### `getMessageStatus(messageId: string): Promise<MessageStatus>`

Get delivery status of a message.

---

## 🔄 HoleSwap

Private decentralized exchange with MEV protection.

### Get Quote

```typescript
const quote = await holeswap.getQuote({
  fromToken: "SOL",
  toToken: "USDC",
  amount: 10,
});

console.log("Exchange Rate:", quote.exchangeRate);
console.log("Output Amount:", quote.outputAmount);
console.log("Price Impact:", quote.priceImpact, "%");
```

### Execute Swap

```typescript
const result = await holeswap.executeSwap({
  fromToken: "SOL",
  toToken: "USDC",
  amount: 10,
  slippageTolerance: 0.02, // 2%
});

console.log("Swap ID:", result.swapId); // swap_abc123...
console.log("Output Amount:", result.outputAmount);
console.log("Signature:", result.signature);
```

### Get Pool Info

```typescript
const pool = await holeswap.getPoolInfo("SOL", "USDC");
console.log("Liquidity:", pool.liquidityA, pool.liquidityB);
console.log("24h Volume:", pool.volume24h);
console.log("APY:", pool.apy, "%");
```

### Supported Tokens

```typescript
const tokens = holeswap.getSupportedTokens();
console.log(tokens); // ["SOL", "USDC", "USDT", "RAY", "SRM", "ORCA"]
```

### API Reference

#### `getQuote(params: SwapParams): Promise<SwapQuote>`

**Parameters:**
- `fromToken` (string) - Source token symbol
- `toToken` (string) - Destination token symbol
- `amount` (number) - Input amount
- `slippageTolerance` (optional, number) - Max slippage (default: 0.02)

**Returns:** `Promise<SwapQuote>`

#### `executeSwap(params: SwapParams): Promise<SwapResult>`

Execute a private swap with MEV protection.

#### `getSwapStatus(swapId: string): Promise<SwapStatus>`

Get swap execution status.

#### `getPoolInfo(tokenA: string, tokenB: string): Promise<PoolInfo>`

Get liquidity pool information.

#### `getSupportedTokens(): string[]`

Get list of supported token symbols.

---

## Error Handling

All clients throw typed errors:

```typescript
import {
  ValidationError,
  InsufficientFundsError,
  NetworkError,
  TransactionError,
  WalletError,
} from "@zkhole/sdk";

try {
  const tx = await blackhole.sendAnonymous({
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
  } else if (error instanceof TransactionError) {
    console.error("Transaction failed:", error.message);
  } else if (error instanceof WalletError) {
    console.error("Wallet error:", error.message);
  }
}
```

## TypeScript Support

The SDK is written in TypeScript and includes full type definitions:

```typescript
import type {
  // BlackHole
  ZkHoleConfig,
  TransactionParams,
  Transaction,
  // HoleID
  HoleIDConfig,
  IdentityParams,
  Identity,
  Credential,
  // HoleMail
  HoleMailConfig,
  MessageParams,
  Message,
  // HoleSwap
  HoleSwapConfig,
  SwapParams,
  SwapQuote,
  SwapResult,
} from "@zkhole/sdk";
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

## Examples

Check out the [examples directory](https://github.com/zkHole/zkhole-sdk/tree/main/examples) for complete working examples of each feature.

## License

MIT

## Links

- 📦 [npm Package](https://www.npmjs.com/package/@zkhole/sdk)
- 📦 [GitHub Packages](https://github.com/orgs/zkHole/packages/npm/package/sdk)
- 📚 [Documentation](https://zk-hole.xyz/docs)
- 🌐 [Website](https://zk-hole.xyz)
- 💻 [GitHub](https://github.com/zkHole/zkhole-sdk)
- 📋 [Changelog](https://github.com/zkHole/zkhole-sdk/blob/main/CHANGELOG.md)
- 🗺️ [Roadmap](https://zk-hole.xyz/roadmap)

## Community

- 🐛 [Report Issues](https://github.com/zkHole/zkhole-sdk/issues)
- 💬 [Discussions](https://github.com/zkHole/zkhole-sdk/discussions)
- 🐦 [Twitter/X](https://x.com/zkholexyz)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support and questions, please:
1. Check the [documentation](https://zk-hole.xyz/docs)
2. Search [existing issues](https://github.com/zkHole/zkhole-sdk/issues)
3. Join the discussion on [X](https://x.com/zkholexyz)
