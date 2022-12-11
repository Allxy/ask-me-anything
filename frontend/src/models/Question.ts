import User from './User';

export interface Question {
  _id: string
  title: string
  body: string
  anonim: boolean
  owner?: User
  author?: User
}
