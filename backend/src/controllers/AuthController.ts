import bcrypt from 'bcrypt';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  BadRequestError, Body, JsonController,
  Post, Res
} from 'routing-controllers';
import UserModel, { IUser } from '../models/UserModel';
import { AUTH_ERROR, JWT_SECRET } from '../utils/constants';

@JsonController('', { transformResponse: false })
export class AuthController {
  @Post('/signin')
  private async login (@Body() { email, password }: IUser, @Res() res: Response): Promise<any> {
    const find = await UserModel.findOne({ email: email.toLowerCase() }).select('+password').exec();

    if (find == null) {
      throw new BadRequestError(AUTH_ERROR);
    }

    const match = await bcrypt.compare(password, String(find?.password));
    if (!match) {
      throw new BadRequestError(AUTH_ERROR);
    }

    const token = jwt.sign({ id: find.id, role: find.role }, JWT_SECRET, { expiresIn: '10d' });

    return { token };
  }

  @Post('/signup')
  private async getUserMe (@Body() { name, email, password, login }: IUser): Promise<any> {
    email = email.toLowerCase();
    login = login.toLowerCase();
    const find = await UserModel.findOne({ $or: [{ email }, { login }] }).select('+email').exec();
    if (find != null) {
      throw new BadRequestError(`User is already exists with this ${email === find.email ? 'email' : 'login'}`);
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPass, role: 'user', login });
    await user.validate();
    await user.save();

    return user;
  }
}
