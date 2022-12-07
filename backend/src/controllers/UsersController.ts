import { Request, Response } from 'express';
import { JsonController, Get, QueryParam } from 'routing-controllers';
import { logger } from '../utils/logger';
import 'reflect-metadata';

@JsonController('/users')
export class UsersController {
  @Get(':user')
  private getUser (req: Request, res: Response): void {
    logger.info(req.params.msg);
    res.status(200).json({
      message: req.params.msg
    });
  }

  @Get('me')
  private getUserMe (req: Request, res: Response): void {
    logger.info(req.params.msg);
    res.status(200).json({
      message: req.params.msg
    });
  }

  @Get('')
  private getUsers (@QueryParam('limit') limit: number, @QueryParam('page') page: number): Object {
    logger.error(123);
    // res.status(200).json({
    //   message: req.params.msg
    // });
    return { a: 123 };
  }
}
