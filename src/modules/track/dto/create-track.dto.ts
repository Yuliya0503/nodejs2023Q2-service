import {
  IsNotEmpty,
  IsDefined,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsOptional()
  artistId: string | null;

  @IsDefined()
  @IsOptional()
  albumId: string | null;

  @IsNotEmpty()
  @IsDefined()
  @IsNumber()
  duration: number;
}
