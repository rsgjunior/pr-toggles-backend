import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global pipe for class-validator
  app.useGlobalPipes(new ValidationPipe());

  // Shutdown hook for Prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('PR Toggles')
    .setDescription('API para um sistema de feature toggle.')
    .setVersion('1.0')
    .addTag('clientes')
    .addTag('projetos')
    .addTag('funcionalidades')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.SERVER_PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
