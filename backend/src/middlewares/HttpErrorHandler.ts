import { Response } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import logger from '../utils/logger';

@Middleware({ type: 'after', priority: 10 })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  error (error: any, request: any, response: Response, next: (err?: any) => any): void {
    if (error instanceof HttpError) {
      logger.error(`${error.name} [${error.httpCode}] ${error.message} - ${error.stack ?? ''}`);
      response.status(error.httpCode).send({ message: error.message });
      return;
    }
    next(error);
  }
}
