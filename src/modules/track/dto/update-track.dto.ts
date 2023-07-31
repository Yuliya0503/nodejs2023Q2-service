import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiPropertyOptional({
    type: 'string',
    description: 'This is a optional property',
  })
  name?: string;

  @ApiPropertyOptional({
    type: 'number',
    description: 'This is a optional property',
  })
  duration?: number;

  @ApiPropertyOptional({
    type: 'string',
    description: 'This is a optional property',
  })
  albumId?: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'This is a optional property',
  })
  artistId?: string;
}
