import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 } from 'uuid';
import { mockAlbums, mockTracks } from 'src/db/db';
import { valodatorId } from 'src/helpers/validator';
import { UpdateAlbumDto } from './dto/update-album.dto';

/**export interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
} */

@Injectable()
export class AlbumService {
  create({ name, year, artistId }: CreateAlbumDto) {
    const newAlbum = {
      id: v4(),
      name,
      year,
      artistId,
    };

    if (!name || !year) {
      throw new HttpException(
        'Name and year are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (artistId && typeof artistId !== 'string') {
      throw new HttpException('ArtistId are required', HttpStatus.BAD_REQUEST);
    }

    if (typeof name !== 'string' || typeof year !== 'number') {
      throw new HttpException(
        'Name and year are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    mockAlbums.push(newAlbum);
    return newAlbum;
  }

  getalbums() {
    return mockAlbums;
  }

  getAlbum(id: string) {
    valodatorId(id);
    const album = mockAlbums.find((album) => {
      return album.id === id;
    });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  update(id: string, { name, year, artistId }: UpdateAlbumDto) {
    valodatorId(id);
    const album = mockAlbums.find((album) => {
      return album.id === id;
    });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    if (!name || !year) {
      throw new HttpException(
        'Name and year are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (artistId && typeof artistId !== 'string') {
      throw new HttpException('ArtistId are required', HttpStatus.BAD_REQUEST);
    }

    if (typeof name !== 'string' || typeof year !== 'number') {
      throw new HttpException(
        'Name and year are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    album.name = name;
    album.year = year;
    album.artistId = artistId;

    return album;
  }

  remove(id: string) {
    valodatorId(id);
    const albumIdInd = mockAlbums.findIndex((album) => {
      return album.id === id;
    });
    if (albumIdInd === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    mockAlbums.splice(albumIdInd, 1);

    mockTracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }
}
