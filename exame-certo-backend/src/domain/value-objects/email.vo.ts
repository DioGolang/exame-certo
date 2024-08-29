
export class Email{
  constructor(private readonly email: string) {
    if (!this.validateEmail(email)) {
      throw new Error("Invalid Email");
    }
  }

  get value(): string{
    return this.email
  }

  private validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}