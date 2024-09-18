export class Signature {
  doctorName: string;
  registrationNumber: string;
  signatureData: string; // It can be a digital signature or a textual representation

  constructor(
    doctorName: string,
    registrationNumber: string,
    signatureData: string,
  ) {
    this.doctorName = doctorName;
    this.registrationNumber = registrationNumber;
    this.signatureData = signatureData;
  }
}
