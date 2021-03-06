export interface IProduct {
  _id?: string;
  name: string;
  category: string;
  description: string;
  store: string;
  price: number;
  image: string;
  __v: number;
}

export interface IStore {
  _id?: string;
  name: string;
  price: number;
  location: string;
  image: string;
  owner: string;
  product: String;
  __v: number;
}

export interface IAuthData {
  name: string;
  email: string;
  id: string;
  role: string;
  status: string;
  token: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: string;
}

export interface IDashboardStats {
  totalUser: number;
  totalOrder: number;
  totalProduct: number;
  totalStore: number;
}
