import mongoose, { Model } from 'mongoose';

export type IRole = 'admin' | 'user' | 'moder';

export interface IUser {
  name: string
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
    min: [2, 'must be at least 2'],
    max: [16, 'should be no more than 16']
  },
  email: {
    type: String,
    required: [true, 'is required'],
    unique: true,
    validate: [
      function (v: string) {
        return /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(v);
      },
      (props: { value: string }) => `${props.value} is not a valid email!`
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
