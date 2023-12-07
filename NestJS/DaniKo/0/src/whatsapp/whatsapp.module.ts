import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { MongooseModule } from '@nestjs/mongoose';
import { WhatsAppSchema } from './models/whatsapp.model';
import { WhatsAppService } from './whatsapp.service';
import { WhatsAppController } from './whatsapp.controller';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      extraProviders: [],
      useFactory: async (configService: ConfigService): Promise<any> => ({
        store: redisStore,
        host: configService.get("REDIS_HOST"),
        port: configService.get("REDIS_PORT")
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'WhatsApp', schema: WhatsAppSchema }])
  ],
  providers: [WhatsAppService],
  controllers: [WhatsAppController]
})
export class WhatsAppModule {}
