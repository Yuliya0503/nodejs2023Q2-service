import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 } from 'uuid';
import { mockAlbums, mockArtists, mockFavorites, mockTracks } from 'src/db/db';
import { valodatorId, validatorTypeForAtrist } from 'src/helpers/validator';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  public create({ name, grammy }: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: v4(),
      name,
      grammy,
    };
    validatorTypeForAtrist(name, grammy);
    mockArtists.push(newArtist);
    return newArtist;
  }

  public getArtists(): Artist[] {
    return mockArtists;
  }

  public getAtrist(id: string): Artist {
    valodatorId(id);
    const artist: Artist = mockArtists.find((artist) => {
      return artist.id === id;
    });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  public update(id: string, { name, grammy }: UpdateArtistDto): Artist {
    valodatorId(id);
    validatorTypeForAtrist(name, grammy);
    const artist: Artist = mockArtists.find((artist) => {
      return artist.id === id;
    });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    artist.name = name;
    artist.grammy = grammy;
    return artist;
  }

  public remove(id: string): void {
    valodatorId(id);
    const artistIdInd: number = mockArtists.findIndex((artist) => {
      return artist.id === id;
    });
    if (artistIdInd === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    mockArtists.splice(artistIdInd, 1);
    mockTracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
    mockAlbums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
    mockFavorites.artists.forEach((artistId) => {
      if (artistId === id) {
        artistId = null;
      }
    });
  }
}
