import { validate } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

export const valodatorId = (id: string) => {
  if (!validate(id)) {
    throw new HttpException(
      'Bad request. userId is invalid (not uuid)',
      HttpStatus.BAD_REQUEST,
    );
  }
};
