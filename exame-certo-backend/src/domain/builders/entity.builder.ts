import { Address } from '../value-objects/address.vo';
import { ContactInfo } from '../value-objects/contact-info.vo';
import { PasswordUtils } from '../../shared/utils/password.utils';
import { ContactInfoDto } from '../../application/shared/dtos/contact-info.dto';
import { AddressDto } from '../../application/shared/dtos/address.dto';
import { Email } from '../value-objects/email.vo';
import { BaseEntityProps } from '../interfaces/props/base-entity-props.interface';

export abstract class BaseEntityBuilder<
  Entity,
  TProps extends BaseEntityProps,
> {
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

  public withCreatedAt(createdAt: Date): this {
    this._props.createdAt = createdAt;
    return this;
  }

  public withUpdatedAt(updatedAt: Date): this {
    this._props.updatedAt = updatedAt;
    return this;
  }

  public withEmail(email: string): this {
    this._props.email = Email.create(email);
    return this;
  }

  public withContactInfo(contactInfo: ContactInfoDto): this {
    this._props.contactInfo = ContactInfo.fromDto(contactInfo);
    return this;
  }

  public withAddress(address: AddressDto): this {
    this._props.address = Address.fromDto(address);
    return this;
  }

  protected async getFinalPasswordHash(): Promise<string> {
    return PasswordUtils.determinePasswordHash(
      this._password,
      this.encryptedPassword,
    );
  }

  protected abstract validateRequiredProperties(): void;
  protected abstract build(): Promise<Entity>;
}
