import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsDefined, IsString } from 'class-validator';
import { IUpdatePasswordDto } from '../../../models/interfaces_Dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements IUpdatePasswordDto
{
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'password',
    description: 'This is a required property',
  })
  oldPassword: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'NewPassword',
    description: 'This is a required property',
  })
  newPassword: string;
}
