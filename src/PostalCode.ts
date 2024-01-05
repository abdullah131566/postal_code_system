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
  protected abstract validate(): boolean;
}

export class BritishPostalCode extends PostalCode {
  constructor(postalCode: string) {
    super(postalCode.toUpperCase());
    this.validate();
  }
  validate(): boolean {
    if (/^[A-Z]{1,2}[0-9]{1,2} [0-9][A-Z]{2}$/.test(this.getCode()))
      return true;
    else
      throw new PostalCodeException(
        `Postal Code ${this.getCode()} is not a valid British Postal Code`
      );
  }
}

export class GermanPostalCode extends PostalCode {
  constructor(postalCode: string) {
    super(postalCode.toUpperCase());
    this.validate();
  }
  validate(): boolean {
    if (/^[0-9]{5}$/.test(this.getCode())) return true;
    else
      throw new PostalCodeException(
        `Postal Code ${this.getCode()} is not a valid German Postal Code`
      );
  }
}

export class USZipCode extends PostalCode {
  constructor(postalCode: string) {
    super(postalCode.toUpperCase());
    this.validate();
  }
  validate(): boolean {
    if (/^[0-9]{5}(-[0-9]{4})?$/.test(this.getCode())) return true;
    else
      throw new PostalCodeException(
        `Postal Code ${this.getCode()} is not a valid US Postal Code`
      );
  }
}

export class PostalCodeException extends Error {
  constructor(message: string) {
    super(message);
  }
}
