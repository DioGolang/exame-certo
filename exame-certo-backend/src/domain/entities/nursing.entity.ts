import { NursingProps } from '../interfaces/props/nursing-props.interface';
import { Clinic } from './clinic.entity';
import { Anamnesis } from './anamnesis.entity';
import { Screening } from './screening.entity';
import { ValidationUtils } from '../../shared/utils/validation.utils';
import { InvalidNursingException } from '../exceptions/invalid-nursing.exception';
import { EntityUtils } from '../../shared/utils/entity.utils';
import { InvalidDoctorException } from '../exceptions/invalid-doctor.exception';
import { ContactInfo } from '../value-objects/contact-info.vo';
import { Address } from '../value-objects/address.vo';
import { NursingLevel } from '../enums/nursing-level.enum';

export class Nursing {
  private readonly _id: string;
  private readonly _passwordHash: string;
  private _props: Readonly<NursingProps>;
  private _clinics: Clinic[] = [];
  private _anamnesis: Anamnesis[] = [];
  private _screening: Screening[] = [];

  constructor(id: string, props: NursingProps, passwordHash: string) {
    this._id = id;
    this._props = props;
    this._passwordHash = passwordHash;
    this.validate();
  }

  private validate(): void {
    const errors: string[] = [];
    ValidationUtils.checkField(this._props.name, 'Name is required', errors);
    ValidationUtils.checkPassword(this._passwordHash, errors);

    if (errors.length > 0) {
      throw new InvalidNursingException(errors.join('; '));
    }
  }

  public addClinic(clinic: Clinic): void {
    EntityUtils.addToCollection(this._clinics, clinic, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._clinics,
        'Clinic',
        InvalidDoctorException,
      ),
    );
  }

  public addAnamnesis(anamnesis: Anamnesis): void {
    EntityUtils.addToCollection(this._anamnesis, anamnesis, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._anamnesis,
        'Anamnesis',
        InvalidDoctorException,
      ),
    );
  }

  public addScreening(screening: Screening): void {
    EntityUtils.addToCollection(this._screening, screening, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._screening,
        'Screening',
        InvalidDoctorException,
      ),
    );
  }
  public removeClinic(clinic: Clinic): void {
    EntityUtils.removeFromCollection(
      this._clinics,
      clinic,
      InvalidDoctorException,
      'Clinic not found',
    );
  }

  public removeAnamnesis(anamnesis: Anamnesis): void {
    EntityUtils.removeFromCollection(
      this._anamnesis,
      anamnesis,
      InvalidDoctorException,
      'Anamnesis not found',
    );
  }
  public removeScreening(screening: Screening): void {
    EntityUtils.removeFromCollection(
      this._screening,
      screening,
      InvalidDoctorException,
      'Screening not found',
    );
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._props.name;
  }

  get nursingLevel(): NursingLevel {
    return this._props.nursingLevel;
  }

  get COREN(): string {
    return this._props.COREN;
  }

  get email(): string {
    return this._props.email.value;
  }

  get contactInfo(): ContactInfo {
    return this._props.contactInfo;
  }

  get address(): Address {
    return this._props.address;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get anamnesis(): Anamnesis[] {
    return [...this._anamnesis];
  }
  get clinics(): Clinic[] {
    return [...this._clinics];
  }
  get screening(): Screening[] {
    return [...this._screening];
  }
}
