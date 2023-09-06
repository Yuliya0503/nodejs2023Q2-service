import { ITrack } from '../../../models/interfaces';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class Track implements ITrack {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  artistId: string | null;
  @ApiPropertyOptional()
  albumId: string | null;
  @ApiProperty()
  duration: number;
}
