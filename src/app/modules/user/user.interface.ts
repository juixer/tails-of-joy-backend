export type TRole = "admin" | "user" | "superAdmin";

export type TFollow = {
  _id: string;
};

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TRole;
  img: string;
  following: TFollow[];
  followers: TFollow[];
}
