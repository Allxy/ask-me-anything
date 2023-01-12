import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env' });
export const PORT = process.env.PORT ?? 5000;
export const MONGODB_URL = process.env.MONGODB_URL ?? 'mongodb://127.0.0.1:27017/amadatabase';
export const JWT_SECRET = process.env.JWT_SECRET ?? 'jwtsecretama';

export const CONFLICT_ERR_CODE = 409;
export const NOT_FOUND_ERR_CODE = 404;
export const FORBIDDEN_ERR_CODE = 403;
export const UNAUTHORIZED_ERR_CODE = 401;
export const BAD_REQUEST_ERR_CODE = 400;
export const INTERNAL_SERVER_ERR_CODE = 500;

export const USER_NOT_FOUND = 'User not found';
export const QUESTION_NOT_FOUND = 'Question not found';
export const PAGE_NOT_FOUND = "Endpoint doesn't exists";
export const USER_EXISTS = 'User is already exists';
export const AUTH_ERROR = 'Wrong email or password';
export const AUTH_REQUIRED = 'Authorization required';
export const BAD_TOKEN = 'Bad token';
export const BAD_TOKEN_TYPE = 'Bad token type';
export const INTERNAL_ERROR = 'Something went wrong';
export const NO_RIGHTS = 'You have no rights';
