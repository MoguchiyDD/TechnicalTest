import dotenv from 'dotenv';
import amqplib, { Channel, Connection } from 'amqplib';


// Environment Variables
dotenv.config();
const envHost: string = process.env.HOST!;
const envRbUser: string = process.env.RABBITMQ_USER!;
const envRbPassword: string = process.env.RABBITMQ_PASSWORD!;
const envRbPort: string = process.env.RABBITMQ_PORT!;
const envRbQueueNameNumber: string = process.env.RABBITMQ_QUEUE_NAME_NUMBER!;
const envDelay: number = Number(process.env.DELAY)!;

// for RabbitMQ
const receiveRabbit: string = `amqp://${envRbUser}:${envRbPassword}@${envHost}:${envRbPort}`;
const exchangeName: string = 'DoubleNumberExchange';
const bindName: string = 'DoubleNumberKey';

// Artificial DELAY
const sleep: (ms: number) => Promise<unknown> = (ms: number) => new Promise(resolve => global.setTimeout(resolve, ms));

// for HTTPS RESPONSE
export let numbersData: { beforeNumber: number; afterNumber: number; } | {} = {};


/**
 * @copyright Copyright (c) 2023 MoguchiyDD
 * @license MIT License
 * @description Receives The RESPONSE from a RabbitMQ REQUEST
 */
export async function connectReceiveRabbitMQ() {
  numbersData = {};

  const connection: Connection = await amqplib.connect(receiveRabbit);
  console.log('[RECEIVE] Connected to RabbitMQ server');

  const channel: Channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'headers', { durable: true });
  await channel.assertQueue(envRbQueueNameNumber, { durable: true, deadLetterExchange: exchangeName });
  await channel.bindQueue(envRbQueueNameNumber, exchangeName, bindName);
  console.log(`[RECEIVE] Channel name «${envRbQueueNameNumber}»`);

  await channel.consume(envRbQueueNameNumber, async (data: any) => {
    await sleep(envDelay).then(() => {  // 5 seconds
      const anyNumber: number = JSON.parse(data.content).number;
      const doubleNumber: number = anyNumber * 2;
      numbersData = { beforeNumber: anyNumber, afterNumber: doubleNumber };
      console.log('[RECEIVE] Received %s', doubleNumber);
      channel.ack(data);
    });
  });
};
