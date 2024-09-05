import { ContactInfo } from "../value-objects/contact-info.vo";
import { Address } from "../value-objects/address.vo";
import { ContactInfoDto } from "../../application/dtos/contact-info.dto";
import { Doctor } from "../entities/doctor.entity";
import { DoctorProps } from "../interfaces/props/doctor-props.interface";
import { v4 as uuidv4 } from 'uuid';
import { Email } from "../value-objects/email.vo";
import { PasswordHash } from "../../application/interfaces/hasher.interface";

export class DoctorBuilder{
  private _id: string;
  private _passwordHash: string;
  private _props: Partial<DoctorProps>;

  private constructor(private hasher: PasswordHash) { }

  public static async create(hasher: PasswordHash, password: string): Promise<DoctorBuilder>{
    const builder = new DoctorBuilder(hasher);
    builder._id = uuidv4();
    builder._passwordHash = await hasher.hash(password);
    return builder;
  }

  public static rehydrate(id: string, hasher: PasswordHash, password: string): DoctorBuilder{
    const builder = new DoctorBuilder(hasher);
    builder._id = id;
    builder._passwordHash = password;
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