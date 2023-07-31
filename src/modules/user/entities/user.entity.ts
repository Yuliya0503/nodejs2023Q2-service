import { IUser } from '../../../models/interfaces';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User implements IUser {
  @ApiProperty()
  id: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;
  @ApiPropertyOptional()
  version: number;
  @ApiPropertyOptional()
  createdAt: number;
  @ApiPropertyOptional()
  updatedAt: number;
}
