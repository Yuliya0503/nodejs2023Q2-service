import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TrackModule } from './modules/track/track.module';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    ArtistModule,
    FavoritesModule,
    TrackModule,
  ],
})
export class AppModule {}
