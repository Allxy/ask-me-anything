import { IUser } from './User';
export interface IQuestion {
  _id: string
  text: string
  anonim: boolean
  owner?: IUser
  author?: IUser
  answer?: string
  likes: IUser[]
  createdAt: string
  updatedAt: string
}
