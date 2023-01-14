import { HydratedDocument, isValidObjectId } from 'mongoose';
import {
  Authorized,
  BadRequestError,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParam
} from 'routing-controllers';
import { IQuestion, QuestionModel } from '../models/QuestionModel';
import UserModel, { IUser } from '../models/UserModel';

@JsonController('/answers', { transformResponse: false })
export class AnswersController {
  @Authorized(['user', 'admin', 'moder', 'vip'])
  @Get()
  private async getAnswers (
    @QueryParam('limit') limit: number = 10,
    @QueryParam('page') page: number = 1
  ): Promise<any> {
    const answers = await QuestionModel.find({ answer: { $exists: true } })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('author owner likes');

    return answers.map((answer) =>
      answer.toObject({
        transform: (doc, ret) => {
          if (doc.anonim === true) {
            delete ret.author;
          }
        }
      })
    );
  }

  @Authorized(['user', 'admin', 'moder', 'vip'])
  @Get('/:owner')
  private async getUserAnswers (
    @Param('owner') owner: string,
      @QueryParam('limit') limit: number = 10,
      @QueryParam('page') page: number = 1
  ): Promise<any> {
    let findUser;
    if (isValidObjectId(owner)) {
      findUser = await UserModel.findById(owner).exec();
    } else {
      findUser = await UserModel.findOne({ login: owner }).exec();
    }

    if (findUser === null) {
      throw new BadRequestError('User not found');
    }

    const answers = await QuestionModel.find({
      owner: findUser.id,
      answer: { $exists: true }
    })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('author owner likes');

    return answers.map((answer) =>
      answer.toObject({
        transform: (doc, ret) => {
          if (doc.anonim === true) {
            delete ret.author;
          }
        }
      })
    );
  }

  @Post()
  private async postAnswerForQuestion (
    @CurrentUser() user: HydratedDocument<IUser>,
      @Body() { answer, question }: IQuestion & { question: string }
  ): Promise<any> {
    const questionDoc = await QuestionModel.findById(question)
      .select('+owner')
      .exec();

    if (questionDoc === null) {
      throw new BadRequestError('Question not found');
    } else if (questionDoc.answer !== undefined) {
      throw new BadRequestError('Question already have answer');
    } else if (questionDoc.owner?.toString() !== user.id) {
      throw new BadRequestError('It is question not for you');
    }

    let answerDoc;
    try {
      answerDoc = await QuestionModel.findByIdAndUpdate(
        question,
        { answer },
        { new: true, runValidators: true }
      );
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }

    return answerDoc;
  }

  @Put('/:answerId/like')
  private async putAnswerLike (
    @CurrentUser() user: HydratedDocument<IUser>,
      @Param('answerId') id: string
  ): Promise<any> {
    const answerDoc = await QuestionModel.findByIdAndUpdate(
      id,
      { $addToSet: { likes: user._id } },
      { timestamps: false, new: true }
    ).populate('owner author likes');

    if (answerDoc === null) {
      throw new BadRequestError('Answer not found');
    }

    return answerDoc.toObject({
      transform: (doc, ret) => {
        if (doc.anonim === true) {
          delete ret.author;
        }
      }
    });
  }

  @Delete('/:answerId/like')
  private async deleteAnswerLike (
    @CurrentUser() user: HydratedDocument<IUser>,
      @Param('answerId') id: string
  ): Promise<any> {
    const answerDoc = await QuestionModel.findByIdAndUpdate(
      id,
      { $pull: { likes: user._id } },
      { timestamps: false, new: true }
    ).populate('owner author likes');

    if (answerDoc === null) {
      throw new BadRequestError('Answer not found');
    }

    return answerDoc.toObject({
      transform: (doc, ret) => {
        if (doc.anonim === true) {
          delete ret.author;
        }
      }
    });
  }
}
