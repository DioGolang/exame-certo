import { PatientProps } from "../interfaces/props/patient-props.interface";
import { v4 as uuidv4 } from 'uuid';
import { SocioEconomicInformation } from "../value-objects/socio-economic-information.vo";
import { Documentation } from "../value-objects/documentation.vo";
import { ContactInfo } from "../value-objects/contact-info.vo";
import { Address } from "../value-objects/address.vo";
import { MaritalStatus } from "../enums/marital-status.enum";
import { Sex } from "../enums/sex.enum";
import { Email } from "../value-objects/email.vo";
import { Patient } from "../entities/patient.entity";
import { Hasher } from "../interfaces/hasher.interface";
import { AddressDto } from "../../application/dtos/address.dto";
import { ContactInfoDto } from "../../application/dtos/contact-info.dto";
import { DocumentationDto } from "../../application/dtos/documentation.dto";
import { SocioEconomicInformationDto } from "../../application/dtos/socio-economic-information.dto";


export class PatientBuilder{

  private _id: string;
  private _passwordHash: string;
  private _props: Partial<PatientProps> = {};

  private constructor(private hasher: Hasher) {}


  public static async create(hasher: Hasher, password: string): Promise<PatientBuilder> {
    const builder = new PatientBuilder(hasher);
    builder._id = uuidv4();
    builder._passwordHash = await hasher.hash(password);
    return builder;
  }

  public static rehydrate(id: string, hasher: Hasher, password: string): PatientBuilder {
    const builder = new PatientBuilder(hasher);
    builder._id = id;
    builder._passwordHash = password;
    return builder;
  }

  public withName(name: string): PatientBuilder {
    this._props.name = name;
    return this;
  }


  public withLastName(lastName: string): PatientBuilder {
    this._props.lastName = lastName;
    return this;
  }

  public withEmail(email: string): PatientBuilder {
    this._props.email = Email.create(email);
    return this;
  }

  public withDateOfBirth(dateOfBirth: Date): PatientBuilder {
    this._props.dateOfBirth = dateOfBirth;
    return this;
  }

  public withSex(sex: Sex): PatientBuilder {
    this._props.sex = sex;
    return this;
  }

  public withMaritalStatus(maritalStatus: MaritalStatus): PatientBuilder {
    this._props.maritalStatus = maritalStatus;
    return this;
  }

  public withAddress(address: AddressDto): PatientBuilder {
    this._props.address = Address.fromDto(address);
    return this;
  }

  public withContactInfo(contactInfo: ContactInfoDto): PatientBuilder {
    this._props.contactInfo = ContactInfo.fromDto(contactInfo);
    return this;
  }

  public withDocumentation(documentation: DocumentationDto): PatientBuilder {
    this._props.documentation = Documentation.fromDto(documentation);
    return this;
  }

  public withSocioeconomicInformation(info: SocioEconomicInformationDto): PatientBuilder {
    this._props.socioeconomicInformation = SocioEconomicInformation.fromDto(info);
    return this;
  }

  public withHealthInsurance(healthInsurance: string): PatientBuilder {
    this._props.healthInsurance = healthInsurance;
    return this;
  }

  public build(): Patient {
    return new Patient(this._id, this._passwordHash, this._props as PatientProps);
  }
}
