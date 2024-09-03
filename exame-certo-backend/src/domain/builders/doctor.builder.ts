import { ContactInfo } from "../value-objects/contact-info.vo";
import { Address } from "../value-objects/address.vo";
import { ContactInfoDto } from "../../application/dtos/contact-info.dto";
import { Doctor } from "../entities/doctor.entity";
import { DoctorProps } from "../interfaces/props/doctor-props.interface";
import { v4 as uuidv4 } from 'uuid';
import { Email } from "../value-objects/email.vo";

export class DoctorBuilder{
  private _id: string;
  private _props: Partial<DoctorProps>;

  private constructor() { }

  public static createNew(): DoctorBuilder{
    const builder = new DoctorBuilder();
    builder._id = uuidv4();
    return builder;
  }

  public static rehydrate(id: string): DoctorBuilder{
    const builder = new DoctorBuilder();
    builder._id = id;
    return builder;
  }

  withEmail(email: Email): DoctorBuilder {
    this._props.email = email;
    return this
  }

  withContactInfo(contactInfo: ContactInfoDto): DoctorBuilder {
    this._props.contactInfo = ContactInfo.fromDto(contactInfo)
    return this
  }

  withProfessionalAddress(professionalAddress: Address): DoctorBuilder {
    this._props.professionalAddress = Address.fromDto(professionalAddress)
    return this
  }

  withRegistrationNumber(registrationNumber: string): DoctorBuilder {
    this._props.registrationNumber = registrationNumber
    return this
  }

  withSpecialization(specialization: string): DoctorBuilder {
    this._props.specialization = specialization
    return this
  }

   async build(): Promise<Doctor> {
    return new Doctor(this._id, this._props as DoctorProps);
  }

}