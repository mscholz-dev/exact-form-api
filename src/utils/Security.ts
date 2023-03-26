import { Request } from "express";
import xss from "xss";
import { randomUUID } from "crypto";
import argon from "argon2";
import axios from "axios";

// types
import { TGeoLocationReturn } from "../utils/types.js";

export default class Security {
  xss(string: string | undefined) {
    return xss(string || "");
  }

  getIP(req: Request): string {
    const ip = req.headers["x-forwarded-for"];

    if (!ip) return "";

    // prevent spoofing
    return this.xss((ip as string).split(",")[0]);
  }

  createUUID() {
    return randomUUID();
  }

  async createHash(
    password: string,
  ): Promise<string> {
    return await argon.hash(password);
  }

  async verifyHash(
    dbPassword: string,
    formPassword: string,
  ): Promise<boolean> {
    return await argon.verify(
      dbPassword,
      formPassword,
    );
  }

  getUserAgent(req: Request): string {
    // prevent spoofing
    return this.xss(req.get("User-Agent") || "");
  }

  getRefererUrl(req: Request): string {
    // prevent spoofing
    return this.xss(req.get("url") || "");
  }

  async getUserCityRegionCountry(
    req: Request,
  ): Promise<TGeoLocationReturn> {
    const ip = this.getIP(req);

    // ip not found
    if (!ip)
      return {
        city: "",
        region: "",
        country: "",
      };

    const { data } = await axios.get(
      `https://ipapi.co/${ip}/json`,
    );

    // prevent spoofing
    return {
      city: this.xss(data.city || ""),
      region: this.xss(data.region || ""),
      country: this.xss(data.country_name || ""),
    };
  }
}
