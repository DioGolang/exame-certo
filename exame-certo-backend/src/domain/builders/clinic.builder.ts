import { Address } from "../value-objects/address.vo";
import { ContactInfo } from "../value-objects/contact-info.vo";
import { ContactInfoDto } from "../../application/dtos/contact-info.dto";
import { Clinic } from "../entites/clinic.entity";
import { ClinicProps } from "../interfaces/props/clinic-props.interface";
import { v4 as uuidv4 } from 'uuid';
import { Email } from "../value-objects/email.vo";

export class ClinicBuilder{

  private _id: string;
  private _props: Partial<ClinicProps> = {};

  private constructor() { }

  public static create(): ClinicBuilder {
    const builder = new ClinicBuilder();
    builder._id = uuidv4();
    return builder;
  }

  public static rehydrate(id: string): ClinicBuilder {
    const builder = new ClinicBuilder();
    builder._id = id;
    return builder
  }


  withName(name: string): ClinicBuilder {
    this._props.name = name;
    return this;
  }

  withEmail(email: Email): ClinicBuilder {
    this._props.email = email;
    return this;
  }


  withAddress(address: Address): ClinicBuilder {
    this._props.address = address;
    return this;
  }

  withContactInfo(contactInfoDto: ContactInfoDto): ClinicBuilder {
    this._props.contactInfo = ContactInfo.fromDto(contactInfoDto);
    return this;
  }

  async build(): Promise<Clinic> {

    return new Clinic(this._id, this._props as ClinicProps);

  }
}