import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { mockFavorites, mockTracks } from '../../db/db';
import { v4 } from 'uuid';
import { Track } from './entities/track.entity';
import {
  valodatorId,
  validatorNameAndDuration,
  validatorTrack,
} from '../../helpers/validator';

@Injectable()
export class TrackService {
  public create({ name, artistId, albumId, duration }: CreateTrackDto): Track {
    const newTrack: Track = {
      id: v4(),
      name,
      artistId,
      albumId,
      duration,
    };
    validatorNameAndDuration(name, duration);
    mockTracks.push(newTrack);
    return newTrack;
  }

  public getTracks(): Track[] {
    return mockTracks;
  }

  public getTrackById(id: string): Track {
    valodatorId(id);
    const track: Track = mockTracks.find((track) => track.id === id);
    validatorTrack(track);
    return track;
  }

  public update(
    id: string,
    { name, artistId, albumId, duration }: UpdateTrackDto,
  ): Track {
    valodatorId(id);
    validatorNameAndDuration(name, duration);
    const track: Track = mockTracks.find((track) => track.id === id);
    validatorTrack(track);
    track.name = name;
    track.artistId = artistId;
    track.albumId = albumId;
    track.duration = duration;

    return track;
  }

  public remove(id: string): void {
    valodatorId(id);
    const trackIdInd: number = mockTracks.findIndex((track) => track.id === id);
    if (trackIdInd === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    mockTracks.splice(trackIdInd, 1);
    mockFavorites.tracks.forEach((trackId) => {
      if (trackId === id) {
        trackId = null;
      }
    });
  }
}
