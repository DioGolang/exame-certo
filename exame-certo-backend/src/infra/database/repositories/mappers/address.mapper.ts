import { Address } from '../../../../domain/value-objects/address.vo';
import { AddressDto } from '../../../../application/dtos/address.dto';

export class AddressMapper {
  static toDto(address: Address): AddressDto {
    return {
      street: address.street,
      number: address.number,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      complement: address.complement,
    };
  }
  toDto(address: Address): AddressDto {
    return {
      street: address.street,
      number: address.number,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      complement: address.complement,
    };
  }
}
