export class CID10 {
  readonly cod: string;
  readonly description: string;

  constructor(cod: string, description: string) {
    if (!/^[A-Z]\d{2}$/.test(cod)) {
      throw new Error('Código CID10 inválido. Deve seguir o padrão letra e dois dígitos.');
    }
    this.cod = cod;
    this.description = description;
  }

  toString() {
    return `${this.cod} - ${this.description}`;
  }



}
