import { IsNotEmpty, IsDefined, IsString } from 'class-validator';
import { ICreateUserDto } from '../../../models/interfaces_Dto';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'login',
    description: 'This is a required property',
  })
  login: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'password',
    description: 'This is a required property',
  })
  password: string;
}
