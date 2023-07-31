import { ApiProperty } from '@nestjs/swagger';
import { IFavorites } from '../../../models/interfaces';
export class Favorites implements IFavorites {
  @ApiProperty()
  artists: string[];
  @ApiProperty()
  albums: string[];
  @ApiProperty()
  tracks: string[];
}
