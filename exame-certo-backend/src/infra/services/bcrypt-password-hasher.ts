import { Hasher } from "../../domain/interfaces/hasher.interface";
import bcrypt from "bcrypt";

export class BcryptPasswordHasher implements Hasher {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
