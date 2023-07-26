import { IFavorites } from '../../models/interfaces';
export class Favorites implements IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}
