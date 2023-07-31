import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    type: 'string',
    example: 'Innuendo',
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'number',
    example: 1991,
    description: 'This is a required property',
  })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiPropertyOptional({
    type: 'string',
    format: 'uuid',
    nullable: true,
    example: 'b98ed92f-c317-4aa3-8401-5172e2d4de19',
    description: 'This is a optional property',
  })
  @IsOptional()
  artistId: string | null; // refers to Artist
}
