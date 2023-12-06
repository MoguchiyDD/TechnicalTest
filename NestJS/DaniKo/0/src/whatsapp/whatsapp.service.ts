import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { WhatsApp } from './whatsapp.model';
import { MongoStore } from 'wwebjs-mongo';
import { Client, RemoteAuth } from 'whatsapp-web.js';

@Injectable()
export class WhatsAppService {
  constructor(
    private config: ConfigService,
    @InjectModel('WhatsApp') private readonly whatsappModel: Model<WhatsApp>
  ) {}

  async whastappWeb(): Promise<void> {
    const qrcode = await require('qrcode-terminal');

    mongoose.connect(this.config.get('DATABASE_URL')).then(async () => {
      const store = await new MongoStore({ mongoose: mongoose });
      const clientID = 'CLIENT_' + Math.round(0 - 0.5 + Math.random() * (999 - 1 + 1)).toString() + "_" + Date.now().toString();
      const client = new Client({
        puppeteer: {
          headless: false
        },
        authStrategy: new RemoteAuth({
          store: store,
          clientId: clientID,
          backupSyncIntervalMs: 300000  // 5 minutes
        })
      });

      client.on('auth_failure', msg => {
        console.error('An attempt to restore an existing session failed: ', msg);
        throw new HttpException(
          `Authentication failure: ${ msg }`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });

      client.on('authenticated', () => {
        console.log('Authentication completed successfully');
      });

      client.on('change_state', (state) => {
        console.log('Connection status has changed: ', state);
      });

      client.on('disconnected', (reason) => {
        console.log('Client disconnected: ', reason);
        client.initialize();
      });

      client.on('message', async message => {
        console.log(message.body, message.from);
        switch (message.body.toLowerCase()) {
          case '/консультация': {
            await client.sendMessage(
              message.from,
              'Здравствуйте, Ваша заявка на консультацию принята! Как Вам удобно переговорить устно (/устно) или перепиской (/переписка)?'
            )
            break;
          }
          case '/устно': {
            break;
          }
          case '/переписка': {
            break;
          }
        }
      });

      client.on('qr', async (qr) => {
        await qrcode.generate(qr, { small: true });
      });

      client.on('ready', () => {
        console.log(`Client with ID ${clientID} is ready`);
      });

      client.on('remote_session_saved', () => {
        console.log('Session saved in DB');
      });

      client.initialize().catch(_ => _);
    });
  }
}
