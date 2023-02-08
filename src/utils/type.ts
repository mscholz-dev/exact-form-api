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
