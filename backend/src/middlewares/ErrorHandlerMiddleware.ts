import { Response } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { logger } from '../utils/logger';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error (error: any, request: any, response: Response, next: (err?: any) => any): void {
    logger.error('AuthError:', error.message);
    next();
  }
}
