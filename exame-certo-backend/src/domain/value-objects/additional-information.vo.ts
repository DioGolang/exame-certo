export class AdditionalInformation {
  age: number;
  weight: number;
  height: number;
  otherDetails?: string; // Additional information, if any

  constructor(age: number, weight: number, height: number, otherDetails?: string) {
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.otherDetails = otherDetails || '';
  }
}

