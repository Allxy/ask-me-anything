import { IsArray, IsNumber, IsPositive } from 'class-validator';

export class UserQueryParams {
  @IsPositive()
    limit: number | undefined;

  @IsPositive()
    page: number | undefined;

  @IsArray()
  @IsNumber(undefined, { each: true })
    ids: number[] | undefined;
}
