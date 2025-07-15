import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist anything that is not in the DTO
      //this will remove any properties that are not defined in the DTO
      whitelist: true,
      transform: true, //this will transform the DTO to the class instance
      transformOptions: {
        enableImplicitConversion: true, //this will allow implicit conversion of types
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
