import PostalCode, {
  BritishPostalCode,
  GermanPostalCode,
  PostalCodeException,
  USZipCode,
} from "./PostalCode";

class PostalTest {
  static postalCode: string;
  static main() {
    try {
      new BritishPostalCode(PostalTest.postalCode);
      return;
    } catch (error) {
      if (error instanceof PostalCodeException) console.log(error.message);
    }
    try {
      new GermanPostalCode(PostalTest.postalCode);
    } catch (error) {
      if (error instanceof PostalCodeException) console.log(error.message);
    }
    try {
      new USZipCode(PostalTest.postalCode);
    } catch (error) {
      if (error instanceof PostalCodeException) console.log(error.message);
    }
  }
}

PostalTest.postalCode = "12345-6789";
PostalTest.main();
