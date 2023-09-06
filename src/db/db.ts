import { Album } from '../modules/album/entities/album.entity';
import { Artist } from '../modules/artist/entities/artist.entity';
import { Favorites } from '../modules/favorites/entities/favorites.entity';
import { Track } from '../modules/track/entities/track.entity';
import { User } from '../modules/user/entities/user.entity';

export const mockAlbums: Album[] = [];
export const mockArtists: Artist[] = [];
export const mockFavorites: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};
export const mockTracks: Track[] = [];
export const mockUsers: User[] = [];
