import { IsNotEmpty, IsDefined, IsString } from 'class-validator';
import { ICreateUserDto } from '../../../models/interfaces_Dto';
export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  password: string;
}
