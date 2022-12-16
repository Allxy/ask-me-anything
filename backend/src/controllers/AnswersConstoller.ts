import { HydratedDocument, isValidObjectId } from 'mongoose';
import { Authorized, BadRequestError, Body, CurrentUser, Get, JsonController, Param, Post, QueryParam } from 'routing-controllers';
import { IQuestion, QuestionModel } from '../database/models/QuestionModel';
import { IUser, UserModel } from '../database/models/UserModel';
import { idTransform } from '../database/transforms';

@JsonController('/answers')
export class AnswersController {
  @Authorized(['user', 'admin', 'moder', 'vip'])
  @Get()
  private async getAnswers (
    @QueryParam('limit') limit: number = 10,
    @QueryParam('page') page: number = 1
  ): Promise<any> {
    const answers = await QuestionModel
      .find({ answer: { $exists: true } })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('author owner')
      .exec();

    return answers
      .map((answer) =>
        answer.toObject({
          versionKey: false,
          transform: (doc, res) => {
            if (doc.anonim === true) {
              res.author = undefined;
            }
            return idTransform(doc, res);
          }
        })
      );
  }

  @Authorized(['user', 'admin', 'moder', 'vip'])
  @Get('/:owner')
  private async getUserAnswers (@Param('owner') owner: string): Promise<any> {
    let findUser;
    if (isValidObjectId(owner)) {
      findUser = await UserModel.findById(owner).exec();
    } else {
      findUser = await UserModel.findOne({ login: owner }).exec();
    }

    if (findUser === null) {
      throw new BadRequestError('User not found');
    }

    const answers = await QuestionModel
      .find({ owner: findUser.id, answer: { $exists: true } })
      .sort({ updatedAt: -1 })
      .populate('author owner')
      .exec();

    return answers
      .map((answer) =>
        answer.toObject({
          versionKey: false,
          transform: (doc, res) => {
            if (doc.anonim === true) {
              res.author = undefined;
            }
            return idTransform(doc, res);
          }
        })
      );
  }

  @Post()
  private async postAnswerForQuestion (
    @CurrentUser() user: HydratedDocument<IUser>,
      @Body() { answer, question }: IQuestion & { question: string }): Promise<any> {
    const questionDoc = await QuestionModel.findById(question).select('+owner').exec();

    if (questionDoc === null) {
      throw new BadRequestError('Question not found');
    } else if (questionDoc.answer !== undefined) {
      throw new BadRequestError('Question already have answer');
    } else if (questionDoc.owner?.toString() !== user.id) {
      throw new BadRequestError('It is question not for you');
    }

    let answerDoc;
    try {
      answerDoc = await QuestionModel
        .findByIdAndUpdate(question, { answer }, { new: true, runValidators: true })
        .exec();
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }

    return answerDoc?.toObject({
      versionKey: false,
      transform: idTransform
    });
  };
}
