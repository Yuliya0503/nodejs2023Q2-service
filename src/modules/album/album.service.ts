import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 } from 'uuid';
import { mockAlbums, mockFavorites, mockTracks } from 'src/db/db';
import {
  valodatorId,
  validatorNameYear,
  validatorArtistId,
} from 'src/helpers/validator';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  public create({ name, year, artistId }: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: v4(),
      name,
      year,
      artistId,
    };
    validatorNameYear(name, year);
    validatorArtistId(artistId);
    mockAlbums.push(newAlbum);
    return newAlbum;
  }

  public getalbums(): Album[] {
    return mockAlbums;
  }

  public getAlbum(id: string): Album {
    valodatorId(id);
    const album: Album = mockAlbums.find((album) => {
      return album.id === id;
    });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  public update(id: string, { name, year, artistId }: UpdateAlbumDto): Album {
    valodatorId(id);
    validatorNameYear(name, year);
    validatorArtistId(artistId);
    const album: Album = mockAlbums.find((album) => {
      return album.id === id;
    });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    album.name = name;
    album.year = year;
    album.artistId = artistId;
    return album;
  }

  public remove(id: string): void {
    valodatorId(id);
    const albumIdInd: number = mockAlbums.findIndex((album) => {
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
    mockFavorites.albums.forEach((albumId) => {
      if (albumId === id) {
        albumId = null;
      }
    });
  }
}
