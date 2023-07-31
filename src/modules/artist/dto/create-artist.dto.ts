import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsDefined, IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Freddie Mercury',
    description: 'This is a required property',
  })
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: 'boolean',
    example: true,
    description: 'This is a required property',
  })
  grammy: boolean;
}
