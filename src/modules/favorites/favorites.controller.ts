import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnprocessableEntityResponse,
  ApiParam,
  ApiNoContentResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites movies, tracks and books',
  })
  @ApiOkResponse({ description: 'Successful operation' })
  getFaforites() {
    return this.favoritesService.getFaforites();
  }

  @Post('track/:id')
  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. TrackId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Track with id does not exist.',
  })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'id',
  })
  addTrackToFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addTrackToFavorite(id);
  }

  @Delete('track/:id')
  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. TrackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeTrackFromFavorite(id);
  }

  @Post('album/:id')
  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Album with id does not exist.',
  })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'id',
  })
  addAlbumToFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addAlbumToFavorite(id);
  }

  @Delete('album/:id')
  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found.' })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeAlbumFromFavorite(id);
  }

  @Post('artist/:id')
  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. ArtistId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Artist with id does not exist.',
  })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'id',
  })
  addArtistToFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addArtistToFavorite(id);
  }

  @Delete('artist/:id')
  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. ArtistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found.' })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeArtistFromFavorite(id);
  }
}
