import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { WhatsApp } from './models/whatsapp.model';
import { MongoStore } from 'wwebjs-mongo';
import { Client, RemoteAuth } from 'whatsapp-web.js';

@Injectable()
export class WhatsAppService {
  constructor(
    private config: ConfigService,
    @InjectModel('WhatsApp') private readonly whatsappModel: Model<WhatsApp>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  private readonly logger = new Logger(WhatsAppService.name);


  // ---------------- Get CACHE -----------------

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Returns The Found CACHE if The CACHE Exists
   * @param {string} msgFrom Group or User chat ID
   * @returns Find CACHE || ''
   */
  async __getCacheWhatsApp(msgFrom: string): Promise<unknown|string> {
    const cacheWhatsAppData = await this.cacheManager.get('cache-whatsapp_' + msgFrom);  // Get CACHE
    if (cacheWhatsAppData) {
      return cacheWhatsAppData
    }

    return ''
  }

  // --------------------------------------------
  
  
  // --------------- Job woth DB ----------------

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Saves and Updates DATA to The DB
   * @param {unknown} data The DATA from CACHE
   */
  saveOrUpdatePersonDB(data: unknown) {
    const findWhatsAppPerson = this.whatsappModel.findOne({ phone: data['phone'] }).exec();
    findWhatsAppPerson.then((person) => {
      if (person === null) {  // CREATE
        const newWhatsAppPerson = new this.whatsappModel({
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString(),
          consultation: data['consultationType'],
          phone: data['phone'],
          fullname: data['fullname'],
          service: data['service'],
          description: data['description']
        });
        newWhatsAppPerson.save();

        this.logger.warn('The Database SUCCESSFULLY Saved The New PERSON');
      } else {  // UPDATE
        person.updatedAt = new Date().toUTCString();
        person.consultation = data['consultationType'];
        person.phone = data['phone'];
        person.fullname = data['fullname'];
        person.service = data['service'];
        person.description = data['description'];
        person.save();

        this.logger.warn('The Database SUCCESSFULLY Updated The Old PERSON');
      }
    }).catch((error) => {
      throw this.logger.error(`DatabaseError: ${error}`);
    });
  }

  // --------------------------------------------


  // ----------------- WhatsApp -----------------

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
            this._clientNewGreeting(client, message.from, msgFrom);
            break;
          }
          case '/консультация': {
            this._clientGreeting(client, message.from, msgFrom);
            break;
          }
          case '/устно': {
            this._askForPersonalDetails('устно', client, message.from, msgFrom);
            break;
          }
          case '/да-изменить': {
            this._askForPersonalDetails('устно', client, message.from, msgFrom, 'да');
            break;
          }
          case '/не-изменять': {
            this._askForPersonalDetails('устно', client, message.from, msgFrom, 'нет');
            break;
          }
          case '/перепиской': {
            break;
          }
          default: {
            await this._firstEditPhone(client, msgBody, message.from, msgFrom);  // isPhone
            const setFullName = await this._firstEditFullname(msgBody, msgFrom);  // isFullName
            if (setFullName === true) {
              this._endConsultationReality(client, message.from, msgFrom);
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

  // --------------------------------------------


  // ----------------- GREETING -----------------

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Re-Welcomes and Re-Accepts The PERSON's Request for CONSULTATION
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async _clientNewGreeting(
    client: Client,
    msgFrom: string,
    msgFromSplit: string
  ): Promise<void> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData != '') {
      this.cacheManager.del('cache-whatsapp_' + msgFromSplit);
      this._clientGreeting(client, msgFrom, msgFromSplit);
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
  async _clientGreeting(
    client: Client,
    msgFrom: string,
    msgFromSplit: string
  ): Promise<void> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData === '') {
      const person = {
        phone: '+' + msgFromSplit
      }
      await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE
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

  // --------------------------------------------


  // ------------ PHONE && FULL NAME ------------

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Asks The PERSON for your PHONE and your FULL NAME
   * @param {string} type «устно» or «перепиской»
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   * @param {string} __askPhone «''», «'да'» or «'нет'»
   */
  async _askForPersonalDetails(
    type: string,
    client: Client,
    msgFrom: string,
    msgFromSplit: string,
    __askPhone: string = ''
  ): Promise<void> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if ((cacheWhatsAppData != '') && ((type === 'устно') || (type === 'перепиской'))) {
      switch (__askPhone) {
        case '': {
          this.__askPhone(type, client, msgFrom, msgFromSplit);
          break;
        }
        case 'да': {
          const person = {
            consultationType: cacheWhatsAppData['consultationType'],
            isPhone: true
          }
          await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE
          await client.sendMessage(msgFrom, 'Тогда  по какому номеру телефона мне с Вами связаться?');
          break;
        }
        case 'нет': {
          this.__askFullName(type, client, msgFrom, msgFromSplit);
          break;
        }
      }
    }
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Asks The PERSON for your PHONE
   * @param {string} type «устно» or «перепиской»
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async __askPhone(
    type: string,
    client: Client,
    msgFrom: string,
    msgFromSplit: string
  ) {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if ((cacheWhatsAppData != '') && ((type === 'устно') || (type === 'перепиской'))) {
      const person = {
        consultationType: type,
        phone: cacheWhatsAppData['phone']
      }
      await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE
      await client.sendMessage(
        msgFrom,
        `Мне связаться с Вами в будущем по ${cacheWhatsAppData['phone']} номеру телефона? (/да-изменить или /не-изменять)`
      );
    }
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Asks The PERSON for your FULL NAME
   * @param {string} type «устно» or «перепиской»
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async __askFullName(
    type: string,
    client: Client,
    msgFrom: string,
    msgFromSplit: string
  ) {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if ((cacheWhatsAppData != '') && ((type === 'устно') || (type === 'перепиской'))) {
      const person = {
        consultationType: cacheWhatsAppData['consultationType'],
        isFullName: true,
        phone: cacheWhatsAppData['phone']
      }
      await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE
      await client.sendMessage(msgFrom, 'Как мне к Вам обращаться?');
    }
  }

  // --------------------------------------------


  // ------------------ EDITS -------------------

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Changes The PERSON's PHONE and Asks for your FULL NAME
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgBody Contents of The PERSON's Message
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async _firstEditPhone(
    client: Client,
    msgBody: string,
    msgFrom: string,
    msgFromSplit: string
  ): Promise<void> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData) {
      const isPhone = cacheWhatsAppData['isPhone'];
      if (isPhone === true) {
        const person = {
          consultationType: cacheWhatsAppData['consultationType'],
          phone: '+' + msgBody.match(/\d+/g).join('')
        }
        await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE
        this.__askFullName(cacheWhatsAppData['consultationType'], client, msgFrom, msgFromSplit);
      }
    }
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Sets The PERSON's FULL NAME
   * @param {string} msgBody Contents of The PERSON's Message
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   * @returns Catches The PERSON's New FULL NAME
   */
  async _firstEditFullname(
    msgBody: string,
    msgFromSplit: string
  ): Promise<boolean> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData) {
      const isFullName = cacheWhatsAppData['isFullName'];
      if (isFullName === true) {
        const person = {
          consultationType: cacheWhatsAppData['consultationType'],
          phone: cacheWhatsAppData['phone'],
          fullname: msgBody.charAt(0).toUpperCase() + msgBody.slice(1),
          service: '',
          description: ''
        }
        await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE

        return isFullName;
      }
    }

    return false;
  }

  // --------------------------------------------


  // ------------- END CONSULTATION -------------

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Removes DATA from The CACHE and also Saves The DATA to The DB
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async _endConsultationReality(
    client: Client,
    msgFrom: string,
    msgFromSplit: string
  ): Promise<void> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData) {
      this.saveOrUpdatePersonDB(cacheWhatsAppData);  // Save DATA
      this.cacheManager.del('cache-whatsapp_' + msgFromSplit);  // Del CACHE
      await client.sendMessage(
        msgFrom,
        `Приятно познакомиться, ${cacheWhatsAppData['fullname']}! Менеджер позвонит Вам в ближайшее время по ${cacheWhatsAppData['phone']} номеру телефона.`
      )
    }
  };

  // --------------------------------------------

}
