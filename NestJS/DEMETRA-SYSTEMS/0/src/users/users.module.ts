import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { BULL_NAME_REGISTER } from './consumer/users.env';
import { UsersQueue } from './consumer/users.consumer';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { UsersEmployee } from 'src/entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    }),
    TypeOrmModule.forFeature([UsersEmployee])
  ],
  providers: [UsersService, UsersQueue],
  controllers: [UsersController]
})
export class UsersModule {}
