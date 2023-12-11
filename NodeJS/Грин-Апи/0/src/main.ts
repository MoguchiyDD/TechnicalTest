import express from 'express';
import { Express, Request, Response } from 'express';
import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'path';

// Find KEY && CERTIFICATE
const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const localhostKey: string = path.join(__dirname, '..', 'OpenSSL', 'key.pem');
const localhostCert: string = path.join(__dirname, '..', 'OpenSSL', 'cert.pem');

// Express REQUEST && RESPONSE
const app: Express = express();
const port: Number = 443;

app.post('/:num', (req: Request, res: Response): void => {
  res.send(`${req.params.num}`);
});

// HTTPS Server
const server = https.createServer({
  key: fs.readFileSync(localhostKey, 'utf8'),
  cert: fs.readFileSync(localhostCert, 'utf8')
}, app);

await server.listen(443);
console.info(`Server running at https://localhost:${port}`);
