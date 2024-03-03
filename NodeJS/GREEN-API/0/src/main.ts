import dotenv from 'dotenv';
import express, { Express, Router, Request, Response, NextFunction } from 'express';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import https from 'node:https';
import path from 'node:path';
import { dirname } from 'path';
import { connectSendRabbitMQ } from './send/send.js';
import { connectReceiveRabbitMQ, numbersData } from './receive/receive.js';

// Environment Variables
dotenv.config();
const envHost: string = process.env.HOST!;
const envServerPort: string = process.env.SERVER_PORT!;
const envDelay: number = Number(process.env.DELAY)!;

// Find KEY && CERTIFICATE
const __dirname: string = dirname(fileURLToPath(import.meta.url));
const localhostKey: string = path.join(__dirname, '..', 'ssl', 'key.pem');
const localhostCert: string = path.join(__dirname, '..', 'ssl', 'cert.pem');

// Artificial DELAY
const sleep: (ms: number) => Promise<unknown> = (ms: number) => new Promise(resolve => global.setTimeout(resolve, ms));

// Express REQUEST && RESPONSE
const app: Express = express();
const router: Router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

router.post('/:anyNumber', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const anyNumber: number = Number(req.params.anyNumber);
    if (isNaN(anyNumber)) {
      throw res.status(400).json({ message: 'ERROR_NOT_NUMBER' });
    };

    await connectSendRabbitMQ(JSON.stringify({ number: anyNumber }));  // SEND
    await connectReceiveRabbitMQ();  // RECEIVE

    await sleep(envDelay).then(() => {  // 5 seconds
      if (Object.keys(numbersData).length === 2) {
        const list: number[] = Object.values(numbersData);
        if (list[0] !== anyNumber) {
          res.redirect(req.get('referer')!);
        }
        return res.status(200).json({ message: 'SUCCESS', beforeNumber: list[0], afterNumber: list[1] });  // RESULT
      } else {
        return res.status(403).json({ message: 'ERROR', beforeNumber: anyNumber, afterNumber: 0 });  // RESULT
      }
    });
  } catch (error) {
    next(error);
  }
});

// HTTPS Server
const server = https.createServer({
  key: fs.readFileSync(localhostKey, 'utf8'),
  cert: fs.readFileSync(localhostCert, 'utf8')
}, app);

server.listen(envServerPort);
console.info(`Server running at https://${envHost}:${envServerPort}`);
