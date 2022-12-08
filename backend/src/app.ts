import log4js from 'log4js';
import { Action, createExpressServer, ForbiddenError } from 'routing-controllers';
import * as controllers from './controllers';
import 'reflect-metadata';
import * as mongoose from 'mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IRole, UserModel } from './database/models/UserModel';
import { idTransform } from './database/transforms';

const logger = log4js.getLogger();
logger.level = process.env.BACKEND_LOG_LEVEL ?? 'error';
const port = process.env.BACKEND_PORT ?? 5000;

const controllerInstances: Function[] = [];
for (const name in controllers) {
  const Controller = (controllers as any)[name];
  controllerInstances.push(Controller);
}

const {
  MONGODB_USER = '',
  MONGODB_PASSWORD = '',
  MONGODB_HOST = '',
  MONGODB_DOCKER_PORT = '',
  MONGODB_DATABASE = ''
} = process.env;

async function start (): Promise<void> {
  mongoose.set('strictQuery', false);
  await mongoose.connect(`mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_DOCKER_PORT}/${MONGODB_DATABASE}?authSource=admin`);

  const app = createExpressServer({
    controllers: controllerInstances,
    authorizationChecker: (action: Action, roles: IRole[]) => {
      if (action.request.headers.authorization !== undefined) {
        try {
          const payload = jwt.verify(action.request.headers.authorization.split(' ')[1],
            process.env.BACKEND_JWT_SECRET ?? 'secret', { complete: true }).payload as JwtPayload;
          if (!roles.includes(payload.role)) {
            throw new ForbiddenError('No access to this resource1');
          }
        } catch (e: any) {
          throw new ForbiddenError('Bad token');
        }
      }

      return true;
    },
    currentUserChecker: async (action: Action) => {
      if (action.request.headers.authorization !== undefined) {
        try {
          const payload = jwt.verify(action.request.headers.authorization.split(' ')[1],
            process.env.BACKEND_JWT_SECRET ?? 'secret', { complete: true }).payload as JwtPayload;
          const user = await UserModel.findById(payload.id).exec();

          if (user !== undefined) {
            return user;
          }

          throw new ForbiddenError('User not found or bad token');
        } catch (e: any) {
          throw new ForbiddenError('Bad token');
        }
      }

      throw new ForbiddenError('Bad token');
    }
  });
  app.listen(port, () => logger.info(`Running on port ${port}`));
}

start().catch(err => logger.error(err));
