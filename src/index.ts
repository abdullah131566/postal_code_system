import PostalCode, {
  BritishPostalCode,
  GermanPostalCode,
  PostalCodeException,
  PostalCodeRepository,
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
      return;
    } catch (error) {
      if (error instanceof PostalCodeException) console.log(error.message);
    }
    try {
      new USZipCode(PostalTest.postalCode);
      return;
    } catch (error) {
      if (error instanceof PostalCodeException) console.log(error.message);
    }
  }
}

const pc = new BritishPostalCode("SW6A 1AA");
// PostalCodeRepository.codesFilePath = "src/postal-records.txt"
// pc.isOnRecord().then((res) => {
//   if (res) console.log(pc.getCode(), "is on record.");
//   else console.log(pc.getCode(), "is NOT on record.")
// });
pc.setDestination().then(()=>console.log(pc.getDestination()))