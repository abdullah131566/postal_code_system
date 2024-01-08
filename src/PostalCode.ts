import fs from "fs";
import readline from "readline";

export class PostalCodeRepository {
  static codesFilePath: string;
  static destinationsFilePath: string;
  static async getCode(code: string) {
    if (!this.codesFilePath)
      throw new Error("Codes file path not specified for repository!");
    const fileStream = fs.createReadStream(PostalCodeRepository.codesFilePath, {
      encoding: "utf-8",
    });
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    for await (const line of rl) if (code === line) return true;
    return false;
  }
  static async getDestination(destinatinPrefix: string) {
    if (!this.destinationsFilePath)
      throw new Error("Destinations file path not specified for repository!");
    const fileStream = fs.createReadStream(
      PostalCodeRepository.destinationsFilePath,
      {
        encoding: "utf-8",
      }
    );
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    for await (const line of rl) {
      const [prefix, destination] = line.split(" ");
      if (prefix === destinatinPrefix) return destination;
    }
    return false;
  }
}

export default abstract class PostalCode {
  private postalCode: string;
  private destination!: string; // Excalamtion Mark '!' indicates in ts that the variable will have value at runtime
  constructor(postalCode: string) {
    this.postalCode = postalCode;
  }
  toString(): string {
    return this.getCode();
  }
  getCode() {
    return this.postalCode;
  }
  getDestination() {
    return this.destination;
  }
  setDestination(destination: string) {
    this.destination = destination;
  }
  async isOnRecord() {
    if (await PostalCodeRepository.getCode(this.postalCode)) return true;
    return false;
  }
  length() {
    return this.postalCode.length;
  }
  protected abstract validate(): boolean;
}

export class BritishPostalCode extends PostalCode {
  constructor(postalCode: string) {
    super(postalCode.toUpperCase());
    this.validate();
  }
  async setDestination() {
    const destinationPrefix = this.getCode().slice(0, 2);
    PostalCodeRepository.destinationsFilePath =
      "src/british-postal-destinations.txt";
    const destination = await PostalCodeRepository.getDestination(
      destinationPrefix
    );
    if (!destination)
      throw new PostalCodeException(
        `Postal Code ${this.getCode()} is not a valid British Postal Code`
      );
    super.setDestination(destination);
    PostalCodeRepository.destinationsFilePath = "";
  }
  validate(): boolean {
    if (/^[A-Z]{1,2}[0-9][A-Z] [0-9][A-Z]{2}$/.test(this.getCode()))
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
