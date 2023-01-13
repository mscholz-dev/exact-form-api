export default class Regex {
  email(string: string): boolean {
    return new RegExp(
      /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/,
      "",
    ).test(string);
  }

  phone(string: string): boolean {
    return new RegExp("[0-9]{10}").test(string);
  }
}
