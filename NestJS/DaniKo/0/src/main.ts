import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 5000 || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => console.log(`Server started on port ${port}`));
}
bootstrap();
