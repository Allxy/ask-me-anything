import jwt, { JwtPayload } from 'jsonwebtoken';
import { Action, ForbiddenError, UnauthorizedError } from 'routing-controllers';
import { AuthorizationChecker } from 'routing-controllers/types/AuthorizationChecker';
import { IRole } from '../models/UserModel';
import { AUTH_REQUIRED, BAD_TOKEN_TYPE, NO_RIGHTS } from '../utils/constants';

const authorizationChecker: AuthorizationChecker = (action: Action, roles: IRole[]) => {
  const authorization = action.request.headers.authorization as string;

  if (authorization === undefined) {
    throw new UnauthorizedError(AUTH_REQUIRED);
  }
  if (!authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(BAD_TOKEN_TYPE);
  }

  const token = authorization.replace('Bearer ', '');
  const payload = jwt.verify(token, process.env.JWT_SECRET ?? '', { complete: true }).payload as JwtPayload;
  if (!roles.includes(payload.role)) {
    throw new ForbiddenError(NO_RIGHTS);
  }

  action.request.user = payload;
  return true;
};

export default authorizationChecker;
