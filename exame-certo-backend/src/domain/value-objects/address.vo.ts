import { AddressDto } from '../../application/dtos/address.dto';

export class Address {
  readonly street: string;
  readonly number: string;
  readonly city: string;
  readonly state: string;
  readonly zipCode: string;
  readonly country: string;
  readonly complement?: string;

  constructor(
    street: string,
    num: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    complement?: string,
  ) {
    if (!street || !num || !city || !state || !zipCode || !country) {
      throw new Error('Address fields are required');
    }

    this.street = street;
    this.number = num;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
    this.complement = complement;
  }

  static fromDto(addressDto: AddressDto): Address {
    return new Address(
      addressDto.street,
      addressDto.number,
      addressDto.city,
      addressDto.state,
      addressDto.zipCode,
      addressDto.country,
      addressDto.complement,
    );
  }
}
