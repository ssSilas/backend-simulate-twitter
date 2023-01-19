import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import config from 'helpers/db/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configSwagger = new DocumentBuilder()
    .setTitle("Simulate Twitter")
    .setDescription('Simulate routes Twitter - Feats: Like/Dislike | Tweet | Retweet | Authentication | Authorizarion')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('tweet')
    .addTag('interactions')
    .build()

  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('docs', app, document)

  await app.listen(config().portApp);
  console.log(` \n --- Running port: ${config().portApp} --- \n`)
}
bootstrap();
