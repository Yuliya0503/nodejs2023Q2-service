import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './modules/exceptions/http-exception-filter';
import { UserModule } from './modules/user/user.module';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TrackModule } from './modules/track/track.module';
import { LogModule } from './modules/log/log.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './modules/middleware/log.middleware';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    ArtistModule,
    FavoritesModule,
    TrackModule,
    LogModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
