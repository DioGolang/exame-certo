import { Hasher } from "../../domain/interfaces/hasher.interface";

export class PasswordService{
  private hasher: Hasher;

  constructor(hasher: Hasher){
    this.hasher = hasher;
  }

  public async hashPassword(password: string): Promise<string>{
    return await this.hasher.hash(password);
  }

  public async comparePassword(password: string, hashedPassword: string): Promise<boolean>{
    return await this.hasher.compare(password, hashedPassword);
  }

}