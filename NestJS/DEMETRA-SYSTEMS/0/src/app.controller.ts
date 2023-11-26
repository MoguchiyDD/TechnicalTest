import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Registers DATA from The Proxy Server and receives the corresponding IP Address
   * @returns { "ip": "45.196.48.9" }
   */
  @Get()
  axiosByIP(): Promise<{ ip: string }> {
    return this.appService.axiosByIP();
  }
}
