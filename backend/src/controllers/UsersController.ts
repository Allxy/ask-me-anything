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
import { FilterQuery, HydratedDocument } from 'mongoose';
import { findUser } from '../database/finders';

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
    const userDoc = await findUser(user);

    return await userDoc.toObject(
      {
        versionKey: false,
        transform: idTransform
      }
    );
  }

  @Authorized(['user', 'admin', 'moder', 'vip'])
  @Get('')
  private async getUsers (
    @QueryParam('limit') limit: number = 10,
    @QueryParam('page') page: number = 1,
    @QueryParam('login') login?: string
  ): Promise<object> {
    logger.info('UserController:getUsers');
    const query: FilterQuery<IUser> = {};
    if (login !== undefined) {
      query.login = { $regex: login };
    }

    const users = await UserModel.find(query)
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
