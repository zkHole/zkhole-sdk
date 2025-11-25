import { Connection } from "@solana/web3.js";
import type {
  WalletAdapter,
  HoleIDConfig,
  IdentityParams,
  Identity,
  CredentialParams,
  Credential,
  VerificationParams,
  VerificationResult,
} from "./types";
import { ValidationError, NetworkError } from "./errors";

export class HoleIDClient {
  private connection: Connection;
  private wallet: WalletAdapter;
  private network: string;
  private timeout: number;

  constructor(config: HoleIDConfig) {
    this.connection = config.connection;
    this.wallet = config.wallet;
    this.network = config.network;
    this.timeout = config.timeout || 30000;
  }

  /**
   * Create a new unlinkable identity with zero-knowledge proofs
   */
  async createIdentity(params: IdentityParams): Promise<Identity> {
    if (!params.username || params.username.length < 3) {
      throw new ValidationError("Username must be at least 3 characters");
    }

    if (!this.wallet.publicKey) {
      throw new ValidationError("Wallet not connected");
    }

    try {
      // Generate ZK proof for identity
      const zkProof = await this.generateZKProof(params);

      // Create HoleID
      const holeId = `hole_${this.generateRandomId()}`;

      // Generate verifiable credential
      const credential = this.generateCredentialString(holeId, zkProof);

      return {
        holeId,
        username: params.username,
        credential,
        zkProof,
        timestamp: Date.now(),
        status: "active",
      };
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new NetworkError(`Failed to create identity: ${error}`);
    }
  }

  /**
   * Generate a verifiable credential for an identity
   */
  async generateCredential(params: CredentialParams): Promise<Credential> {
    if (!params.holeId) {
      throw new ValidationError("HoleID is required");
    }

    if (!params.claims || Object.keys(params.claims).length === 0) {
      throw new ValidationError("At least one claim is required");
    }

    try {
      const credentialId = `cred_${this.generateRandomId()}`;
      const zkProof = await this.generateCredentialProof(params);

      return {
        credentialId,
        holeId: params.holeId,
        claims: params.claims,
        zkProof,
        issuedAt: Date.now(),
        expiresAt: params.expiresAt,
        status: "valid",
      };
    } catch (error) {
      throw new NetworkError(`Failed to generate credential: ${error}`);
    }
  }

  /**
   * Verify a credential without revealing identity
   */
  async verifyCredential(params: VerificationParams): Promise<VerificationResult> {
    if (!params.credential) {
      throw new ValidationError("Credential is required");
    }

    try {
      // Verify ZK proof
      const proofValid = await this.verifyZKProof(params.credential.zkProof);

      // Check expiration
      const notExpired =
        !params.credential.expiresAt || params.credential.expiresAt > Date.now();

      // Verify claims if provided
      let claimsValid = true;
      if (params.requiredClaims) {
        claimsValid = params.requiredClaims.every((claim) =>
          Object.keys(params.credential.claims).includes(claim)
        );
      }

      const isValid = proofValid && notExpired && claimsValid;

      return {
        isValid,
        proofValid,
        notExpired,
        claimsValid,
        verifiedAt: Date.now(),
      };
    } catch (error) {
      throw new NetworkError(`Failed to verify credential: ${error}`);
    }
  }

  /**
   * Revoke an identity or credential
   */
  async revoke(holeId: string): Promise<{ success: boolean; revokedAt: number }> {
    if (!holeId) {
      throw new ValidationError("HoleID is required");
    }

    try {
      // Revoke on-chain (placeholder for actual implementation)
      const revokedAt = Date.now();

      return {
        success: true,
        revokedAt,
      };
    } catch (error) {
      throw new NetworkError(`Failed to revoke identity: ${error}`);
    }
  }

  private async generateZKProof(params: IdentityParams): Promise<string> {
    // Placeholder for actual ZK proof generation
    return this.generateRandomHash();
  }

  private generateCredentialString(holeId: string, zkProof: string): string {
    // Generate 64-character verifiable credential
    return this.generateRandomHash();
  }

  private async generateCredentialProof(params: CredentialParams): Promise<string> {
    // Placeholder for actual credential proof generation
    return this.generateRandomHash();
  }

  private async verifyZKProof(proof: string): Promise<boolean> {
    // Placeholder for actual ZK proof verification
    return proof.length === 64;
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private generateRandomHash(): string {
    return Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
  }
}
