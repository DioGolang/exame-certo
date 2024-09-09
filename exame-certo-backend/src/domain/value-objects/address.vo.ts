import { AddressDto } from '../../application/dtos/address.dto';

export class Address {
  readonly street: string;
  readonly num: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly country: string;
  readonly complement?: string;

  constructor(
    street: string,
    num: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    complement?: string,
  ) {
    if (!street || !num || !city || !state || !postalCode || !country) {
      throw new Error('Address fields are required');
    }

    this.street = street;
    this.num = num;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
    this.complement = complement;
  }

  static fromDto(addressDto: AddressDto): Address {
    return new Address(
      addressDto.street,
      addressDto.num,
      addressDto.city,
      addressDto.state,
      addressDto.postalCode,
      addressDto.country,
      addressDto.complement,
    );
  }
}
