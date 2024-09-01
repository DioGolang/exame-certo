import { PatientProps } from "../interfaces/patient-props.interface";
import { v4 as uuidv4 } from 'uuid';
import { SocioEconomicInformation } from "../value-objects/socio-economic-information.vo";
import { Documentation } from "../value-objects/documentation.vo";
import { ContactInfo } from "../value-objects/contact-info.vo";
import { Address } from "../value-objects/address.vo";
import { MaritalStatus } from "../enums/marital-status.enum";
import { Sex } from "../enums/sex.enum";
import { Email } from "../value-objects/email.vo";

export class PatientBuilder{
  private _id: string;
  private _props: Partial<PatientProps> = {};

  private constructor() {}

  public static createNew(): PatientBuilder {
    const builder = new PatientBuilder();
    builder._id = uuidv4();
    return builder;
  }

  public static rehydrate(id: string): PatientBuilder {
    const builder = new PatientBuilder();
    builder._id = id;
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

  public withEmail(email: Email): PatientBuilder {
    this._props.email = email;
    return this;
  }

  public withPasswordHash(passwordHash: string): PatientBuilder {
    this._props.passwordHash = passwordHash;
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

  public withAddress(address: Address): PatientBuilder {
    this._props.address = address;
    return this;
  }

  public withContactInfo(contactInfo: ContactInfo): PatientBuilder {
    this._props.contactInfo = contactInfo;
    return this;
  }

  public withDocumentation(documentation: Documentation): PatientBuilder {
    this._props.documentation = documentation;
    return this;
  }

  public withSocioeconomicInformation(info: SocioEconomicInformation): PatientBuilder {
    this._props.socioeconomicInformation = info;
    return this;
  }

  public withHealthInsurance(healthInsurance: string): PatientBuilder {
    this._props.healthInsurance = healthInsurance;
    return this;
  }

}