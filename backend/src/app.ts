import log4js from 'log4js';
import { Action, createExpressServer, ForbiddenError } from 'routing-controllers';
import 'reflect-metadata';
import * as mongoose from 'mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IRole, UserModel } from './database/models/UserModel';
import path from 'path';

const logger = log4js.getLogger();
logger.level = process.env.BACKEND_LOG_LEVEL ?? 'error';
const port = process.env.PORT ?? 3001;

const {
  MONGODB_USER = '',
  MONGODB_PASSWORD = '',
  MONGODB_HOST = '',
  MONGODB_DOCKER_PORT = '',
  MONGODB_DATABASE = ''
} = process.env;

async function start (): Promise<void> {
  mongoose.set('strictQuery', false);
  await mongoose.connect(`mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_DOCKER_PORT}/${MONGODB_DATABASE}`);

  const app = createExpressServer({
    cors: true,
    middlewares: [path.join(__dirname, '/middlewares/**/*.ts')],
    controllers: [path.join(__dirname, '/controllers/**/*.ts')],
    authorizationChecker: (action: Action, roles: IRole[]) => {
      if (action.request.headers.authorization !== undefined) {
        try {
          const payload = jwt.verify(action.request.headers.authorization.split(' ')[1],
            process.env.BACKEND_JWT_SECRET ?? 'secret', { complete: true }).payload as JwtPayload;
          if (!roles.includes(payload.role)) {
            throw new ForbiddenError('No access to this resource');
          }

          action.request.payload_data = payload;
          return true;
        } catch (e: any) {
          throw new ForbiddenError('Bad token');
        }
      }
      throw new ForbiddenError('No access to this resource');
    },
    currentUserChecker: async (action: Action) => {
      let payload;

      if (action.request.payload_data !== undefined) {
        payload = action.request.payload_data;
      } else if (action.request.headers.authorization !== undefined) {
        try {
          payload = jwt.verify(action.request.headers.authorization.split(' ')[1],
            process.env.BACKEND_JWT_SECRET ?? 'secret', { complete: true }).payload as JwtPayload;
        } catch (e: any) {
          throw new ForbiddenError('Bad token');
        }
      } else {
        throw new ForbiddenError('No token');
      }

      const user = await UserModel.findById(payload.id).select('+email').exec();

      if (user !== undefined && user !== null) {
        return user;
      }
      throw new ForbiddenError('User not found or bad token');
    }
  });
  app.listen(port, () => logger.info(`Running on port ${port}`));
}

start().catch(err => logger.error(err));
