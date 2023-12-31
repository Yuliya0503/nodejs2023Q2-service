import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 } from 'uuid';
import { valodatorId, validatorTypeForAtrist } from '../../helpers/validator';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ArtistService {
  async create({ name, grammy }: CreateArtistDto): Promise<Artist> {
    const newArtist: Artist = {
      id: v4(),
      name,
      grammy,
    };
    validatorTypeForAtrist(name, grammy);
    return await prisma.artist.create({ data: newArtist });
  }

  async getArtists(): Promise<Artist[]> {
    return await prisma.artist.findMany();
  }

  async getAtrist(id: string): Promise<Artist> {
    valodatorId(id);
    const artist: Artist = await prisma.artist.findFirst({ where: { id: id } });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async update(id: string, { name, grammy }: UpdateArtistDto): Promise<Artist> {
    valodatorId(id);
    validatorTypeForAtrist(name, grammy);
    const artist: Artist = await prisma.artist.findFirst({ where: { id: id } });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return await prisma.artist.update({
      where: {
        id: id,
      },
      data: {
        id: id,
        name: name,
        grammy: grammy,
      },
    });
  }

  async remove(id: string): Promise<Artist> {
    valodatorId(id);
    const artist: Artist = await prisma.artist.findFirst({
      where: {
        id: id,
      },
    });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    await prisma.track.updateMany({
      where: {
        artistId: {
          equals: id,
        },
      },
      data: {
        artistId: null,
      },
    });
    await prisma.album.updateMany({
      where: {
        artistId: {
          equals: id,
        },
      },
      data: {
        artistId: null,
      },
    });

    return await prisma.artist.delete({
      where: { id: id },
    });
  }
}
