import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { Client, LocalAuth, Buttons, List } from "whatsapp-web.js";

@Injectable()
export class AppService {

  async whastappWeb(): Promise<void> {
    try {
      const qrcode = await require("qrcode-terminal");
      const client = await new Client({
        puppeteer: {
          headless: false
        },
        authStrategy: new LocalAuth()  // {
          // clientId: "YOUR_CLIENT_ID"
        // })
      });

      client.on("qr", async (qr) => {
        await qrcode.generate(qr, { small: true });
      });

      client.on("ready", () => {
        console.log("Client is ready!");
      });

      client.on("message", async message => {
        console.log(message.body, message.from);
        switch (message.body) {
          case "/консультация": {
            await client.sendMessage(
              message.from,
              "Здравствуйте. Ваша заявка на консультацию принята. Как вам удобно переговорить устно или перепиской?"
            )
          }
        };
      });

      await client.initialize();
    } catch (error) {
      throw new HttpException(
        "Ошибка в тестовом браузере, а не в чат боте",
        HttpStatus.BAD_GATEWAY
      );
    }
  }
}
