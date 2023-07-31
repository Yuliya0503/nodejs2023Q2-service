import { IArtist } from '../../../models/interfaces';
import { ApiProperty } from '@nestjs/swagger';
export class Artist implements IArtist {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  grammy: boolean;
}
