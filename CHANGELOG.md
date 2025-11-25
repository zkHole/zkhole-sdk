# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-11-26

### Added

#### HoleID - Private Identity System
- `HoleIDClient` class for managing unlinkable private identities
- `createIdentity()` - Create new identity with zero-knowledge proofs
- `generateCredential()` - Generate verifiable credentials with custom claims
- `verifyCredential()` - Verify credentials without revealing identity
- `revoke()` - Revoke identities or credentials
- Full TypeScript support with `Identity`, `Credential`, `VerificationResult` types

#### HoleMail - Encrypted Messaging
- `HoleMailClient` class for end-to-end encrypted messaging
- `sendMessage()` - Send encrypted messages with anonymous routing
- `getInbox()` - Retrieve encrypted messages with pagination and filters
- `readMessage()` - Decrypt and read messages
- `deleteMessage()` - Delete messages
- `getMessageStatus()` - Track message delivery status
- Metadata hiding and anonymous routing
- Full TypeScript support with `Message`, `MessageStatus` types

#### HoleSwap - Private DEX
- `HoleSwapClient` class for private token swaps
- `getQuote()` - Get swap quotes with price impact and fees
- `executeSwap()` - Execute swaps with MEV protection
- `getSwapStatus()` - Track swap execution
- `getPoolInfo()` - Get liquidity pool information
- `getSupportedTokens()` - List supported tokens (SOL, USDC, USDT, RAY, SRM, ORCA)
- Zero-knowledge proofs for MEV protection
- Private routing through decentralized pools
- Full TypeScript support with `SwapQuote`, `SwapResult`, `PoolInfo` types

### Changed
- Updated package description to reflect full product suite
- Added new keywords: identity, messaging, dex, swap, encryption, mev-protection
- Expanded README with comprehensive documentation for all products
- Enhanced type exports for better developer experience

### Breaking Changes
- None - All existing BlackHole Mixer APIs remain unchanged

## [0.1.1] - 2025-11-23

### Changed
- Updated social media links to X (@zkholexyz)
- Updated GitHub organization references
- Enhanced documentation with GitHub Packages installation instructions
- Added comprehensive README sections

### Fixed
- GitHub Packages URL and visibility settings

## [0.1.0] - 2025-11-23

### Added
- Initial release
- `ZkHoleClient` for anonymous Solana transactions
- `sendAnonymous()` - Send anonymous transactions through BlackHole mixer
- `confirmTransaction()` - Confirm transaction status
- `getBalance()` - Check wallet balances
- `getTransactionHistory()` - Get transaction history
- Comprehensive error handling with typed errors
- Full TypeScript support
- Published to npm and GitHub Packages

[0.2.0]: https://github.com/zkHole/zkhole-sdk/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/zkHole/zkhole-sdk/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/zkHole/zkhole-sdk/releases/tag/v0.1.0
