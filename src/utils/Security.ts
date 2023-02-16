import { Request } from "express";
import xss from "xss";
import { randomUUID } from "crypto";
import argon from "argon2";
import axios from "axios";

// types
import {
  TGeoLocation,
  TGeoLocationReturn,
} from "../utils/types.js";

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
    return req.get("User-Agent") || "";
  }

  getRefererUrl(req: Request): string {
    return req.get("url") || "";
  }

  async getUserCityRegionCountry(
    req: Request,
  ): Promise<TGeoLocationReturn> {
    const ip = this.getIP(req);

    const { data } = await axios.get(
      `https://ipapi.co/${ip}/json`,
    );

    return {
      city: data.city || "",
      region: data.region || "",
      country: data.country_name || "",
    };
  }
}
