import xss from "xss";

export default class Security {
  xss(string: string | undefined) {
    return xss(string || "");
  }
}
