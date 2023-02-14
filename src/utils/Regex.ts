export default class Regex {
  email(string: string): boolean {
    return new RegExp(
      /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/,
      "",
    ).test(string);
  }

  phone(string: string): boolean {
    return new RegExp("^[0-9]{10}$").test(string);
  }

  password(string: string): boolean {
    // at least one upper case english letter
    // at least one lower case english letter
    // at least on digit
    // at least one special character
    // at least 8 characters
    return new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
    ).test(string);
  }

  passwordAtLeastOneUppercase(
    string: string,
  ): boolean {
    return new RegExp("(?=.*?[A-Z])").test(
      string,
    );
  }

  passwordAtLeastOneLowercase(
    string: string,
  ): boolean {
    return RegExp("(?=.*?[a-z])").test(string);
  }

  passwordAtLeastOneDigit(
    string: string,
  ): boolean {
    return RegExp("(?=.*?[0-9])").test(string);
  }

  passwordAtLeastOneSpecialCharacter(
    string: string,
  ): boolean {
    return RegExp("(?=.*?[#?!@$%^&*-])").test(
      string,
    );
  }

  passwordAtLeastHeightCharacters(
    string: string,
  ): boolean {
    return RegExp(".{8,}").test(string);
  }
}
