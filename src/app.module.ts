import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TrackModule } from './modules/track/track.module';
import { LogModule } from './modules/log/log.module';
import { UserService } from './modules/user/user.service';
import { ArtistService } from './modules/artist/artist.service';
import { AlbumService } from './modules/album/album.service';
import { TrackService } from './modules/track/track.service';
import { FavoritesService } from './modules/favorites/favorites.service';
import { LogService } from './modules/log/log.service';
import { JwtService } from '@nestjs/jwt';
import { LoggerMiddleware } from './modules/middleware/log.middleware';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    ArtistModule,
    FavoritesModule,
    TrackModule,
    LogModule,
  ],
  providers: [
    UserService,
    ArtistService,
    AlbumService,
    TrackService,
    FavoritesService,
    LogService,
    JwtService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
