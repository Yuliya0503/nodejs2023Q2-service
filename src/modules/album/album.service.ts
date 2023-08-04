import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 } from 'uuid';
import {
  valodatorId,
  validatorNameYear,
  validatorArtistId,
} from 'src/helpers/validator';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class AlbumService {
  public async create({
    name,
    year,
    artistId,
  }: CreateAlbumDto): Promise<Album> {
    const newAlbum: Album = {
      id: v4(),
      name,
      year,
      artistId,
    };
    validatorNameYear(name, year);
    validatorArtistId(artistId);
    return await prisma.album.create({
      data: newAlbum,
    });
  }

  public async getalbums(): Promise<Album[]> {
    return await prisma.album.findMany();
  }

  public async getAlbum(id: string): Promise<Album> {
    valodatorId(id);
    const album: Album = await prisma.album.findFirst({ where: { id: id } });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  public async update(
    id: string,
    { name, year, artistId }: UpdateAlbumDto,
  ): Promise<Album> {
    valodatorId(id);
    validatorNameYear(name, year);
    validatorArtistId(artistId);
    const album: Album = await prisma.album.findFirst({ where: { id: id } });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return await prisma.album.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        year: year,
        artistId: artistId,
      },
    });
  }

  public async remove(id: string): Promise<Album> {
    valodatorId(id);
    const albumIn = await prisma.album.findFirst({
      where: { id: id },
    });
    if (!albumIn) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    await prisma.track.updateMany({
      where: {
        albumId: {
          equals: id,
        },
      },
      data: {
        albumId: null,
      },
    });

    return await prisma.album.delete({
      where: {
        id: id,
      },
    });
  }
}
