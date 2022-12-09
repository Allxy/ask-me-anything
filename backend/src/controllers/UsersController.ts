import { Request, Response } from 'express';
import {
  JsonController,
  Get,
  QueryParam,
  Authorized,
  CurrentUser, Patch, Body, BadRequestError
} from 'routing-controllers';
import { logger } from '../utils/logger';
import { IUser, UserModel } from '../database/models/UserModel';
import { idTransform } from '../database/transforms';
import { HydratedDocument } from 'mongoose';

@JsonController('/users')
export class UsersController {
  @Get(':user')
  private getUser (req: Request, res: Response): void {
    logger.info(req.params.msg);
    res.status(200).json({
      message: req.params.msg
    });
  }

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

  @Authorized(['user', 'admin', 'moder'])
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
