export class CNS{
  private readonly cns;

  constructor(cns: string) {
    if(!this.validateCNS(cns)){
      throw new Error("Invalid CNS")
    }

    this.cns = cns;
  }

  get value(): string{
    return this.cns
  }



  validateCNS(cns: string): boolean{
    return true;
  }
}