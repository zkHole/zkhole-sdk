// Main exports
export { ZkHoleClient } from "./client";
export { HoleIDClient } from "./holeid-client";
export { HoleMailClient } from "./holemail-client";
export { HoleSwapClient } from "./holeswap-client";

// Type exports - BlackHole
export type {
  WalletAdapter,
  ZkHoleConfig,
  TransactionParams,
  TransactionStatus,
  Transaction,
  Confirmation,
  Balance,
} from "./types";

// Type exports - HoleID
export type {
  HoleIDConfig,
  IdentityParams,
  Identity,
  CredentialParams,
  Credential,
  VerificationParams,
  VerificationResult,
} from "./types";

// Type exports - HoleMail
export type {
  HoleMailConfig,
  MessageParams,
  Message,
  MessageStatus,
  InboxParams,
} from "./types";

// Type exports - HoleSwap
export type {
  HoleSwapConfig,
  SwapParams,
  SwapQuote,
  SwapResult,
  SwapStatus,
  PoolInfo,
} from "./types";

// Error exports
export {
  ZkHoleError,
  ValidationError,
  InsufficientFundsError,
  NetworkError,
  TransactionError,
  WalletError,
} from "./errors";
