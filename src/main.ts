import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ConfigurationType } from './core/config/configurationType';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Validation Pipe for input validation
  app.useGlobalPipes(new ValidationPipe({}));

  // Enable Cross-Origin Resource Sharing (CORS)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include cookies in requests
  });

  // Retrieve configuration service with typing https://docs.nestjs.com/techniques/configuration#using-in-the-maints
  const configService =
    app.get<ConfigService<ConfigurationType>>(ConfigService);
  const port = configService.get<number>('apiSettings.PORT', { infer: true });

  if (!port) {
    throw new Error('PORT is not defined in the configuration.');
  }

  await app.listen(port);
  console.log(`Server has been started on: http://localhost:${port}`);
}

bootstrap();
