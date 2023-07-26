import { IAlbum } from '../../../models/interfaces';
export class Album implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
