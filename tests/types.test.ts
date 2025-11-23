import { Connection, Keypair } from "@solana/web3.js";
import type {
  WalletAdapter,
  ZkHoleConfig,
  TransactionParams,
  TransactionStatus,
  Transaction,
  Confirmation,
} from "../src/types";

describe("Type Definitions", () => {
  describe("WalletAdapter", () => {
    it("should accept valid wallet adapter", () => {
      const wallet: WalletAdapter = {
        publicKey: Keypair.generate().publicKey,
        signTransaction: async (tx) => tx,
      };

      expect(wallet.publicKey).toBeDefined();
      expect(wallet.signTransaction).toBeDefined();
    });

    it("should accept wallet with optional methods", () => {
      const wallet: WalletAdapter = {
        publicKey: Keypair.generate().publicKey,
      };

      expect(wallet.publicKey).toBeDefined();
      expect(wallet.signTransaction).toBeUndefined();
    });
  });

  describe("ZkHoleConfig", () => {
    it("should accept valid config", () => {
      const config: ZkHoleConfig = {
        connection: new Connection("https://api.devnet.solana.com"),
        wallet: {
          publicKey: Keypair.generate().publicKey,
        },
        network: "devnet",
      };

      expect(config.connection).toBeInstanceOf(Connection);
      expect(config.wallet).toBeDefined();
      expect(config.network).toBe("devnet");
    });

    it("should accept config with timeout", () => {
      const config: ZkHoleConfig = {
        connection: new Connection("https://api.devnet.solana.com"),
        wallet: {
          publicKey: Keypair.generate().publicKey,
        },
        network: "mainnet-beta",
        timeout: 60000,
      };

      expect(config.timeout).toBe(60000);
    });
  });

  describe("TransactionParams", () => {
    it("should accept valid transaction params", () => {
      const params: TransactionParams = {
        recipient: Keypair.generate().publicKey.toString(),
        amount: 1.5,
      };

      expect(params.recipient).toBeDefined();
      expect(params.amount).toBe(1.5);
    });

    it("should accept params with memo", () => {
      const params: TransactionParams = {
        recipient: Keypair.generate().publicKey.toString(),
        amount: 2.0,
        memo: "Test payment",
      };

      expect(params.memo).toBe("Test payment");
    });
  });

  describe("TransactionStatus", () => {
    it("should accept valid status values", () => {
      const statuses: TransactionStatus[] = ["pending", "confirmed", "failed"];

      statuses.forEach((status) => {
        expect(["pending", "confirmed", "failed"]).toContain(status);
      });
    });
  });

  describe("Transaction", () => {
    it("should accept valid transaction", () => {
      const tx: Transaction = {
        signature: "test_signature_123",
        status: "confirmed",
        timestamp: Date.now(),
      };

      expect(tx.signature).toBeDefined();
      expect(tx.status).toBe("confirmed");
      expect(tx.timestamp).toBeGreaterThan(0);
    });

    it("should accept transaction with optional fields", () => {
      const tx: Transaction = {
        signature: "test_signature_456",
        status: "pending",
        timestamp: Date.now(),
        amount: 1.5,
        recipient: Keypair.generate().publicKey.toString(),
      };

      expect(tx.amount).toBe(1.5);
      expect(tx.recipient).toBeDefined();
    });
  });

  describe("Confirmation", () => {
    it("should accept valid confirmation", () => {
      const confirmation: Confirmation = {
        signature: "test_signature_789",
        confirmed: true,
      };

      expect(confirmation.signature).toBeDefined();
      expect(confirmation.confirmed).toBe(true);
    });

    it("should accept confirmation with optional fields", () => {
      const confirmation: Confirmation = {
        signature: "test_signature_abc",
        confirmed: true,
        slot: 12345,
        blockTime: Date.now(),
        error: undefined,
      };

      expect(confirmation.slot).toBe(12345);
      expect(confirmation.blockTime).toBeDefined();
    });

    it("should accept confirmation with error", () => {
      const confirmation: Confirmation = {
        signature: "test_signature_def",
        confirmed: false,
        error: "Transaction failed",
      };

      expect(confirmation.confirmed).toBe(false);
      expect(confirmation.error).toBe("Transaction failed");
    });
  });
});
