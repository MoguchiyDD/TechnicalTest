import { Controller, Get } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';

@Controller()
export class WhatsAppController {
  constructor(private readonly whastappService: WhatsAppService) {}

  @Get()
  async whastappWeb(): Promise<void> {
    return this.whastappService.whastappWeb();
  }
}
