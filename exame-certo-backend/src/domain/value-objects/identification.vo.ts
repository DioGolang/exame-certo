import { Address } from "./address.vo";

export class Identification {
  name: string;
  dateOfBirth: Date;
  sex: string;
  maritalStatus: string;
  address: Address;
  phone: string;
  email: string;

  constructor(
    name: string,
    dateOfBirth: Date,
    sex: string,
    maritalStatus: string,
    address: Address,
    phone: string,
    email: string
  ) {
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.sex = sex;
    this.maritalStatus = maritalStatus;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }
}
