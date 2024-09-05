import { PasswordHash } from "../interfaces/hasher.interface";

export class PasswordService{
  private hasher: PasswordHash;

  constructor(hasher: PasswordHash){
    this.hasher = hasher;
  }

  public async hashPassword(password: string): Promise<string>{
    return await this.hasher.hash(password);
  }

  public async comparePassword(password: string, hashedPassword: string): Promise<boolean>{
    return await this.hasher.compare(password, hashedPassword);
  }

}