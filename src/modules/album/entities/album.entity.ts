import { IAlbum } from '../../../models/interfaces';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class Album implements IAlbum {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
  @ApiPropertyOptional()
  artistId: string | null;
}
