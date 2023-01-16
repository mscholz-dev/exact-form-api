export type TUserCreate = {
  username: string;
  email: string;
  password: string;
};

export type TSignJwt = {
  username: string;
  email: string;
};

export type TUserCreateData = {
  username: string;
  email: string;
  password: string;
  password2: string;
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
};

export type TUserConnect = {
  email: string;
  password: string;
};

export type TContactContactData = {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  message: string;
};

export type TContactTemplate = {
  headTitle: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  message: string;
};
