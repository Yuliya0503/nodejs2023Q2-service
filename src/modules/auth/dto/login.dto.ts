import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDefined,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  @ApiProperty({
    type: 'string',
    example: 'login',
    description: 'This is a required property',
  })
  login: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    type: 'string',
    example: 'password',
    description: 'This is a required property',
  })
  password: string;
}
