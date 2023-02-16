import type { Prisma } from "@prisma/client";

export type TUserCreate = {
  username: string;
  email: string;
  password: string;
  market: boolean | string;
  locale: "fr" | "en";
};

export type TCookie = {
  username: string;
  email: string;
  role: "CLIENT" | "ADMIN" | "SUPER_ADMIN";
};

export type TCookieMiddleware = {
  id: string;
  username: string;
  email: string;
  role: "CLIENT" | "ADMIN" | "SUPER_ADMIN";
};

export type TUserCreateData = {
  username: string;
  email: string;
  password: string;
  password2: string;
  market: boolean | string;
  locale: "fr" | "en";
};

export type TInspectData = Record<string, any>;

export type TUserConnectData = {
  email: string;
  password: string;
  locale: "fr" | "en";
};

export type TUserConnect = {
  email: string;
  password: string;
  locale: "fr" | "en";
};

export type TContactContactData = {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  message: string;
  locale: "fr" | "en";
};

export type TNewIP = {
  email: string;
  locale: "fr" | "en";
};

export type TUserUpdateData = {
  username: string;
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
  market: string | boolean;
  locale: "fr" | "en";
};

export type TUserCreateEmailTokenData = {
  locale: "fr" | "en";
};

export type TUserUpdateEmailData = {
  newEmail: string;
  newEmail2: string;
  token: string;
  locale: "fr" | "en";
};

export type TFormCreateData = {
  name: string;
  timezone: string;
  locale: "fr" | "en";
};

export type TFormGetAllData = {
  name: string;
  key: string;
  timezone: string;
  items: number;
  owner: string;
}[];

export type TFormGetAllQuery = {
  page: string;
};

export type TFormCreateItemData = {
  key: string;
  data: object;
};

export type TFormGetSpecificFormReturn = {
  items: {
    data: Prisma.JsonValue;
    created_at: Date;
  }[];
  countAll: number;
  name: string;
  timezone: string;
};

export type TFormGetSpecificFormData = {
  key: string;
  page: string;
};

export type TFormDeleteItemData = {
  key: string;
  id: string;
};

export type TFormDeleteManyItemData = {
  key: string;
  ids: string[];
};

export type TGeoLocation = {
  city: string;
  region: string;
  country_name: string;
};

export type TGeoLocationReturn = {
  city: string;
  region: string;
  country: string;
};
