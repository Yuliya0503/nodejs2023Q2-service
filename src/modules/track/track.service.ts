import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { mockTracks } from '../../db/db';
import { v4 } from 'uuid';
import { Track } from './entities/track.entity';
import { valodatorId } from '../../helpers/validator';

/**id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number; */
@Injectable()
export class TrackService {
  create({ name, artistId, albumId, duration }: CreateTrackDto): Track {
    const newTrack = {
      id: v4(),
      name,
      artistId,
      albumId,
      duration,
    };

    if (!name || !duration) {
      throw new HttpException(
        'Name and duration are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    mockTracks.push(newTrack);
    return newTrack;
  }

  getTracks() {
    return mockTracks;
  }

  getTrackById(id: string) {
    valodatorId(id);
    const track = mockTracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  update(
    id: string,
    { name, artistId, albumId, duration }: UpdateTrackDto,
  ): Track {
    valodatorId(id);
    const track = mockTracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    if (!name || !duration) {
      throw new HttpException(
        'Name and duration are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (typeof name !== 'string' || typeof duration !== 'number') {
      throw new HttpException(
        'Name and duration are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    track.name = name;
    track.artistId = artistId;
    track.albumId = albumId;
    track.duration = duration;

    return track;
  }

  remove(id: string) {
    valodatorId(id);
    const trackIdInd = mockTracks.findIndex((track) => track.id === id);
    if (trackIdInd === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    mockTracks.splice(trackIdInd, 1);
  }
}
