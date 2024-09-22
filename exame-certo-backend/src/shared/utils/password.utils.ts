import { BcryptPasswordHashImpl } from '../../infra/security/encryption/bcrypt-password-hash-impl';

export class PasswordUtils {
  private static passwordHasher = new BcryptPasswordHashImpl();

  static async determinePasswordHash(
    password?: string,
    encryptedPassword?: string,
  ): Promise<string> {
    if (!password && !encryptedPassword) {
      throw new Error('Either password or encryptedPassword must be provided.');
    }

    return password ? this.passwordHasher.hash(password) : encryptedPassword!;
  }
}
