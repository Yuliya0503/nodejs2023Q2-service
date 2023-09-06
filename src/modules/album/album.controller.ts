import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  HttpCode,
  Body,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiCreatedResponse({
    description: 'Album is created',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Body does not contain required fields',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all library albums list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: [Album],
  })
  getAlbums() {
    return this.albumService.getalbums();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Gets single album by id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Album was not found.',
  })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'id',
  })
  getAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.getAlbum(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiOkResponse({
    description: 'The album has been updated',
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Album was not found.',
  })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'id',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album from library',
  })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'id',
  })
  @ApiNoContentResponse({
    description: 'Deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. AlbumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'Album was not found.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.remove(id);
  }
}
