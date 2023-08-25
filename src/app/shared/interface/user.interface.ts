export interface IUser {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: number;
}

export interface IResponse<T> {
  statusCode: number;
  payload: T;
}

export type IUsersResponse = IResponse<IUser[]>;
export type IUserResponse = IResponse<IUser>;
