import mongoose, { Model, RefType, Schema } from 'mongoose';

export interface IQuestion {
  author: RefType
  owner: RefType
  title: String
  body: String
  anonim: Boolean
}

export interface QuestionModelType extends Model<IQuestion> {

};

const questionSchema = new mongoose.Schema<IQuestion, QuestionModelType>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    select: false,
    required: [true, 'is required']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    select: false,
    required: [true, 'is required']
  },
  title: {
    type: String,
    required: [true, 'is required']
  },
  body: {
    type: String,
    required: [true, 'is required']
  },
  anonim: {
    type: Boolean,
    required: [true, 'is required']
  }
});

export const QuestionModel = mongoose.model<IQuestion, QuestionModelType>('Question', questionSchema);
