import { Address } from '../../../domain/value-objects/address.vo';
import { AddressDto } from '../dtos/address.dto';
import { Address as AddressDocument } from '../../../infra/persistence/mongodb/schemas/address.schema';

export class AddressMapper {
  static toDto(address: Address): AddressDto {
    return {
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      zipCode: address.zipCode,
      city: address.city,
      state: address.state,
      country: address.country,
      complement: address?.complement,
    };
  }

  static toDocument(address: Address): AddressDocument {
    return {
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      zipCode: address.zipCode,
      city: address.city,
      state: address.state,
      country: address.country,
      complement: address?.complement,
    };
  }
}
