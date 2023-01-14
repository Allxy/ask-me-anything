import mongoose, { Model, ObjectId, RefType, Schema, Types } from 'mongoose';

export interface IQuestion {
  author: RefType
  owner: RefType
  text: String
  anonim: Boolean
  answer?: String
  likes: ObjectId[]
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
  text: {
    type: String,
    minlength: [5, 'must be at least 5'],
    maxlength: [400, 'should be no more than 400'],
    required: [true, 'is required']
  },
  anonim: {
    type: Boolean,
    required: [true, 'is required']
  },
  answer: {
    type: String,
    minlength: [5, 'must be at least 5'],
    maxlength: [400, 'should be no more than 400']
  },
  likes: {
    type: [Types.ObjectId],
    select: false,
    ref: 'User',
    default: []
  }
}, { timestamps: true });

export const QuestionModel = mongoose.model<IQuestion, QuestionModelType>('Question', questionSchema);
