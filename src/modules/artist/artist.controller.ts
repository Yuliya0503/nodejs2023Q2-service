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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist',
  })
  @ApiCreatedResponse({
    description: 'Successful operation',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Body does not contain required fields',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all artists',
    description: 'Get all artists',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: [Artist],
  })
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Get single artist by id',
  })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'id',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. ArtistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found.' })
  getArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.getAtrist(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update artist information by UUID',
  })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'id',
  })
  @ApiOkResponse({
    description: 'The artist has been updated.',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. ArtistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found.' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist from library',
  })
  @ApiParam({
    type: 'string',
    format: 'uuid',
    name: 'id',
  })
  @ApiNoContentResponse({ description: ' Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. ArtistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.remove(id);
  }
}
