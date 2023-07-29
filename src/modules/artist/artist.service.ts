import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 } from 'uuid';
import { mockArtists } from 'src/db/db';
import { valodatorId } from 'src/helpers/validator';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

/**export interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
} */
@Injectable()
export class ArtistService {
  public create({ name, grammy }: CreateArtistDto) {
    const newArtist = {
      id: v4(),
      name,
      grammy,
    };

    if (!name) {
      throw new HttpException('Name are required', HttpStatus.BAD_REQUEST);
    }

    if (typeof name !== 'string' || typeof grammy !== 'boolean') {
      throw new HttpException(
        'Name and grammy are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    mockArtists.push(newArtist);
    return newArtist;
  }

  getArtists() {
    return mockArtists;
  }

  getAtrist(id: string) {
    valodatorId(id);
    const artist = mockArtists.find((artist) => {
      return artist.id === id;
    });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  update(id: string, { name, grammy }: UpdateArtistDto): Artist {
    valodatorId(id);
    const artist = mockArtists.find((artist) => {
      return artist.id === id;
    });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    if (!name) {
      throw new HttpException('Name are required', HttpStatus.BAD_REQUEST);
    }

    if (typeof name !== 'string' || typeof grammy !== 'boolean') {
      throw new HttpException(
        'Name and grammy are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    artist.name = name;
    artist.grammy = grammy;
    return artist;
  }

  remove(id: string) {
    valodatorId(id);
    const artistIdInd = mockArtists.findIndex((artist) => {
      return artist.id === id;
    });
    if (artistIdInd === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    mockArtists.splice(artistIdInd, 1);
  }
}
