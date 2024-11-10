import { AttendantProps } from '../interfaces/props/attendant-props.interface';
import { Scheduling } from './scheduling.entity';
import { PasswordHash } from '../../application/interfaces/hasher.interface';
import { ValidationUtils } from '../../shared/utils/validation.utils';
import { EntityUtils } from '../../shared/utils/entity.utils';
import { InvalidAttendantException } from '../exceptions/invalid-attendant.exception';
import { Address } from '../value-objects/address.vo';
import { ContactInfo } from '../value-objects/contact-info.vo';

export class Attendant {
  private readonly _id: string;
  private readonly _passwordHash: string;
  private readonly _props: Readonly<AttendantProps>;
  private readonly _scheduling: Scheduling[];

  constructor(id: string, props: AttendantProps, passwordHash: string) {
    this._id = id;
    this._props = { ...props };
    this._passwordHash = passwordHash;
    this.validate();
  }

  async validatePassword(
    rawPassword: string,
    passwordHash: PasswordHash,
  ): Promise<boolean> {
    return await passwordHash.compare(rawPassword, this._passwordHash);
  }

  private validate(): void {
    const errors: string[] = [];
    ValidationUtils.checkField(this._props.name, 'Name is required', errors);
    ValidationUtils.checkField(
      this._props.email.value,
      'Email is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.department,
      'Department is required',
      errors,
    );
  }

  addScheduling(scheduling: Scheduling): void {
    EntityUtils.addToCollection(this._scheduling, scheduling, (item) =>
      EntityUtils.checkDuplicate(
        item,
        this._scheduling,
        'Scheduling',
        InvalidAttendantException,
      ),
    );
  }

  removeScheduling(scheduling: Scheduling): void {
    EntityUtils.removeFromCollection(
      this._scheduling,
      scheduling,
      InvalidAttendantException,
      'Scheduling not found',
    );
  }

  get id(): string {
    return this._id;
  }

  get department(): string {
    return this._props.department;
  }

  get name(): string {
    return this._props.name;
  }

  get email(): string {
    return this._props.email.value;
  }

  get address(): Address {
    return this._props.address;
  }

  get contactInfo(): ContactInfo {
    return this._props.contactInfo;
  }

  get scheduling(): Scheduling[] {
    return [...this._scheduling];
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }
}
