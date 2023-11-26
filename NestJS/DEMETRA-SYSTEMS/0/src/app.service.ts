import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Registers DATA from The Proxy Server and receives the corresponding IP Address
   * @returns { "ip": "45.196.48.9" }
   */
  axiosByIP(): Promise<{ ip: string }> {
    try {
      const HttpsProxyAgent = require("https-proxy-agent");
      let axios = require("axios");

      const httpsAgent = new HttpsProxyAgent({
        host: this.config.get("PROXY_IP"),
        port: this.config.get("PROXY_PORT"),
        auth: this.config.get("PROXY_AUTH")
      });

      axios.create({ httpsAgent });

      const ip = axios({
        method: "get",
        httpsAgent: httpsAgent,
        url: "https://api.ipify.org?format=json"
      }).then(response => response.data).catch(err => err);

      return ip;
    } catch(error) {
      throw new HttpException(
        "ERROR_NET_IP",
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
