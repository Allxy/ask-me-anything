import { HydratedDocument, isValidObjectId } from 'mongoose';
import { Authorized, BadRequestError, Body, CurrentUser, Get, JsonController, NotFoundError, Param, Post } from 'routing-controllers';
import { idTransform } from '../database/transforms';
import { IQuestion, QuestionModel } from '../database/models/QuestionModel';
import { IUser, UserModel } from '../database/models/UserModel';

@JsonController('/questions')
export class QuestionController {
  @Get('/me')
  private async getMeQuestions (@CurrentUser() user: HydratedDocument<IUser>): Promise<any> {
    console.log(user);

    const questions = await QuestionModel.find({ owner: user.id }).populate('author').exec();

    return questions
      .map((question) =>
        question.toObject({
          versionKey: false,
          transform: (doc, res) => {
            if (doc.anonim === true) {
              res.author = undefined;
            }
            return idTransform(doc, res);
          }
        })
      );
  };

  @Get('/my')
  private async getMyQuestions (@CurrentUser() user: HydratedDocument<IUser>): Promise<any> {
    const questions = await QuestionModel.find({ author: user.id }).populate('owner').exec();

    return questions.map((question) => question.toObject({ versionKey: false, transform: idTransform }));
  };

  @Authorized(['user', 'admin', 'moder', 'vip'])
  @Get('/user/:owner')
  private async getUserQuestions (@Param('owner') owner: string): Promise<any> {
    let findUser;
    if (isValidObjectId(owner)) {
      findUser = await UserModel.findById(owner).exec();
    } else {
      findUser = await UserModel.findOne({ login: owner }).exec();
    }

    let questions;

    try {
      questions = await QuestionModel.find({ owner: (findUser != null) ? findUser.id : owner }).populate('author').exec();
    } catch (e: any) {
      throw new BadRequestError('User not found');
    }

    return questions
      .map((question) =>
        question.toObject({
          versionKey: false,
          transform: (doc, res) => {
            if (doc.anonim === true) {
              res.author = undefined;
            }
            return idTransform(doc, res);
          }
        })
      );
  };

  @Post()
  private async postQuestions (@CurrentUser() user: HydratedDocument<IUser>, @Body() { owner, anonim = true, body, title }: IQuestion): Promise<any> {
    const ownerDoc = await UserModel.findById(owner).exec();

    if (ownerDoc !== null) {
      const question = new QuestionModel({ author: user.id, owner, anonim, body, title });
      await question.save();
      const pop = await question.populate('owner author');
      return pop.toObject({ versionKey: false, transform: idTransform });
    }

    throw new NotFoundError('User not found');
  };
}
