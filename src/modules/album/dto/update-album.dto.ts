import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiPropertyOptional({
    type: 'string',
    description: 'This is a optional property',
  })
  name?: string;

  @ApiPropertyOptional({
    type: 'number',
    description: 'This is a optional property',
  })
  year?: number;

  @ApiPropertyOptional({
    type: 'string',
    description: 'This is a optional property',
  })
  artistId?: string;
}
