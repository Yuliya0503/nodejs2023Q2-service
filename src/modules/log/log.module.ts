import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
  imports: [
    // Import the ConfigModule first for global configuration
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService], // Make LogService available for other modules
})
export class LogModule {}
