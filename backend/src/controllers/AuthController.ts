import bcrypt from 'bcrypt';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  BadRequestError, Body, InternalServerError, JsonController,
  Post, Res
} from 'routing-controllers';
import { IUser, UserModel } from '../database/models/UserModel';
import { idTransform } from '../database/transforms';

@JsonController('')
export class AuthController {
  @Post('/signin')
  private async login (@Body() { email, password }: IUser, @Res() res: Response): Promise<any> {
    const find = await UserModel.findOne({ email: email.toLowerCase() }).select('+password').exec();

    if (find == null) {
      throw new BadRequestError('User not found');
    }

    const match = await bcrypt.compare(password, String(find?.password));
    if (!match) {
      throw new BadRequestError('Wrong password');
    }

    const token = jwt.sign({ id: find.id, role: find.role }, process.env.BACKEND_JWT_SECRET ?? 'secret', { expiresIn: '10d' });

    return { token };
  }

  @Post('/signup')
  private async getUserMe (@Body() { name, email, password, login }: IUser): Promise<any> {
    email = email.toLowerCase();
    const find = await UserModel.findOne({ $or: [{ email }, { login }] }).select('+email').exec();
    if (find != null) {
      throw new BadRequestError(`User is already exists with this ${email === find.email ? 'email' : 'login'}`);
    }

    const User = new UserModel({ name, email, password, role: 'user', login });
    try {
      await User.validate();
      User.password = await bcrypt.hash(User.password, 10);
      await User.save();
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }

    const createdUser = await UserModel.findOne({ email }).exec();
    if (createdUser === undefined) {
      throw new InternalServerError('Something went wrong, user not created');
    }
    return createdUser?.toJSON({
      versionKey: false,
      transform: idTransform
    });
  }
}
