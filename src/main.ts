import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { LogService } from './modules/log/log.service';
import { load } from 'js-yaml';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { serve, setup } from 'swagger-ui-express';

const PORT = Number(process.env.PORT) || 4000;
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    rawBody: true,
    bufferLogs: true,
  });

  configureApp(app);
  await app.listen(PORT);
}

async function configureApp(app: INestApplication): Promise<void> {
  app.useLogger(app.get(LogService));
  app.useGlobalPipes(new ValidationPipe());

  const apiDocsPath: string = join(dirname(__dirname), 'doc', 'api.yaml');
  const doc: unknown = load((await readFile(apiDocsPath, 'utf-8')).toString());

  setupSwaggerUI(app, doc);
}

function setupSwaggerUI(app: INestApplication, doc: unknown): void {
  app.use('/doc', serve, setup(doc));
}

bootstrap();
