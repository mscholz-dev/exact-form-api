export type TUserCreate = {
  username: string;
  email: string;
  password: string;
  locale: "fr" | "en";
};

export type TSignJwt = {
  username: string;
  email: string;
  role: "CLIENT" | "ADMIN" | "SUPER_ADMIN";
};

export type TUserCreateData = {
  username: string;
  email: string;
  password: string;
  password2: string;
  locale: "fr" | "en";
};

export type TInspectData = {
  username?: string;
  email?: string;
  password?: string;
  password2?: string;
};

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

// export type TAuthMiddleware = {
//   isAuth: boolean;
//   username?: string;
//   email?: string;
//   role?: "CLIENT" | "ADMIN" | "SUPER_ADMIN";
// };
