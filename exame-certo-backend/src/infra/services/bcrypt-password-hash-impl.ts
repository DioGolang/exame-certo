import { PasswordHash } from "../../application/interfaces/hasher.interface";
import bcrypt from "bcrypt";

export class BcryptPasswordHashImpl implements PasswordHash {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
