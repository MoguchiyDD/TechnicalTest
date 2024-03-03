import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { typeormConfig } from './configs/typeorm.config';
import { UsersEmployee } from './entity/users.entity';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        redis: {
          host: config.get("REDIS_HOST"),
          port: config.get("REDIS_PORT")
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([UsersEmployee]),
    UsersModule
  ],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}
