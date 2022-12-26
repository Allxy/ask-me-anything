import { Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import logger from '../utils/logger';
import { BAD_TOKEN, UNAUTHORIZED_ERR_CODE } from '../utils/constants';

@Middleware({ type: 'after', priority: 1 })
export class AuthErrorHandler implements ExpressErrorMiddlewareInterface {
  error (error: any, request: any, response: Response, next: (err?: any) => any): void {
    if (error instanceof JsonWebTokenError) {
      logger.error(`${error.stack ?? ''}`);
      response.status(UNAUTHORIZED_ERR_CODE).send({ message: BAD_TOKEN });
      return;
    }
    next(error);
  }
}
