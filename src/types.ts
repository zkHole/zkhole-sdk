import { Connection } from "@solana/web3.js";

/**
 * Wallet adapter interface compatible with Solana wallet standards
 */
export interface WalletAdapter {
  publicKey: {
    toString(): string;
  };
  signTransaction?: (transaction: any) => Promise<any>;
  signAllTransactions?: (transactions: any[]) => Promise<any[]>;
  connect?: () => Promise<void>;
  disconnect?: () => Promise<void>;
}

/**
 * Configuration for ZkHoleClient
 */
export interface ZkHoleConfig {
  connection: Connection;
  wallet: WalletAdapter;
  network: "mainnet-beta" | "devnet" | "testnet";
  timeout?: number;
}

/**
 * Parameters for sending anonymous transactions
 */
export interface TransactionParams {
  recipient: string;
  amount: number;
  memo?: string;
}

/**
 * Transaction status types
 */
export type TransactionStatus = "pending" | "confirmed" | "failed";

/**
 * Transaction object returned from operations
 */
export interface Transaction {
  signature: string;
  status: TransactionStatus;
  timestamp: number;
  amount?: number;
  recipient?: string;
}

/**
 * Transaction confirmation details
 */
export interface Confirmation {
  signature: string;
  confirmed: boolean;
  slot?: number;
  blockTime?: number;
  error?: string;
}

/**
 * Balance information
 */
export interface Balance {
  address: string;
  lamports: number;
  sol: number;
}

// ==================== HoleID Types ====================

/**
 * Configuration for HoleIDClient
 */
export interface HoleIDConfig {
  connection: Connection;
  wallet: WalletAdapter;
  network: "mainnet-beta" | "devnet" | "testnet";
  timeout?: number;
}

/**
 * Parameters for creating a new identity
 */
export interface IdentityParams {
  username: string;
  metadata?: Record<string, any>;
}

/**
 * Identity object with verifiable credentials
 */
export interface Identity {
  holeId: string;
  username: string;
  credential: string;
  zkProof: string;
  timestamp: number;
  status: "active" | "revoked";
}

/**
 * Parameters for generating a credential
 */
export interface CredentialParams {
  holeId: string;
  claims: Record<string, any>;
  expiresAt?: number;
}

/**
 * Verifiable credential
 */
export interface Credential {
  credentialId: string;
  holeId: string;
  claims: Record<string, any>;
  zkProof: string;
  issuedAt: number;
  expiresAt?: number;
  status: "valid" | "expired" | "revoked";
}

/**
 * Parameters for verifying a credential
 */
export interface VerificationParams {
  credential: Credential;
  requiredClaims?: string[];
}

/**
 * Verification result
 */
export interface VerificationResult {
  isValid: boolean;
  proofValid: boolean;
  notExpired: boolean;
  claimsValid: boolean;
  verifiedAt: number;
}

// ==================== HoleMail Types ====================

/**
 * Configuration for HoleMailClient
 */
export interface HoleMailConfig {
  connection: Connection;
  wallet: WalletAdapter;
  network: "mainnet-beta" | "devnet" | "testnet";
  timeout?: number;
}

/**
 * Parameters for sending a message
 */
export interface MessageParams {
  recipient: string;
  subject: string;
  content: string;
  attachments?: string[];
}

/**
 * Encrypted message object
 */
export interface Message {
  messageId: string;
  recipient: string;
  subject: string;
  content?: string;
  encryptedContent: string;
  encryptedMetadata: string;
  routingProof: string;
  timestamp: number;
  status: "pending" | "sent" | "delivered" | "read" | "failed";
}

/**
 * Message status details
 */
export interface MessageStatus {
  messageId: string;
  status: "pending" | "sent" | "delivered" | "read" | "failed";
  sentAt: number;
  deliveredAt?: number;
  readAt?: number;
}

/**
 * Parameters for fetching inbox
 */
export interface InboxParams {
  limit?: number;
  offset?: number;
  filter?: "all" | "unread" | "read";
}

// ==================== HoleSwap Types ====================

/**
 * Configuration for HoleSwapClient
 */
export interface HoleSwapConfig {
  connection: Connection;
  wallet: WalletAdapter;
  network: "mainnet-beta" | "devnet" | "testnet";
  timeout?: number;
}

/**
 * Parameters for executing a swap
 */
export interface SwapParams {
  fromToken: string;
  toToken: string;
  amount: number;
  slippageTolerance?: number;
}

/**
 * Swap quote with pricing information
 */
export interface SwapQuote {
  fromToken: string;
  toToken: string;
  inputAmount: number;
  outputAmount: number;
  exchangeRate: number;
  minimumReceived: number;
  priceImpact: number;
  fee: number;
  route: string[];
  estimatedTime: number;
}

/**
 * Swap execution result
 */
export interface SwapResult {
  swapId: string;
  signature: string;
  fromToken: string;
  toToken: string;
  inputAmount: number;
  outputAmount: number;
  exchangeRate: number;
  zkProof: string;
  routingProof: string;
  status: "pending" | "completed" | "failed";
  timestamp: number;
}

/**
 * Swap status details
 */
export interface SwapStatus {
  swapId: string;
  status: "pending" | "completed" | "failed";
  timestamp: number;
  confirmations?: number;
  error?: string;
}

/**
 * Pool information
 */
export interface PoolInfo {
  tokenA: string;
  tokenB: string;
  liquidityA: number;
  liquidityB: number;
  fee: number;
  volume24h: number;
  apy: number;
}
