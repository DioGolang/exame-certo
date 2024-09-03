import { Address } from "../../../../domain/value-objects/address.vo";
import { AddressDto } from "../../../../application/dtos/address.dto";

export class AddressMapper{

  static toDto(address: Address): AddressDto {
    return {
      street: address.street,
      num: address.num,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      complement: address.complement
    };
  }

}