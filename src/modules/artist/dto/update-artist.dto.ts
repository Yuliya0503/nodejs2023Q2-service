import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiPropertyOptional({
    type: 'string',
    description: 'This is a optional property',
  })
  name?: string;

  @ApiPropertyOptional({
    type: 'boolean',
    description: 'This is a optional property',
  })
  grammy?: boolean;
}
