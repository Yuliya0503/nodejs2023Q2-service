import {
  IsString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsDefined()
  @IsOptional()
  artistId: string | null; // refers to Artist
}
