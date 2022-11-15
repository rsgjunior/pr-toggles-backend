import { ValidationPipe } from '@nestjs/common';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api');

  // Global pipe for class-validator
  // whitelist remove unknow properties from the DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Global Filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // Shutdown hook for Prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('PR Toggles')
    .setDescription('API para um sistema de feature toggle.')
    .setVersion('1.0')
    .addTag('usuarios')
    .addTag('clientes')
    .addTag('projetos')
    .addTag('funcionalidades')
    .addTag('estrategias')
    .addTag('regras')
    .addTag('agregados')
    .addTag('chaves')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.SERVER_PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
