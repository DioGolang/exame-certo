import { Address } from '../value-objects/address.vo';
import { ContactInfo } from '../value-objects/contact-info.vo';
import { PasswordUtils } from '../../shared/utils/password.utils';
import { ContactInfoDto } from '../../application/shared/dtos/contact-info.dto';
import { AddressDto } from '../../application/shared/dtos/address.dto';
import { Email } from '../value-objects/email.vo';
import { BaseEntityProps } from '../interfaces/props/base-entity-props.interface';

export abstract class BaseEntityBuilder<TProps extends BaseEntityProps> {
  protected readonly _id: string;
  protected readonly _password?: string;
  protected readonly encryptedPassword?: string;
  protected _props: Partial<TProps & BaseEntityProps> = {};

  protected constructor(
    id: string,
    encryptedPassword?: string,
    password?: string,
  ) {
    this._id = id;
    this.encryptedPassword = encryptedPassword;
    this._password = password;
  }

  protected withCreatedAt(createdAt: Date): this {
    this._props.createdAt = createdAt;
    return this;
  }

  protected withUpdatedAt(updatedAt: Date): this {
    this._props.updatedAt = updatedAt;
    return this;
  }

  protected withEmail(email: string): this {
    (this._props as any).email = Email.create(email);
    return this;
  }

  protected withContactInfo(contactInfo: ContactInfoDto): this {
    (this._props as any).contactInfo = ContactInfo.fromDto(contactInfo);
    return this;
  }

  protected withAddress(address: AddressDto): this {
    (this._props as any).address = Address.fromDto(address);
    return this;
  }

  protected async getFinalPasswordHash(): Promise<string> {
    return PasswordUtils.determinePasswordHash(
      this._password,
      this.encryptedPassword,
    );
  }

  protected abstract validateRequiredProperties(): void;
  protected abstract build(): Promise<any>;
}
