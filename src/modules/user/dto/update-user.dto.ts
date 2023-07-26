import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsDefined, IsString } from 'class-validator';
import { IUpdatePasswordDto } from '../../../models/interfaces_Dto';

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements IUpdatePasswordDto
{
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
