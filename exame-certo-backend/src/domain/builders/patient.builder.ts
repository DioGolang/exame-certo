import { Sex } from "../enums/sex.enum";
import { MaritalStatus } from "../enums/marital-status.enum";
import { AddressDto } from "../../application/dtos/address.dto";
import { ContactInfoDto } from "../../application/dtos/contact-info.dto";
import { SocioEconomicInformationDto } from "../../application/dtos/socio-economic-information.dto";
import { DocumentationDto } from "../../application/dtos/documentation.dto";
import { IHasher } from "../interfaces/hasher.interface";
import { Patient } from "../entites/patient.entity";
import { Address } from "../value-objects/address.vo";
import { ContactInfo } from "../value-objects/contact-info.vo";
import { SocioEconomicInformation } from "../value-objects/socio-economic-information.vo";
import { Documentation } from "../value-objects/documentation.vo";


export class PatientBuilder {
  private _id: string | null = null;
  private _name: string;
  private _lastName: string;
  private _email: string;
  private _password: string;
  private _dateOfBirth: Date;
  private _sex: Sex;
  private _maritalStatus: MaritalStatus;
  private _address: Address;
  private _contactInfo: ContactInfo;
  private _socioeconomicInformation: SocioEconomicInformation;
  private _documentation: Documentation;
  private _hashPassword: IHasher;
  private _healthInsurance?: string;

  withId(id: string): this {
    this._id = id;
    return this;
  }

  withName(name: string): this {
    this._name = name;
    return this;
  }

  withLastName(lastName: string): this {
    this._lastName = lastName;
    return this;
  }

  withEmail(email: string): this {
    this._email = email;
    return this;
  }

  withPassword(password: string): this {
    this._password = password;
    return this;
  }

  withDateOfBirth(dateOfBirth: Date): this {
    this._dateOfBirth = dateOfBirth;
    return this;
  }

  withSex(sex: Sex): this {
    this._sex = sex;
    return this;
  }

  withMaritalStatus(maritalStatus: MaritalStatus): this {
    this._maritalStatus = maritalStatus;
    return this;
  }

  withAddress(addressDto: AddressDto): this {
    this._address = Address.fromDto(addressDto);
    return this;
  }

  withContactInfo(contactInfoDto: ContactInfoDto): this {
    this._contactInfo = ContactInfo.fromDto(contactInfoDto);
    return this;
  }

  withSocioeconomicInformation(socioeconomicInformationDto: SocioEconomicInformationDto): this {
    this._socioeconomicInformation = SocioEconomicInformation.fromDto(socioeconomicInformationDto);
    return this;
  }

  withDocumentation(documentationDto: DocumentationDto): this {
    this._documentation = Documentation.fromDto(documentationDto);
    return this;
  }

  withHasher(hashPassword: IHasher): this {
    this._hashPassword = hashPassword;
    return this;
  }

  withHealthInsurance(healthInsurance: string): this {
    this._healthInsurance = healthInsurance;
    return this;
  }

  build(): Patient {
    return new Patient(
      this._id,
      this._name,
      this._lastName,
      this._email,
      this._password,
      this._dateOfBirth,
      this._sex,
      this._maritalStatus,
      this._address,
      this._contactInfo,
      this._socioeconomicInformation,
      this._documentation,
      this._hashPassword,
      this._healthInsurance
    );
  }
}