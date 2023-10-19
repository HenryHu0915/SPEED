/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express/adapters/express-adapter';


  const CORS_OPTIONS = {
    origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter());
    app.enableCors(CORS_OPTIONS);

    await app.listen(3001); // You can specify the port you want to listen on

  }
bootstrap();
