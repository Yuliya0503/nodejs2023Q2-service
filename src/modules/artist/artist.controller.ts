import {
  Controller,
  Get,
  Post,
  Param,
  // Put,
  Delete,
  HttpCode,
  Body,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtist(@Param('id') id: string) {
    return this.artistService.getAtrist(id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }
}
