import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { BULL_NAME_REGISTER } from './consumer/auth.env';
import { AuthQueue } from './consumer/auth.consumer';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    BullModule.registerQueue({
      name: BULL_NAME_REGISTER
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get("REDIS_HOST"),
        port: configService.get("REDIS_PORT"),
        ttl: 1800  // seconds
      }),
      inject: [ConfigService],
    })
  ],
  providers: [AuthService, AuthQueue],
  controllers: [AuthController]
})
export class AuthModule {}
