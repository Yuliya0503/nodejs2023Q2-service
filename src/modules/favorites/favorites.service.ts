import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import {
  mockAlbums,
  mockArtists,
  mockTracks,
  mockFavorites,
} from '../../db/db';
import { valodatorId } from 'src/helpers/validator';

@Injectable()
export class FavoritesService {
  public getFaforites() {
    const artists: Artist[] = [];
    const albums: Album[] = [];
    const tracks: Track[] = [];
    for (const id of mockFavorites.artists) {
      const artist: Artist = mockArtists.find((artist) => artist.id === id);
      if (artist) {
        artists.push(artist);
      }
    }
    for (const id of mockFavorites.albums) {
      const album: Album = mockAlbums.find((album) => {
        return album.id === id;
      });
      if (album) {
        albums.push(album);
      }
    }
    for (const id of mockFavorites.tracks) {
      const track: Track = mockTracks.find((track) => {
        return track.id === id;
      });
      if (track) {
        tracks.push(track);
      }
    }
    return { artists, albums, tracks };
  }

  public addTrackToFavorite(id: string): Track {
    valodatorId(id);
    const track: Track = mockTracks.find((track) => {
      return track.id === id;
    });
    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    mockFavorites.tracks.push(track.id);
    return track;
  }

  public removeTrackFromFavorite(id: string): void {
    valodatorId(id);
    const trackIdInd: number = mockFavorites.tracks.indexOf(id);
    if (trackIdInd === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    mockFavorites.tracks.splice(trackIdInd, 1);
  }

  public addAlbumToFavorite(id: string): Album {
    valodatorId(id);
    const album: Album = mockAlbums.find((album) => {
      return album.id === id;
    });
    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    mockFavorites.albums.push(album.id);
    return album;
  }

  public removeAlbumFromFavorite(id: string): void {
    valodatorId(id);
    const albumIdInd: number = mockFavorites.albums.indexOf(id);
    if (albumIdInd === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    mockFavorites.albums.splice(albumIdInd, 1);
  }

  public addArtistToFavorite(id: string): Artist {
    valodatorId(id);
    const artist: Artist = mockArtists.find((artist) => {
      return artist.id === id;
    });
    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    mockFavorites.artists.push(artist.id);
    return artist;
  }

  public removeArtistFromFavorite(id: string): void {
    valodatorId(id);
    const artistIdInd: number = mockFavorites.artists.indexOf(id);
    if (artistIdInd === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    mockFavorites.artists.splice(artistIdInd, 1);
  }
}
