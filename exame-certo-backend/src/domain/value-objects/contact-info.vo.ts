
export class ContactInfo{
 private phone: string;
 private email: string;

  constructor(phone: string, email: string) {
    this.phone = phone;
    this.email = email;
  }

  get Phone(): string {
    return this.phone;
  }

  get Email(): string {
    return this.email;
  }
}
