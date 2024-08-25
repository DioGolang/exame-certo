export class RG{
  private readonly rg;
  constructor(rg:string) {
    if (!this.validateRG(rg)){
      throw new Error("invalid RG")
    }
    this.rg = rg;
  }

  get value():string{
    return this.rg
  }

  private validateRG(rg: string){
    return true;
  }

}