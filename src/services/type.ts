export interface ISignInServiceParams {
  email?: string;
  password?: string;
  token?: string;
  rememberMe?: boolean;
}

export interface IRefreshServiceParams {
  refreshToken?: string;
  expiresInMins?: number;
}

export interface RefreshProps {
  accessToken: string;
  refreshToken: string;
}

export interface ISignInProps {
  id?: number,
  username?: string,
  email?: string,
  firstName?: string,
  lastName?: string,
  gender?: "male" | "female",
  image?: string,
  accessToken?: string,
  refreshToken?: string,
}

export interface BaseUserProps {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: "male" | "female";
  image?: string;
}

export interface UserProfileProps extends BaseUserProps {
  age?: number;
  birthDate?: string;
  phone?: string;
}

export interface CompanyProps {
  department?: string;
  name?: string;
  title?: string;
}

export interface AddressProps {
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface UserAddressProps extends AddressProps {
  stateCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface UserBankProps {
  cardExpire?: string;
  cardNumber?: string;
  cardType?: string;
  currency?: string;
  iban?: string;
}

export interface UserHairProps {
  color?: string;
  type?: string;
}

export interface UserCryptoProps {
  coin?: string;
  wallet?: string;
  network?: string;
}

export interface UserProps extends UserProfileProps {
  company?: {
    department?: string;
    name?: string;
    title?: string;
    address?: UserAddressProps;
  };
  address?: UserAddressProps;
  role?: string;
  bank?: UserBankProps;
  hair?: UserHairProps;
  crypto?: UserCryptoProps;
}