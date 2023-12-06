import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { WhatsApp } from './whatsapp.model';
import { MongoStore } from 'wwebjs-mongo';
import { Client, RemoteAuth } from 'whatsapp-web.js';

@Injectable()
export class WhatsAppService {
  constructor(
    private config: ConfigService,
    @InjectModel('WhatsApp') private readonly whatsappModel: Model<WhatsApp>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async whastappWeb(): Promise<void> {
    const qrcode = await require('qrcode-terminal');

    mongoose.connect(this.config.get('DATABASE_URL')).then(async () => {
      const store = await new MongoStore({ mongoose: mongoose });
      const clientID = 'CLIENT_' + Math.round(0 - 0.5 + Math.random() * (999 - 1 + 1)).toString() + '_' + Date.now().toString();
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
        const msgBody = message.body.toLowerCase().replace(/^\s+|\s+$/g, '');
        const msgFrom = message.from.split('@c.us')[0];
        switch (msgBody) {
          case '/заново': {
            this.clientNewGreeting(client, message.from, msgFrom);
            break;
          }
          case '/консультация': {
            this.clientGreeting(client, message.from, msgFrom);
            break;
          }
          case '/устно': {
            this.clientAskFullName('устно', client, message.from, msgFrom);
            break;
          }
          case '/перепиской': {
            this.clientAskFullName('перепиской', client, message.from, msgFrom);
            break;
          }
          default: {
            const cacheWhatsAppData = await this.cacheManager.get('cache-whatsapp_' + msgFrom);
            if (cacheWhatsAppData) {
              this.findFullName(cacheWhatsAppData, msgBody, msgFrom);
            }
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

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Re-Welcomes and Re-Accepts The PERSON's Request for CONSULTATION
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async clientNewGreeting(client: Client, msgFrom: string, msgFromSplit: string): Promise<void> {
    const cacheWhatsAppData = await this.getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData != '') {
      this.cacheManager.del("cache-whatsapp_" + msgFromSplit);
      this.clientGreeting(client, msgFrom, msgFromSplit);
    }
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Welcomes and Accepts The PERSON's Request for CONSULTATION
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async clientGreeting(client: Client, msgFrom: string, msgFromSplit: string): Promise<void> {
    const cacheWhatsAppData = await this.getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData === '') {
      const person = {
        phone: '+' + msgFromSplit
      }
      await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);
      await client.sendMessage(
        msgFrom,
        'Здравствуйте, Ваша заявка на консультацию принята! Как Вам удобно переговорить устно (/устно) или перепиской (/перепиской)?'
      )
    } else {
      await client.sendMessage(
        msgFrom,
        'Мы уже начали принимать у Вас заявку насчёт консультации. Но, если Вы желаете начать всё заново, тогда отправьте нам сообщение с текстом /заново'
      )
    }
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Asks The PERSON for your FULLNAME
   * @param {string} type «устно» or «перепиской»
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async clientAskFullName(type: string, client: Client, msgFrom: string, msgFromSplit: string) {
    const cacheWhatsAppData = await this.getCacheWhatsApp(msgFromSplit);
    if ((cacheWhatsAppData != '') && ((type === 'устно') || (type === 'перепиской'))) {
      const person = {
        consultationType: type,
        isFullName: true,
        phone: '+' + msgFromSplit
      }
      await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);
      await client.sendMessage(msgFrom, `Как мне к Вам обращаться?`)
    }
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Asks The PERSON for your FULLNAME
   * @param {unknown} cacheWhatsAppData Cache from PERSON
   * @param {string} msgBody Contents of The PERSON's Message
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async findFullName(cacheWhatsAppData: unknown, msgBody: string, msgFromSplit: string): Promise<void> {
    try {
      const isFullName = cacheWhatsAppData['isFullName'];
      if (isFullName === true) {
        const person = {
          consultationType: cacheWhatsAppData['consultationType'],
          phone: cacheWhatsAppData['phone'],
          fullname: msgBody.charAt(0).toUpperCase() + msgBody.slice(1)
        }
        console.log(cacheWhatsAppData, person);
        await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);
      }
    } catch(error) {}
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Returns The Found CACHE if The CACHE Exists
   * @param {string} msgFrom Group or User chat ID
   * @returns Find CACHE || ''
   */
  async getCacheWhatsApp(msgFrom: string): Promise<unknown|string> {
    const cacheWhatsAppData = await this.cacheManager.get('cache-whatsapp_' + msgFrom);
    if (cacheWhatsAppData) {
      return cacheWhatsAppData
    }

    return ''
  }
}
