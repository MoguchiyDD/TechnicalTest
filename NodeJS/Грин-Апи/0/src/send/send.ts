import dotenv from 'dotenv';
import amqplib, { Channel, Connection } from 'amqplib';


// Environment Variables
dotenv.config();
const envHost: string = process.env.HOST!;
const envRbUser: string = process.env.RABBITMQ_USER!;
const envRbPassword: string = process.env.RABBITMQ_PASSWORD!;
const envRbPort: string = process.env.RABBITMQ_PORT!;
const envRbQueueNameNumber: string = process.env.RABBITMQ_QUEUE_NAME_NUMBER!;

// for RabbitMQ
const sendRabbit: string = `amqp://${envRbUser}:${envRbPassword}@${envHost}:${envRbPort}`;
const exchangeName: string = 'DoubleNumberExchange';
const bindName: string = 'DoubleNumberKey';


/**
 * @copyright Copyright (c) 2023 MoguchiyDD
 * @license MIT License
 * @description Sends a REQUEST to RabbitMQ
 * @param {string} message Message for Sending a REQUEST
 */
export async function connectSendRabbitMQ(message: string) {
  const connection: Connection = await amqplib.connect(sendRabbit);
  console.log('[SEND] Connected to RabbitMQ server');

  const channel: Channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'headers', { durable: true });
  await channel.assertQueue(envRbQueueNameNumber, { durable: true, deadLetterExchange: exchangeName });
  await channel.bindQueue(envRbQueueNameNumber, exchangeName, bindName);
  console.log(`[SEND] Channel name «${envRbQueueNameNumber}»`);

  channel.sendToQueue(envRbQueueNameNumber, Buffer.from(message));
  console.log('[SEND] Sent %s', message);
};
