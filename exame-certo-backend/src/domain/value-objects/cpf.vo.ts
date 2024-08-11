export class CPF {

  constructor(private readonly cpf: string) {
    if (!this.validateCPF(cpf)) {
      throw new Error("Invalid CPF");
    }
    this.cpf = cpf;
  }

  get value(): string{
   return this.cpf
  }

  private validateCPF(cpf: string): boolean {
    return true;
  }
}
