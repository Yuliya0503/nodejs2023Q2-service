import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { valodatorId } from '../../helpers/validator';
import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

const prisma = new PrismaClient();

@Injectable()
export class FavoritesService {
  async getFaforites() {
    const favs = await prisma.favorites.findFirst();
    if (!favs) return { albums: [], artists: [], tracks: [] };

    const artists = await Promise.all(
      favs.artists.map(async (id) => {
        const artist = await prisma.artist.findFirst({
          where: { id: id },
        });
        return {
          id: artist?.id,
          name: artist?.name,
          grammy: artist?.grammy,
        };
      }),
    );
    const albums = await Promise.all(
      favs.albums.map(async (id) => {
        const album = await prisma.album.findFirst({
          where: { id: id },
        });
        return {
          artistId: album?.artistId,
          id: album?.id,
          name: album?.name,
          year: album?.year,
        };
      }),
    );
    const tracks = await Promise.all(
      favs.tracks.map(async (id) => {
        const track = await prisma.track.findFirst({
          where: { id: id },
        });
        return {
          id: track?.id,
          name: track?.name,
          duration: track?.duration,
          albumId: track?.albumId,
          artistId: track?.artistId,
        };
      }),
    );
    return { artists, albums, tracks };
  }

  async addTrackToFavorite(id: string) {
    valodatorId(id);
    const track = await prisma.track.findFirst({ where: { id: id } });
    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorite = await prisma.favorites.findFirst();
    const favInfo = {
      favoritesId: v4(),
      albums: [],
      artists: [],
      tracks: [],
    };
    if (!favorite) {
      await prisma.favorites.create({ data: favInfo });
    }
    const favId = favorite ? favorite.favoritesId : favInfo.favoritesId;
    const tracks = favorite?.tracks || [];
    tracks.push(track.id);
    return await prisma.favorites.update({
      where: { favoritesId: favId },
      data: { ...favorite, tracks: tracks },
    });
  }

  async removeTrackFromFavorite(id: string) {
    valodatorId(id);
    const fav = await prisma.favorites.findFirst();
    const trackIdInd: number = fav.tracks.indexOf(id);
    if (trackIdInd === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    const tracks = fav?.tracks.filter((track) => track !== id);
    return await prisma.favorites.update({
      where: { favoritesId: fav.favoritesId },
      data: { ...fav, tracks: tracks },
    });
  }

  async addAlbumToFavorite(id: string) {
    valodatorId(id);
    const album = await prisma.album.findFirst({ where: { id: id } });
    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorite = await prisma.favorites.findFirst();
    const favInfo = {
      favoritesId: v4(),
      albums: [],
      artists: [],
      tracks: [],
    };
    if (!favorite) {
      await prisma.favorites.create({ data: favInfo });
    }
    const albums = favorite?.albums || [];
    albums.push(album.id);
    return await prisma.favorites.update({
      where: { favoritesId: favorite.favoritesId },
      data: { ...favorite, albums: albums },
    });
  }

  async removeAlbumFromFavorite(id: string) {
    valodatorId(id);
    const fav = await prisma.favorites.findFirst();
    const albumIdInd: number = fav.albums.indexOf(id);
    if (albumIdInd === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    const albums = fav?.albums.filter((album) => album !== id);
    return await prisma.favorites.update({
      where: { favoritesId: fav.favoritesId },
      data: { ...fav, albums: albums },
    });
  }

  async addArtistToFavorite(id: string) {
    valodatorId(id);
    const artist = await prisma.artist.findFirst({ where: { id: id } });
    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorite = await prisma.favorites.findFirst();
    const favInfo = {
      favoritesId: v4(),
      albums: [],
      artists: [],
      tracks: [],
    };
    if (!favorite) {
      await prisma.favorites.create({ data: favInfo });
    }
    const favId = favorite ? favorite.favoritesId : favInfo.favoritesId;
    const artists = favorite?.artists || [];
    artists.push(artist.id);
    return await prisma.favorites.update({
      where: { favoritesId: favId },
      data: { ...favorite, artists: artists },
    });
  }

  async removeArtistFromFavorite(id: string) {
    valodatorId(id);
    const fav = await prisma.favorites.findFirst();
    const artistIdInd: number = fav.artists.indexOf(id);
    if (artistIdInd === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    const artists = fav?.artists.filter((artist) => artist !== id);
    return await prisma.favorites.update({
      where: { favoritesId: fav.favoritesId },
      data: { ...fav, artists: artists },
    });
  }
}
