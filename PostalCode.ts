export default abstract class PostalCode {
  private postalCode: string;
  constructor(postalCode: string) {
    this.postalCode = postalCode;
  }
  toString(): string {
    return this.getCode();
  }
  getCode() {
    return this.postalCode;
  }
  abstract validate(): boolean;
}

export class BritishPostalCode extends PostalCode {
  validate(): boolean {
    return /^[A-Z]{1,2}[0-9]{1,2} [0-9][A-Z]{2}$/.test(this.getCode());
  }
}

export class GermanPostalCode extends PostalCode {
  validate(): boolean {
    return /^[0-9]{5}$/.test(this.getCode());
  }
}

