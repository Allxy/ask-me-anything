export enum Roles {
  Admin = 'admin',
  Moder = 'moder',
  User = 'user',
}

export interface User {
  _id: string
  name: string
  email: string
  role: Roles
}
