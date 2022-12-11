interface User {
  _id: string
  name: string
  email?: string
  login: string
  role: Role
};

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  MODER = 'moder',
  VIP = 'vip'
}

export default User;
