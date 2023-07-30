import { Controller, Get, Post, Delete, Param, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFaforites() {
    return this.favoritesService.getFaforites();
  }

  @Post('track/:id')
  addTrackToFavorite(@Param('id') id: string) {
    return this.favoritesService.addTrackToFavorite(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavorite(@Param('id') id: string) {
    return this.favoritesService.removeTrackFromFavorite(id);
  }

  @Post('album/:id')
  addAlbumToFavorite(@Param('id') id: string) {
    return this.favoritesService.addAlbumToFavorite(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavorite(@Param('id') id: string) {
    return this.favoritesService.removeAlbumFromFavorite(id);
  }

  @Post('artist/:id')
  addArtistToFavorite(@Param('id') id: string) {
    return this.favoritesService.addArtistToFavorite(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavorite(@Param('id') id: string) {
    return this.favoritesService.removeArtistFromFavorite(id);
  }
}
