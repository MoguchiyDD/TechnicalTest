import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WhatsAppSchema } from './whatsapp.model';
import { WhatsAppService } from './whatsapp.service';
import { WhatsAppController } from './whatsapp.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'WhatsApp', schema: WhatsAppSchema }])],
  providers: [WhatsAppService],
  controllers: [WhatsAppController]
})
export class WhatsAppModule {}
