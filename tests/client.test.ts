import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import { ZkHoleClient } from "../src/client";
import {
  ValidationError,
  InsufficientFundsError,
  WalletError,
} from "../src/errors";

// Mock wallet for testing
class MockWallet {
  public publicKey: PublicKey;

  constructor(publicKey?: PublicKey) {
    this.publicKey = publicKey || Keypair.generate().publicKey;
  }

  async signTransaction(transaction: any) {
    // Mock signing - just return the transaction
    return transaction;
  }
}

describe("ZkHoleClient", () => {
  let connection: Connection;
  let wallet: MockWallet;
  let client: ZkHoleClient;

  beforeEach(() => {
    connection = new Connection("https://api.devnet.solana.com", "confirmed");
    wallet = new MockWallet();
    client = new ZkHoleClient({
      connection,
      wallet,
      network: "devnet",
    });
  });

  describe("Constructor", () => {
    it("should create client with valid config", () => {
      expect(client).toBeInstanceOf(ZkHoleClient);
      expect(client.getNetwork()).toBe("devnet");
    });

    it("should throw ValidationError with invalid network", () => {
      expect(() => {
        new ZkHoleClient({
          connection,
          wallet,
          network: "invalid" as any,
        });
      }).toThrow(ValidationError);
    });

    it("should throw ValidationError without connection", () => {
      expect(() => {
        new ZkHoleClient({
          connection: null as any,
          wallet,
          network: "devnet",
        });
      }).toThrow(ValidationError);
    });

    it("should throw ValidationError without wallet", () => {
      expect(() => {
        new ZkHoleClient({
          connection,
          wallet: null as any,
          network: "devnet",
        });
      }).toThrow(ValidationError);
    });
  });

  describe("sendAnonymous", () => {
    it("should throw ValidationError with invalid recipient", async () => {
      await expect(
        client.sendAnonymous({
          recipient: "invalid_address",
          amount: 1.0,
        })
      ).rejects.toThrow(ValidationError);
    });

    it("should throw ValidationError with zero amount", async () => {
      const recipient = Keypair.generate().publicKey.toString();
      await expect(
        client.sendAnonymous({
          recipient,
          amount: 0,
        })
      ).rejects.toThrow(ValidationError);
    });

    it("should throw ValidationError with negative amount", async () => {
      const recipient = Keypair.generate().publicKey.toString();
      await expect(
        client.sendAnonymous({
          recipient,
          amount: -1,
        })
      ).rejects.toThrow(ValidationError);
    });

    it("should throw ValidationError with empty recipient", async () => {
      await expect(
        client.sendAnonymous({
          recipient: "",
          amount: 1.0,
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe("getWalletAddress", () => {
    it("should return wallet address", () => {
      const address = client.getWalletAddress();
      expect(address).toBe(wallet.publicKey.toString());
      expect(PublicKey.isOnCurve(new PublicKey(address))).toBe(true);
    });
  });

  describe("getNetwork", () => {
    it("should return configured network", () => {
      expect(client.getNetwork()).toBe("devnet");
    });

    it("should return mainnet-beta for mainnet client", () => {
      const mainnetClient = new ZkHoleClient({
        connection,
        wallet,
        network: "mainnet-beta",
      });
      expect(mainnetClient.getNetwork()).toBe("mainnet-beta");
    });
  });

  describe("getBalance", () => {
    it("should throw ValidationError with invalid address", async () => {
      await expect(client.getBalance("invalid_address")).rejects.toThrow();
    });

    it("should return balance for valid address", async () => {
      const address = Keypair.generate().publicKey.toString();
      const balance = await client.getBalance(address);
      expect(typeof balance).toBe("number");
      expect(balance).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Wallet without signTransaction", () => {
    it("should throw WalletError when wallet cannot sign", async () => {
      const walletNoSign = {
        publicKey: Keypair.generate().publicKey,
      };

      const clientNoSign = new ZkHoleClient({
        connection,
        wallet: walletNoSign as any,
        network: "devnet",
      });

      const recipient = Keypair.generate().publicKey.toString();

      // Mock getBalance to return sufficient funds
      jest.spyOn(connection, "getBalance").mockResolvedValue(2000000000);

      await expect(
        clientNoSign.sendAnonymous({
          recipient,
          amount: 0.5,
        })
      ).rejects.toThrow(WalletError);
    });
  });
});
