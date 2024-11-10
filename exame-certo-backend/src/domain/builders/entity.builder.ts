import { Address } from '../value-objects/address.vo';
import { ContactInfo } from '../value-objects/contact-info.vo';
import { ContactInfoDto } from '../../application/shared/dtos/contact-info.dto';
import { AddressDto } from '../../application/shared/dtos/address.dto';
import { Email } from '../value-objects/email.vo';
import { BaseEntityProps } from '../interfaces/props/base-entity-props.interface';

export abstract class BaseEntityBuilder<
  Entity,
  TProps extends BaseEntityProps,
> {
  protected _id: string;
  protected _passwordHash: string;
  protected _props: Partial<TProps & BaseEntityProps> = {};

  withId(id: string): this {
    this._id = id;
    return this;
  }

  withName(name: string): this {
    this._props.name = name;
    return this;
  }

  withPasswordHash(passwordHash: string): this {
    this._passwordHash = passwordHash;
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

  public withCreatedAt(createdAt: Date): this {
    this._props.createdAt = createdAt;
    return this;
  }

  public withUpdatedAt(updatedAt: Date): this {
    this._props.updatedAt = updatedAt;
    return this;
  }

  protected abstract validateRequiredProperties(): void;
  protected abstract addRelationshipsToEntities(entity: Entity): void;
  protected abstract build(): Promise<Entity>;
}
