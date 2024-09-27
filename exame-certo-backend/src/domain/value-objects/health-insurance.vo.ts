export class HealthInsurance {
  private readonly _name: string;
  private readonly _number: string;
  private readonly _validity: Date;

  constructor(name: string, number: string, validity: Date) {
    this._name = name;
    this._number = number;
    this._validity = validity;
  }
}
