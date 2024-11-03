export class ExamValues {
  parameter: string; // Name of the examined parameter
  value: number | string; // Numerical or descriptive value obtained
  unit?: string; // Unit of measurement, if applicable

  constructor(parameter: string, value: number | string, unit?: string) {
    this.parameter = parameter;
    this.value = value;
    this.unit = unit || '';
  }
}
