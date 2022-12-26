import { createExpressServer } from 'routing-controllers';
import 'reflect-metadata';
import * as mongoose from 'mongoose';
import path from 'path';
import authorizationChecker from './checkers/authorization';
import currentUserChecker from './checkers/user';
import { MONGODB_URL, PORT } from './utils/constants';
import logger from './utils/logger';

logger.level = process.env.LOG_LEVEL ?? 'error';

async function start (): Promise<void> {
  mongoose.set('strictQuery', false);
  await mongoose.connect(MONGODB_URL);
  logger.info('Success connection with DB');

  const app = createExpressServer({
    cors: true,
    middlewares: [path.join(__dirname, '/middlewares/**/*.ts'), path.join(__dirname, '/middlewares/**/*.js')],
    controllers: [path.join(__dirname, '/controllers/**/*.ts'), path.join(__dirname, '/controllers/**/*.js')],
    interceptors: [path.join(__dirname, '/interceptors/**/*.ts'), path.join(__dirname, '/interceptors/**/*.js')],
    authorizationChecker,
    currentUserChecker,
    defaultErrorHandler: false,
    validation: true
  });
  app.listen(PORT, () => logger.info(`Running on port ${PORT}`));
}

start().catch(err => logger.fatal(err));
