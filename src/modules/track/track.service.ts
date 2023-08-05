import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 } from 'uuid';
import { Track } from './entities/track.entity';
import {
  valodatorId,
  validatorNameAndDuration,
  validatorTrack,
} from '../../helpers/validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TrackService {
  public async create({
    name,
    artistId,
    albumId,
    duration,
  }: CreateTrackDto): Promise<Track> {
    const newTrack: Track = {
      id: v4(),
      name,
      artistId,
      albumId,
      duration,
    };
    validatorNameAndDuration(name, duration);
    return await prisma.track.create({ data: newTrack });
  }

  public async getTracks(): Promise<Track[]> {
    return await prisma.track.findMany();
  }

  public async getTrackById(id: string): Promise<Track> {
    valodatorId(id);
    const track: Track = await prisma.track.findFirst({ where: { id: id } });
    validatorTrack(track);
    return track;
  }

  public async update(
    id: string,
    { name, artistId, albumId, duration }: UpdateTrackDto,
  ): Promise<Track> {
    valodatorId(id);
    validatorNameAndDuration(name, duration);
    const track: Track = await prisma.track.findFirst({ where: { id: id } });
    validatorTrack(track);
    return await prisma.track.update({
      where: {
        id: id,
      },
      data: {
        id: id,
        name: name,
        artistId: artistId,
        albumId: albumId,
        duration: duration,
      },
    });
  }

  public async remove(id: string): Promise<Track> {
    valodatorId(id);
    const track: Track = await prisma.track.findFirst({ where: { id: id } });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return await prisma.track.delete({ where: { id: id } });
  }
}
