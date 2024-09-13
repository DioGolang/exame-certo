import { BcryptPasswordHashImpl } from '../../infra/services/bcrypt-password-hash-impl';

export class PasswordUtils {
  private static passwordHasher = new BcryptPasswordHashImpl();

  static async determinePasswordHash(
    password?: string,
    encryptedPassword?: string,
  ): Promise<string> {
    if (password) {
      return this.passwordHasher.hash(password);
    }
    return encryptedPassword!;
  }
}
