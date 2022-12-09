import mongoose, { Model } from 'mongoose';

export type IRole = 'admin' | 'user' | 'moder';

export interface IUser {
  name: string
  login: string
  email: string
  role: IRole
  password: string
}

export interface UserModelType extends Model<IUser> {

};

const userSchema = new mongoose.Schema<IUser, UserModelType>({
  name: {
    type: String,
    required: [true, 'is required'],
    minlength: [2, 'must be at least 2'],
    maxlength: [16, 'should be no more than 16']
  },
  login: {
    type: String,
    required: [true, 'is required'],
    unique: true,
    minlength: [2, 'must be at least 5'],
    maxlength: [16, 'should be no more than 16'],
    validate: [
      function (v: string) {
        return /^[a-zA-Z\d]+$/.test(v);
      },
      (props: { value: string }) => `${props.value} is not a valid login`
    ]
  },
  email: {
    type: String,
    required: [true, 'is required'],
    unique: true,
    validate: [
      function (v: string) {
        return /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(v);
      },
      (props: { value: string }) => `${props.value} is not a valid email`
    ]
  },
  role: {
    type: String,
    required: [true, 'is required'],
    enum: ['admin', 'moderator', 'vip', 'user']
  },
  password: {
    type: String,
    select: false,
    required: [true, 'is required']
  }
});

export const UserModel = mongoose.model<IUser, UserModelType>('User', userSchema);
