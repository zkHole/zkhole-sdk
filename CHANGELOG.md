# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-23

### Added

- Initial release of zkHole SDK
- `ZkHoleClient` class for interacting with zkHole protocol
- Support for anonymous Solana transactions
- Methods: `sendAnonymous()`, `confirmTransaction()`, `getBalance()`, `getTransactionHistory()`
- Comprehensive type definitions for TypeScript
- Custom error classes: `ValidationError`, `InsufficientFundsError`, `NetworkError`, `TransactionError`, `WalletError`
- Full test suite with 35+ tests
- Simulation script for testing SDK functionality
- Support for mainnet-beta, devnet, and testnet networks
- Complete API documentation

### Features

- Anonymous transaction sending with zero-knowledge proofs
- Wallet adapter compatibility
- Transaction confirmation tracking
- Balance checking
- Transaction history retrieval
- TypeScript support with full type definitions
- Error handling with typed exceptions

### Documentation

- README with installation and usage examples
- API reference documentation
- Quick start guide
- Type definitions for all interfaces

[0.1.0]: https://github.com/zkHole/zkhole-sdk/releases/tag/v0.1.0
