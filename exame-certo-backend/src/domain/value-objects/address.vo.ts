export class Address {
  street: string;
  num: string;
  complement?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;

  constructor(
    street: string,
    num: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    complement?: string,
  ) {

    this.street = street;
    this.num = num;
    this.complement = complement;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
  }



}
