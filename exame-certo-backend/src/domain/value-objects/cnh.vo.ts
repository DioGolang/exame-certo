
export class CNH{
  private readonly cnh

  constructor(cnh: string) {
    if(!this.validateCNH(cnh)){
      throw new Error("Invalid cnh")
    }
    this.cnh = cnh
  }

  get value():string{
    return this.cnh
  }


  private validateCNH(cnh: string): boolean {
    return true
  }

}