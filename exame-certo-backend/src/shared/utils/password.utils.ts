import { PasswordHash } from "../../application/interfaces/hasher.interface";

export class PasswordUtils{

  private static _passwordHash: PasswordHash;

  public static configure(passwordHash: PasswordHash): void {
    this._passwordHash = passwordHash;
  }

  static async determinePasswordHash(password: string, encryptedPassword?: string): Promise<string> {
    if (encryptedPassword) {
      return encryptedPassword;
    }
    return await this._passwordHash.hash(password);
  }

}