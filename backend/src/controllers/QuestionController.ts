import { HydratedDocument } from 'mongoose';
import { Body, CurrentUser, Delete, Get, JsonController, NotFoundError, Param, Post } from 'routing-controllers';
import { IQuestion, QuestionModel } from '../models/QuestionModel';
import UserModel, { IUser } from '../models/UserModel';
import { QUESTION_NOT_FOUND } from '../utils/constants';

@JsonController('/questions', { transformResponse: false })
export class QuestionController {
  @Get('/me')
  private async getQuestionsForMe (@CurrentUser() user: HydratedDocument<IUser>): Promise<any> {
    const questions = await QuestionModel
      .find({ owner: user.id, answer: { $exists: false } })
      .sort({ createdAt: -1 })
      .populate('author')
      .exec();

    return questions
      .map((question) =>
        question.toObject({
          transform: (doc, ret) => {
            if (doc.anonim === true) {
              delete ret.author;
            }
          }
        })
      );
  };

  @Delete('/:id')
  private async deleteQuestion (@CurrentUser() user: HydratedDocument<IUser>, @Param('id') id: string): Promise<any> {
    const questions = await QuestionModel
      .findOne({ _id: id, answer: { $exists: false } }).exec();

    if (questions === null) throw new NotFoundError(QUESTION_NOT_FOUND);

    return questions.toObject({
      transform: (doc, ret) => {
        if (doc.anonim === true) {
          delete ret.author;
        }
      }
    });
  };

  @Get('/:author')
  private async getUserQuestions (@CurrentUser() user: HydratedDocument<IUser>, @Param('author') author: string): Promise<any> {
    const authorDoc = await UserModel.findUserByIdOrLogin(author); ;

    const questions = await QuestionModel
      .find({ author: authorDoc, anonim: false })
      .populate('owner author')
      .exec();

    return questions;
  };

  @Post()
  private async postQuestions (@CurrentUser() user: HydratedDocument<IUser>, @Body() { owner, anonim = true, text }: IQuestion): Promise<any> {
    const ownerDoc = await UserModel.findUserByIdOrLogin(owner);

    const question = new QuestionModel({ author: user.id, owner: ownerDoc.id, anonim, text });
    await question.save();
    return await question.populate('owner author');
  };
}
