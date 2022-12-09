import {
  JsonController,
  Get,
  QueryParam,
  Authorized,
  CurrentUser, Patch, Body, BadRequestError, Param
} from 'routing-controllers';
import { logger } from '../utils/logger';
import { IUser, UserModel } from '../database/models/UserModel';
import { idTransform } from '../database/transforms';
import { HydratedDocument, isValidObjectId } from 'mongoose';

@JsonController('/users')
export class UsersController {
  @Get('/me')
  private async getUserMe (@CurrentUser() user: HydratedDocument<IUser>): Promise<any> {
    return user.toObject(
      {
        versionKey: false,
        transform: idTransform
      });
  }

  @Patch('/me')
  private async patchUserMe (@CurrentUser() user: HydratedDocument<IUser>, @Body() { name, login }: IUser): Promise<object> {
    if (login !== undefined && user.login !== login) {
      const checkLogin = await UserModel.findOne({ login }).exec();
      console.log(checkLogin);

      if (checkLogin !== undefined && checkLogin !== null) throw new BadRequestError('login is alredy busy');
    }

    let updated;

    try {
      updated = await UserModel.findOneAndUpdate({ _id: user.id }, { name, login }, { new: true, runValidators: true }).exec();
    } catch (e: any) {
      throw new BadRequestError(e.message);
    }

    if (updated !== undefined && updated !== null) {
      return await updated.toObject({
        versionKey: false,
        transform: idTransform
      });
    }

    throw new BadRequestError('User not found');
  }

  @Authorized(['user', 'admin', 'moder', 'vip'])
  @Get('/:user')
  private async getUser (@Param('user') user: string): Promise<object> {
    let findUser;
    if (isValidObjectId(user)) {
      findUser = await UserModel.findById(user).exec();
    } else {
      findUser = await UserModel.findOne({ login: user }).exec();
    }

    if (findUser !== undefined && findUser !== null) {
      return await findUser.toObject({ versionKey: false, transform: idTransform });
    }

    throw new BadRequestError('User not found');
  }

  @Authorized(['user', 'admin', 'moder', 'vip'])
  @Get('')
  private async getUsers (
    @QueryParam('limit') limit: number,
      @QueryParam('page') page: number
  ): Promise<object> {
    logger.info('UserController:getUser');

    const users = await UserModel.find({})
      .limit(limit)
      .skip(limit * (page - 1))
      .exec();

    return users.map((user) => user.toObject(
      {
        versionKey: false,
        transform: idTransform
      }));
  }
}
