import { Types, Document, isValidObjectId, RefType } from 'mongoose';
import { BadRequestError } from 'routing-controllers';
import { IUser, UserModel } from './models/UserModel';

export async function findUser (findValue: RefType): Promise<Document<unknown, any, IUser> & IUser & { _id: Types.ObjectId }> {
  let findUser;
  if (isValidObjectId(findValue)) {
    findUser = await UserModel.findById(findValue).exec();
  } else {
    findUser = await UserModel.findOne({ login: findValue }).exec();
  }

  if (findUser === null) {
    throw new BadRequestError('User not found');
  }

  return findUser;
}
