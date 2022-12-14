import { HydratedDocument } from 'mongoose';
import { Body, CurrentUser, Get, JsonController, Param, Post } from 'routing-controllers';
import { findUser } from '../database/finders';
import { IQuestion, QuestionModel } from '../database/models/QuestionModel';
import { IUser } from '../database/models/UserModel';
import { idTransform } from '../database/transforms';

@JsonController('/questions')
export class QuestionController {
  @Get('/me')
  private async getQuestionsForMe (@CurrentUser() user: HydratedDocument<IUser>): Promise<any> {
    const questions = await QuestionModel
      .find({ owner: user.id, answer: { $exists: false } })
      .populate('author')
      .exec();

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

  @Get('/:author')
  private async getUserQuestions (@CurrentUser() user: HydratedDocument<IUser>, @Param('author') author: string): Promise<any> {
    const authorDoc = await findUser(author);

    const questions = await QuestionModel
      .find({ author: authorDoc, anonim: false })
      .populate('owner author')
      .exec();

    return questions.map((question) =>
      question.toObject({
        versionKey: false,
        transform: idTransform
      })
    );
  };

  @Post()
  private async postQuestions (@CurrentUser() user: HydratedDocument<IUser>, @Body() { owner, anonim = true, text }: IQuestion): Promise<any> {
    const ownerDoc = await findUser(owner);

    const question = new QuestionModel({ author: user.id, owner: ownerDoc.id, anonim, text });
    await question.save();
    const pop = await question.populate('owner author');
    return pop.toObject({ versionKey: false, transform: idTransform });
  };
}
