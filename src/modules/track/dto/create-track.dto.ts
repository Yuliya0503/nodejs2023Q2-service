import {
  IsNotEmpty,
  IsDefined,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'The Show Must Go On',
    description: 'This is a required property',
  })
  name: string;

  @IsDefined()
  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    example: 'ddf19243-632d-4638-9ad9-bacf30d82041',
    description: 'This is a optional property',
  })
  artistId: string | null;

  @IsDefined()
  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    example: 'ddf19243-632d-4638-9ad9-bacf30d82041',
    description: 'This is a optional property',
  })
  albumId: string | null;

  @IsNotEmpty()
  @IsDefined()
  @IsNumber()
  @ApiProperty({
    type: 'number',
    example: 355,
    description: 'This is a required property',
  })
  duration: number;
}
