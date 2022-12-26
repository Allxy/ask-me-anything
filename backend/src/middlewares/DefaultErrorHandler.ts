import { Response } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import logger from '../utils/logger';
import { INTERNAL_ERROR, INTERNAL_SERVER_ERR_CODE } from '../utils/constants';

@Middleware({ type: 'after', priority: -1000 })
export class DefaultErrorHandler implements ExpressErrorMiddlewareInterface {
  error (error: Error, request: any, response: Response, next: (err?: any) => any): void {
    logger.error(`${error.name} ${error.message} - ${error.stack ?? ''}`);
    response.status(INTERNAL_SERVER_ERR_CODE).send({ message: INTERNAL_ERROR });
  }
}
