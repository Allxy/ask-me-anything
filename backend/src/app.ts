import { createExpressServer } from 'routing-controllers';
import 'reflect-metadata';
import * as mongoose from 'mongoose';
import path from 'path';
import authorizationChecker from './checkers/authorization';
import currentUserChecker from './checkers/user';
import { MONGODB_URL, PORT } from './utils/constants';
import logger from './utils/logger';
import { AuthErrorHandler } from './middlewares/AuthErrorHandler';
import { DefaultErrorHandler } from './middlewares/DefaultErrorHandler';
import { HttpErrorHandler } from './middlewares/HttpErrorHandler';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { UsersController } from './controllers/UsersController';
import { AuthController } from './controllers/AuthController';
import { QuestionController } from './controllers/QuestionController';
import { AnswersController } from './controllers/AnswersController';

logger.level = process.env.LOG_LEVEL ?? 'error';

async function start (): Promise<void> {
  mongoose.set('strictQuery', false);
  await mongoose.connect(MONGODB_URL);
  logger.info('Success connection with DB');

  const app = createExpressServer({
    cors: true,
    middlewares: [AuthErrorHandler, DefaultErrorHandler, HttpErrorHandler, LoggerMiddleware],
    controllers: [UsersController, AuthController, QuestionController, AnswersController],
    interceptors: [path.join(__dirname, '/interceptors/**/*.ts')],
    authorizationChecker,
    currentUserChecker,
    defaultErrorHandler: false,
    validation: true
  });

  app.listen(PORT, () => logger.info(`Running on port ${PORT}`));
}

start().catch(err => logger.fatal(err));
