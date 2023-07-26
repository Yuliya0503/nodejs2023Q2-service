import { IArtist } from '../../../models/interfaces';
export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;
}
