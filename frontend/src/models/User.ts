export interface IUser {
  _id: string
  name: string
  email?: string
  login: string
  role: ERole
};

export enum ERole {
  USER = 'user',
  ADMIN = 'admin',
  MODER = 'moder',
  VIP = 'vip'
}
