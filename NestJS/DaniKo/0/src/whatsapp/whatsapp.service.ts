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
          case '/созвонимся': {
            this._askForPersonalDetails('устно', client, message.from, msgFrom);
            break;
          }
          case '/да-изменить': {
            this._askForPersonalDetails('', client, message.from, msgFrom, 'да');
            break;
          }
          case '/не-изменять': {
            this._askForPersonalDetails('', client, message.from, msgFrom, 'нет');
            break;
          }
          case '/спишемся': {
            this._askForPersonalDetails('переписка', client, message.from, msgFrom);
            break;
          }
          case '/сайт': {
            this._askForDetails(client, message.from, msgFrom, 'сайт');
            break;
          }
          case '/по': {
            this._askForDetails(client, message.from, msgFrom, 'программное-обеспечение');
            break;
          }
          case '/по-мобильное': {
            this._askForDetails(client, message.from, msgFrom, 'мобильное-программное-обеспечение');
            break;
          }
          case '/по-настольное': {
            this._askForDetails(client, message.from, msgFrom, 'настольное-программное-обеспечение');
            break;
          }
          case '/игра': {
            this._askForDetails(client, message.from, msgFrom, 'игра');
            break;
          }
          case '/игра-мобильная': {
            this._askForDetails(client, message.from, msgFrom, 'мобильная-игра');
            break;
          }
          case '/игра-настольная': {
            this._askForDetails(client, message.from, msgFrom, 'настольная-игра');
            break;
          }
          default: {
            this._firstEdits(client, msgBody, message.from, msgFrom);
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
      this.cacheManager.del('cache-whatsapp_' + msgFromSplit);  // Del CACHE
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
        phone: '+' + msgFromSplit,
        cmdCurrent: '/консультация',
        cmdNexts: ['/созвонимся', '/спишемся']
      }
      await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE
      await client.sendMessage(
        msgFrom,
        'Здравствуйте, Ваша заявка на консультацию принята! Как Вам удобно переговорить устно (/созвонимся) или перепиской (/спишемся)?'
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
   * @param {string} type «устно» or «переписка»
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   * @param {string} askPhone «''», «'да'» or «'нет'»
   */
  async _askForPersonalDetails(
    type: string,
    client: Client,
    msgFrom: string,
    msgFromSplit: string,
    askPhone: string = ''
  ): Promise<void> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData != '') {
      switch (askPhone) {
        case '': {
          this.__askPhone(type, client, msgFrom, msgFromSplit);
          break;
        }
        case 'да': {
          if ((cacheWhatsAppData['cmdCurrent'] === '/созвонимся') || (cacheWhatsAppData['cmdCurrent'] === '/спишемся')) {
            const person = {
              consultationType: cacheWhatsAppData['consultationType'],
              isPhone: true,
              cmdCurrent: '/да-изменить',
              cmdNexts: []
            } 
            await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE
            await client.sendMessage(msgFrom, 'Тогда  по какому номеру телефона мне с Вами связаться?');
          } else {
            let cmds = '';
            cacheWhatsAppData['cmdNexts'].forEach(element => { cmds += `, ${element}` });
            await client.sendMessage(msgFrom, `Текущее расположение: ${cacheWhatsAppData['cmdCurrent']}. Доступные на данный момент команды: /заново${cmds}.`);
          }
          break;
        }
        case 'нет': {
          if ((cacheWhatsAppData['cmdCurrent'] === '/созвонимся') || (cacheWhatsAppData['cmdCurrent'] === '/спишемся')) {
            cacheWhatsAppData['cmdCurrent'] = '/не-изменять';
            cacheWhatsAppData['cmdNexts'] = [];
            await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, cacheWhatsAppData);  // Set CACHE
            this.__askFullName(cacheWhatsAppData['consultationType'], client, msgFrom, msgFromSplit);
          } else {
            let cmds = '';
            cacheWhatsAppData['cmdNexts'].forEach(element => { cmds += `, ${element}` });
            await client.sendMessage(msgFrom, `Текущее расположение: ${cacheWhatsAppData['cmdCurrent']}. Доступные на данный момент команды: /заново${cmds}.`);
          }
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
    if (cacheWhatsAppData != '') {
      if (cacheWhatsAppData['cmdCurrent'] === '/консультация') {
        const person = {
          consultationType: type,
          phone: cacheWhatsAppData['phone'],
          cmdCurrent: type === 'переписка' ? '/спишемся' : '/созвонимся',
          cmdNexts: ['/да-изменить', '/не-изменять']
        }
        await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE
        await client.sendMessage(
          msgFrom,
          `Мне связаться с Вами в будущем по ${cacheWhatsAppData['phone']} номеру телефона? (/да-изменить или /не-изменять)`
        );
      } else {
        let cmds = '';
        cacheWhatsAppData['cmdNexts'].forEach(element => { cmds += `, ${element}` });
        await client.sendMessage(msgFrom, `Текущее расположение: ${cacheWhatsAppData['cmdCurrent']}. Доступные на данный момент команды: /заново${cmds}.`);
      }
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
    if (cacheWhatsAppData != '') {
      if ((cacheWhatsAppData['cmdCurrent'] === '/да-изменить') || (cacheWhatsAppData['cmdCurrent'] === '/не-изменять')) {
        const person = {
          consultationType: cacheWhatsAppData['consultationType'],
          phone: cacheWhatsAppData['phone'],
          cmdCurrent: cacheWhatsAppData['cmdCurrent'],
          cmdNexts: [],
          isFullName: true
        }
        await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE
        await client.sendMessage(msgFrom, 'Как мне к Вам обращаться?');
      } else {
        let cmds = '';
        cacheWhatsAppData['cmdNexts'].forEach(element => { cmds += `, ${element}` });
        await client.sendMessage(msgFrom, `Текущее расположение: ${cacheWhatsAppData['cmdCurrent']}. Доступные на данный момент команды: /заново${cmds}.`);
      }
    }
  }

  // --------------------------------------------
  
  
  // -------------- TYPE SOFTWARE ---------------

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Asks The PERSON what TYPE of SOFTWARE is needed
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   * @param {string} typeSoftware «''», «'сайт'», «'программное-обеспечение'», \
   * «'мобильное-программное-обеспечение'», «'настольное-программное-обеспечение'», \
   * «'игра'», «'мобильная-игра'», or «'настольная-игра'»
   */
  async _askForDetails(
    client: Client,
    msgFrom: string,
    msgFromSplit: string,
    typeSoftware: string = ''
  ): Promise<void> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData != '') {
      switch (typeSoftware) {
        case '': {
          this.__greetingTypeSoftware(client, msgFrom, msgFromSplit);
          break;
        }
        case 'сайт': {
          this.__siteSoftware(client, msgFrom, msgFromSplit);
          break;
        }
        case 'программное-обеспечение': {
          this.__softwareSoftware(client, msgFrom, msgFromSplit);
          break;
        }
        case 'мобильное-программное-обеспечение': {
          this.__softwareTypeSoftware(client, msgFrom, msgFromSplit);
          break;
        }
        case 'настольное-программное-обеспечение': {
          this.__softwareTypeSoftware(client, msgFrom, msgFromSplit, true);
          break;
        }
        case 'игра': {
          this.__gameSoftware(client, msgFrom, msgFromSplit);
          break;
        }
        case 'мобильная-игра': {
          this.__gameTypeSoftware(client, msgFrom, msgFromSplit);
          break;
        }
        case 'настольная-игра': {
          this.__gameTypeSoftware(client, msgFrom, msgFromSplit, true);
          break;
        }
      }
    }
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Asks The PERSON what SOFTWARE is Needed
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async __greetingTypeSoftware(
    client: Client,
    msgFrom: string,
    msgFromSplit: string
  ) {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData != '') {
      if (cacheWhatsAppData['cmdCurrent'] === '/полное-имя') {
        await client.sendMessage(
          msgFrom,
          `Приятно познакомиться, ${cacheWhatsAppData['fullname']}! Итак, Вы желаете себе веб-сайт (/сайт), программное приложение (/по) или игру (/игра)`
        );
      } else {
        let cmds = '';
        cacheWhatsAppData['cmdNexts'].forEach(element => { cmds += `, ${element}` });
        await client.sendMessage(msgFrom, `Текущее расположение: ${cacheWhatsAppData['cmdCurrent']}. Доступные на данный момент команды: /заново${cmds}.`);
      }
    }
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Asks The PERSON what WEB SITE is Needed
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async __siteSoftware(
    client: Client,
    msgFrom: string,
    msgFromSplit: string
  ) {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData != '') {
      if (cacheWhatsAppData['cmdCurrent'] === '/полное-имя') {
        const person = {
          consultationType: cacheWhatsAppData['consultationType'],
          phone: cacheWhatsAppData['phone'],
          fullname: cacheWhatsAppData['fullname'],
          service: 'веб-сайт',
          description: cacheWhatsAppData['description'],
          cmdCurrent: '/сайт',
          cmdNexts: [],
          isSite: true
        }
        await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE
        await client.sendMessage(
          msgFrom,
          'На какую тему будет веб-сайт? Например, магазин для книг, игровой комплекс, космодром и так далее.'
        );
      } else {
        let cmds = '';
        cacheWhatsAppData['cmdNexts'].forEach(element => { cmds += `, ${element}` });
        await client.sendMessage(msgFrom, `Текущее расположение: ${cacheWhatsAppData['cmdCurrent']}. Доступные на данный момент команды: /заново${cmds}.`);
      }
    }
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Asks The PERSON what TYPE of SOFTWARE is Needed
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async __softwareSoftware(
    client: Client,
    msgFrom: string,
    msgFromSplit: string
  ) {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData != '') {
      if (cacheWhatsAppData['cmdCurrent'] === '/полное-имя') {
        const person = {
          consultationType: cacheWhatsAppData['consultationType'],
          phone: cacheWhatsAppData['phone'],
          fullname: cacheWhatsAppData['fullname'],
          service: cacheWhatsAppData['service'],
          description: cacheWhatsAppData['description'],
          cmdCurrent: '/программное-обеспечение',
          cmdNexts: ['/по-мобильное', '/по-настольное']
        }
        await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE
        await client.sendMessage(
          msgFrom,
          `${cacheWhatsAppData['fullname']} желает программное обеспечение на мобильном (/по-мобильное) или настольном (/по-настольное) устройстве?`
        );
      } else {
        let cmds = '';
        cacheWhatsAppData['cmdNexts'].forEach(element => { cmds += `, ${element}` });
        await client.sendMessage(msgFrom, `Текущее расположение: ${cacheWhatsAppData['cmdCurrent']}. Доступные на данный момент команды: /заново${cmds}.`);
      }
    }
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Catches The DESCRIPTION for The SOFTWARE
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   * @param {boolean} isDesktopSoftware Is The SOFTWARE DESKTOP or not?
   */
  async __softwareTypeSoftware(
    client: Client,
    msgFrom: string,
    msgFromSplit: string,
    isDesktopSoftware: boolean = false
  ): Promise<void> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData) {
      if (cacheWhatsAppData['cmdCurrent'] === '/программное-обеспечение') {
        const person = {
          consultationType: cacheWhatsAppData['consultationType'],
          phone: cacheWhatsAppData['phone'],
          fullname: cacheWhatsAppData['fullname'],
          service: isDesktopSoftware ? 'настольное программное обеспечение' : 'мобильное программное обеспечение',
          description: cacheWhatsAppData['description'],
          isDesktopSoftware: isDesktopSoftware,
          cmdCurrent: isDesktopSoftware ? '/по-настольное' : '/по-мобильное',
          cmdNexts: [],
          isSoftwareType: true
        }
        await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE
        await client.sendMessage(
          msgFrom,
          'На какую тему будет программное обеспечение? Например, облегчение подсчёта товаров, музыкальная ча-ча-ча, антивирус и так далее.'
        );
      } else {
        let cmds = '';
        cacheWhatsAppData['cmdNexts'].forEach(element => { cmds += `, ${element}` });
        await client.sendMessage(msgFrom, `Текущее расположение: ${cacheWhatsAppData['cmdCurrent']}. Доступные на данный момент команды: /заново${cmds}.`);
      }
    }
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Asks The PERSON what TYPE of GAME is Needed
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async __gameSoftware(
    client: Client,
    msgFrom: string,
    msgFromSplit: string
  ) {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData != '') {
      if (cacheWhatsAppData['cmdCurrent'] === '/полное-имя') {
        const person = {
          consultationType: cacheWhatsAppData['consultationType'],
          phone: cacheWhatsAppData['phone'],
          fullname: cacheWhatsAppData['fullname'],
          service: cacheWhatsAppData['service'],
          description: cacheWhatsAppData['description'],
          cmdCurrent: '/игра',
          cmdNexts: ['/игра-мобильная', '/игра-настольная']
        }
        await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE
        await client.sendMessage(
          msgFrom,
          `${cacheWhatsAppData['fullname']} желает игру на мобильном (/игра-мобильная) или настольном (/игра-настольная) устройстве?`
        );
      } else {
        let cmds = '';
        cacheWhatsAppData['cmdNexts'].forEach(element => { cmds += `, ${element}` });
        await client.sendMessage(msgFrom, `Текущее расположение: ${cacheWhatsAppData['cmdCurrent']}. Доступные на данный момент команды: /заново${cmds}.`);
      }
    }
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Catches The DESCRIPTION for The SOFTWARE
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   * @param {boolean} isDesktopGame Is The GAME DESKTOP or not?
   */
  async __gameTypeSoftware(
    client: Client,
    msgFrom: string,
    msgFromSplit: string,
    isDesktopGame: boolean = false
  ): Promise<void> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData) {
      if (cacheWhatsAppData['cmdCurrent'] === '/игра') {
        const person = {
          consultationType: cacheWhatsAppData['consultationType'],
          phone: cacheWhatsAppData['phone'],
          fullname: cacheWhatsAppData['fullname'],
          service: isDesktopGame ? 'настольная игра' : 'мобильная игра',
          description: cacheWhatsAppData['description'],
          isDesktopGame: isDesktopGame,
          cmdCurrent: isDesktopGame ? '/игра-настольная' : '/игра-мобильная',
          cmdNexts: [],
          isGameType: true
        }
        await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE
        await client.sendMessage(
          msgFrom,
          'На какую тему будет игра? Например, полёт в космос, сражение за свои достоинства, ролевуха с эпичностью и так далее.'
        );
      } else {
        let cmds = '';
        cacheWhatsAppData['cmdNexts'].forEach(element => { cmds += `, ${element}` });
        await client.sendMessage(msgFrom, `Текущее расположение: ${cacheWhatsAppData['cmdCurrent']}. Доступные на данный момент команды: /заново${cmds}.`);
      }
    }
  }

  // --------------------------------------------


  // ------------------ EDITS -------------------

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Catches DATA from The PERSON that is not Included in The BOT’s COMMANDS
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgBody Contents of The PERSON's Message
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async _firstEdits(
    client: Client,
    msgBody: string,
    msgFrom: string,
    msgFromSplit: string
  ): Promise<void> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData) {
      await this.__firstEditPhone(client, msgBody, msgFrom, msgFromSplit);  // isPhone
      const setFullName = await this.__firstEditFullname(msgBody, msgFromSplit);  // isFullName
      if ((setFullName === true) && (cacheWhatsAppData['consultationType'] === 'устно')) {
        this._endConsultationReality('устно', client, msgFrom, msgFromSplit);
        return;
      } else if ((setFullName === true) && (cacheWhatsAppData['consultationType'] === 'переписка')) {
        this._askForDetails(client, msgFrom, msgFromSplit);
      }

      const setSite = await this.__firstEditSite(msgBody, msgFromSplit);  // isSite
      if (setSite === true) {
        this._endConsultationReality('переписка', client, msgFrom, msgFromSplit);
        return;
      }

      const setSoftware = await this.__firstEditSoftware(msgBody, msgFromSplit);  // isSoftwareType
      if (setSoftware === true) {
        this._endConsultationReality('переписка', client, msgFrom, msgFromSplit);
        return;
      }

      const setGame = await this.__firstEditGame(msgBody, msgFromSplit);  // isGameType
      if (setGame === true) {
        this._endConsultationReality('переписка', client, msgFrom, msgFromSplit);
        return;
      }
    }
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Changes The PERSON's PHONE and Asks for your FULL NAME
   * @param {Client} client WhatsApp Web API Client
   * @param {string} msgBody Contents of The PERSON's Message
   * @param {string} msgFrom Group or User chat ID
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   */
  async __firstEditPhone(
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
          phone: '+' + msgBody.match(/\d+/g).join(''),
          cmdCurrent: cacheWhatsAppData['cmdCurrent'],
          cmdNexts: []
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
  async __firstEditFullname(
    msgBody: string,
    msgFromSplit: string
  ): Promise<boolean> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData) {
      const isFullName = cacheWhatsAppData['isFullName'];
      if (isFullName === true) {

        // FULLNAME Proccessing
        let fullname = '';
        const fullnameWithoutSpaces = msgBody.split(' ')
        fullnameWithoutSpaces.forEach(element => { fullname += element.charAt(0).toUpperCase() + element.slice(1) + ' ' });

        const person = {
          consultationType: cacheWhatsAppData['consultationType'],
          phone: cacheWhatsAppData['phone'],
          fullname: fullname.replace(/^\s+|\s+$/g, ''),
          service: '',
          description: '',
          cmdCurrent: '/полное-имя',
          cmdNexts: cacheWhatsAppData['consultationType'] === 'переписка' ? ['/сайт', '/по', '/игра'] : []
        }
        await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE

        return isFullName;
      }
    }

    return false;
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Catches The DESCRIPTION for The SITE
   * @param {string} msgBody Contents of The PERSON's Message
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   * @returns Catches The PERSON's New FULL NAME
   */
  async __firstEditSite(
    msgBody: string,
    msgFromSplit: string
  ): Promise<boolean> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData) {
      const isSite = cacheWhatsAppData['isSite'];
      if (isSite === true) {
        const person = {
          consultationType: cacheWhatsAppData['consultationType'],
          phone: cacheWhatsAppData['phone'],
          fullname: cacheWhatsAppData['fullname'],
          service: cacheWhatsAppData['service'],
          description: msgBody.charAt(0).toUpperCase() + msgBody.slice(1),
          area: 'сайтов'
        }
        await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE

        return isSite;
      }
    }

    return false;
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Catches The DESCRIPTION for The SOFTWARE
   * @param {string} msgBody Contents of The PERSON's Message
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   * @returns Catches The PERSON's New FULL NAME
   */
  async __firstEditSoftware(
    msgBody: string,
    msgFromSplit: string
  ): Promise<boolean> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData) {
      const isSoftwareType = cacheWhatsAppData['isSoftwareType'];
      if (isSoftwareType === true) {
        const person = {
          consultationType: cacheWhatsAppData['consultationType'],
          phone: cacheWhatsAppData['phone'],
          fullname: cacheWhatsAppData['fullname'],
          service: cacheWhatsAppData['service'],
          description: msgBody.charAt(0).toUpperCase() + msgBody.slice(1),
          area: cacheWhatsAppData['isDesktopSoftware'] ? 'настольного программного обеспечения' : 'мобильного программного обеспечения',
        }
        await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE

        return isSoftwareType;
      }
    }

    return false;
  }

  /**
   * @copyright Copyright (c) 2023 MoguchiyDD
   * @license MIT License
   * @description Catches The DESCRIPTION for The GAME
   * @param {string} msgBody Contents of The PERSON's Message
   * @param {string} msgFromSplit Group or User chat ID without «@c.us»
   * @returns Catches The PERSON's New FULL NAME
   */
  async __firstEditGame(
    msgBody: string,
    msgFromSplit: string
  ): Promise<boolean> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData) {
      const isGameType = cacheWhatsAppData['isGameType'];
      if (isGameType === true) {
        const person = {
          consultationType: cacheWhatsAppData['consultationType'],
          phone: cacheWhatsAppData['phone'],
          fullname: cacheWhatsAppData['fullname'],
          service: cacheWhatsAppData['service'],
          description: msgBody.charAt(0).toUpperCase() + msgBody.slice(1),
          area: cacheWhatsAppData['isDesktopGame'] ? 'настольных игр' : 'мобильных игр',
        }
        await this.cacheManager.set('cache-whatsapp_' + msgFromSplit, person);  // Set CACHE

        return isGameType;
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
    type: string,
    client: Client,
    msgFrom: string,
    msgFromSplit: string
  ): Promise<void> {
    const cacheWhatsAppData = await this.__getCacheWhatsApp(msgFromSplit);
    if (cacheWhatsAppData) {
      this.saveOrUpdatePersonDB(cacheWhatsAppData);  // Save DATA
      this.cacheManager.del('cache-whatsapp_' + msgFromSplit);  // Del CACHE

      if (type === 'устно') {
        await client.sendMessage(
          msgFrom,
          `Приятно познакомиться, ${cacheWhatsAppData['fullname']}! Менеджер позвонит Вам в ближайшее время по ${cacheWhatsAppData['phone']} номеру телефона.`
        );
      } else if (type === 'переписка') {
        await client.sendMessage(
          msgFrom,
          `У Вас отпадный вкус, ${cacheWhatsAppData['fullname']}! В ближайшее время разбирающийся в области ${cacheWhatsAppData['area']} позвонит Вам в ближайшее время по ${cacheWhatsAppData['phone']} номеру телефона для уточнения Вашего заказа.`
        );
      }
    }
  };

  // --------------------------------------------

}
