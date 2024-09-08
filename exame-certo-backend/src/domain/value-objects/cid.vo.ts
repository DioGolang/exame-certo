export class CID10 {
  readonly cod: string;
  readonly description: string;

  constructor(cod: string, description: string) {
    if (!/^[A-Z]\d{2}$/.test(cod)) {
      throw new Error(
        'Invalid CID10 code. It must follow the letter and two-digit pattern.',
      );
    }
    this.cod = cod;
    this.description = description;
  }

  toString() {
    return `${this.cod} - ${this.description}`;
  }
}
