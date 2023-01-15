import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import logger from '../utils/logger';

@Middleware({ type: 'before', priority: 1000 })
export class LoggerMiddleware implements ExpressMiddlewareInterface {
  use (request: Request, response: Response, next: (err?: any) => any): void {
    logger.log(`Request [${request.method}] ${request.url}`);
    next();
  }
}
