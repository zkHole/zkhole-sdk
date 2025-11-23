import {
  ZkHoleError,
  ValidationError,
  InsufficientFundsError,
  NetworkError,
  TransactionError,
  WalletError,
} from "../src/errors";

describe("Error Classes", () => {
  describe("ZkHoleError", () => {
    it("should create error with message", () => {
      const error = new ZkHoleError("Test error");
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Test error");
      expect(error.name).toBe("ZkHoleError");
    });
  });

  describe("ValidationError", () => {
    it("should create validation error", () => {
      const error = new ValidationError("Invalid input");
      expect(error).toBeInstanceOf(ZkHoleError);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Invalid input");
      expect(error.name).toBe("ValidationError");
    });

    it("should be catchable as ZkHoleError", () => {
      try {
        throw new ValidationError("Test");
      } catch (error) {
        expect(error).toBeInstanceOf(ZkHoleError);
      }
    });
  });

  describe("InsufficientFundsError", () => {
    it("should create insufficient funds error", () => {
      const error = new InsufficientFundsError("Not enough SOL");
      expect(error).toBeInstanceOf(ZkHoleError);
      expect(error.message).toBe("Not enough SOL");
      expect(error.name).toBe("InsufficientFundsError");
    });
  });

  describe("NetworkError", () => {
    it("should create network error", () => {
      const error = new NetworkError("Connection failed");
      expect(error).toBeInstanceOf(ZkHoleError);
      expect(error.message).toBe("Connection failed");
      expect(error.name).toBe("NetworkError");
    });
  });

  describe("TransactionError", () => {
    it("should create transaction error", () => {
      const error = new TransactionError("Transaction failed");
      expect(error).toBeInstanceOf(ZkHoleError);
      expect(error.message).toBe("Transaction failed");
      expect(error.name).toBe("TransactionError");
    });
  });

  describe("WalletError", () => {
    it("should create wallet error", () => {
      const error = new WalletError("Wallet not connected");
      expect(error).toBeInstanceOf(ZkHoleError);
      expect(error.message).toBe("Wallet not connected");
      expect(error.name).toBe("WalletError");
    });
  });

  describe("Error Inheritance", () => {
    it("all custom errors should be instances of Error", () => {
      const errors = [
        new ZkHoleError("test"),
        new ValidationError("test"),
        new InsufficientFundsError("test"),
        new NetworkError("test"),
        new TransactionError("test"),
        new WalletError("test"),
      ];

      errors.forEach((error) => {
        expect(error).toBeInstanceOf(Error);
      });
    });

    it("all specific errors should be instances of ZkHoleError", () => {
      const errors = [
        new ValidationError("test"),
        new InsufficientFundsError("test"),
        new NetworkError("test"),
        new TransactionError("test"),
        new WalletError("test"),
      ];

      errors.forEach((error) => {
        expect(error).toBeInstanceOf(ZkHoleError);
      });
    });
  });
});
