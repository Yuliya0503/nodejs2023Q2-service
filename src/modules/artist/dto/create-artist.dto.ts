import { IsString, IsBoolean, IsDefined, IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
