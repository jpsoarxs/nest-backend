declare const module: any;

import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  ExpressSwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  const swaggerOptions: ExpressSwaggerCustomOptions = {
    customSiteTitle: 'Data Medic API - Documentation',
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const config = new DocumentBuilder()
    .setTitle('DATA MEDIC API')
    .setDescription(
      'API para consulta e analise de dados clinicos e cientificos',
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document, swaggerOptions);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
