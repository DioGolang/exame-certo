

export class ReferenceValues {
  parameter: string; // Parameter name
  lowerLimit: number; // Lower limit of reference value
  upperLimit: number; // Upper limit of reference value
  unit?: string; // Unit of measurement, if applicable

  constructor(parameter: string, lowerLimit: number, upperLimit: number, unit?: string) {
    this.parameter = parameter;
    this.lowerLimit = lowerLimit;
    this.upperLimit = upperLimit;
    this.unit = unit || '';
  }

  isValueWithinRange(value: number): boolean {
    return value >= this.lowerLimit && value <= this.upperLimit;
  }
}
