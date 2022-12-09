import {
  JsonController,
  Post,
  BadRequestError, Body, Res, InternalServerError
} from 'routing-controllers';
import { IUser, UserModel } from '../database/models/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { idTransform } from '../database/transforms';

@JsonController('')
export class AuthController {
  @Post('/signin')
  private async login (@Body() { email, password }: IUser, @Res() res: Response): Promise<any> {
    const find = await UserModel.findOne({ email }).select('+password').exec();

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
    const find = await UserModel.findOne({ email }).exec();

    if (find != null) {
      throw new BadRequestError('User is already exists with this email');
    }

    const User = new UserModel({ name, email: email.toLowerCase(), password, role: 'user', login });
    const validation = await User.validate();
    if (validation != null) {
      throw new BadRequestError(validation);
    }

    User.password = await bcrypt.hash(User.password, 10);
    await User.save();
    const createdUser = await UserModel.findOne({ email: email.toLowerCase() }).exec();

    if (createdUser === undefined) {
      throw new InternalServerError('Something went wrong, user not created');
    }
    return createdUser?.toJSON({
      versionKey: false,
      transform: idTransform
    });
  }
}
