import { Request } from "express";
import xss from "xss";
import { randomUUID } from "crypto";

export default class Security {
  xss(string: string | undefined) {
    return xss(string || "");
  }

  getIP(req: Request): string {
    const ip = req.headers["x-forwarded-for"];

    if (!ip) return "";

    return (ip as string).split(",")[0];
  }

  createUUID() {
    return randomUUID();
  }
}
