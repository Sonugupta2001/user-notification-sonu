import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VercelRequest, VercelResponse } from '@vercel/node';

let cachedServer;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();
  return app.getHttpAdapter().getInstance();
};

const getServer = async () => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer;
};

export default async (req: VercelRequest, res: VercelResponse) => {
  const server = await getServer();
  server(req, res);
};