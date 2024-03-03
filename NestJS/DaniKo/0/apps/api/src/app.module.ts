import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WhatsAppModule } from './whatsapp/whatsapp.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL')
      }),
      inject: [ConfigService],
    }),
    WhatsAppModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dict')
    }),
  ],
})
export class AppModule {}
