import { IUser } from './User';
export interface IQuestion {
  _id: string
  title: string
  body: string
  anonim: boolean
  owner?: IUser
  author?: IUser
}
