export default interface ICurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  publicAccount: boolean;
  phoneNumber?: string;
  address?: string;
  countryCode?: string;
  region?: string;
  city?: string;
  zipcode?: number;
  bio?: string;
}
