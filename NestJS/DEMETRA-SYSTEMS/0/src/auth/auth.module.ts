import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BULL_NAME_REGISTER } from './consumer/auth.env';
import { AuthQueue } from './consumer/auth.consumer';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: BULL_NAME_REGISTER
    })
  ],
  providers: [AuthService, AuthQueue],
  controllers: [AuthController]
})
export class AuthModule {}
