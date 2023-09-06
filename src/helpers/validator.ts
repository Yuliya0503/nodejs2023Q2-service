import { validate } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ITrack } from '../models/interfaces';

export const valodatorId = (id: string) => {
  if (!validate(id)) {
    throw new HttpException(
      'Bad request. userId is invalid (not uuid)',
      HttpStatus.BAD_REQUEST,
    );
  }
};

export const validatorPassAndLogin = (password: string, login: string) => {
  if (!password || !login) {
    throw new HttpException(
      'Bad request. body does not contain required fields',
      HttpStatus.BAD_REQUEST,
    );
  }
  if (typeof password !== 'string' || typeof login !== 'string') {
    throw new HttpException(
      'Bad request. body does not contain required fields',
      HttpStatus.BAD_REQUEST,
    );
  }
};

export const validatorNameYear = (name: string, year: number) => {
  if (!name || !year) {
    throw new HttpException(
      'Name and year are required',
      HttpStatus.BAD_REQUEST,
    );
  }
  if (typeof name !== 'string' || typeof year !== 'number') {
    throw new HttpException(
      'Name and year are required',
      HttpStatus.BAD_REQUEST,
    );
  }
};

export const validatorArtistId = (artistId: string) => {
  if (artistId && typeof artistId !== 'string') {
    throw new HttpException('ArtistId are required', HttpStatus.BAD_REQUEST);
  }
};

export const validatorTypeForAtrist = (name: string, grammy: boolean) => {
  if (!name) {
    throw new HttpException('Name are required', HttpStatus.BAD_REQUEST);
  }
  if (typeof name !== 'string' || typeof grammy !== 'boolean') {
    throw new HttpException(
      'Name and grammy are required',
      HttpStatus.BAD_REQUEST,
    );
  }
};

export const validatorNameAndDuration = (name: string, duration: number) => {
  if (!name || !duration) {
    throw new HttpException(
      'Name and duration are required',
      HttpStatus.BAD_REQUEST,
    );
  }
};

export const validatorTrack = (track: ITrack) => {
  if (!track) {
    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }
};
