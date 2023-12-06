import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WhatsAppSchema } from './whatsapp.model';
import { WhatsAppService } from './whatsapp.service';
import { WhatsAppController } from './whatsapp.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
