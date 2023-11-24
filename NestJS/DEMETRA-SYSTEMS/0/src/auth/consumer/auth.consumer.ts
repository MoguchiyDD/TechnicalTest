import { Process, Processor } from "@nestjs/bull";
import { Job } from 'bull';
import { BULL_NAME_PROCESS, BULL_NAME_REGISTER } from "./auth.env";
import { PrismaService } from "src/prisma/prisma.service";
import { Logger } from "@nestjs/common";

@Processor(BULL_NAME_REGISTER)
export class AuthQueue {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(AuthQueue.name);
  private readonly statusOn = true;
  private readonly statusOff = false;

  @Process(BULL_NAME_PROCESS)
  async updateUserStatus(job: Job<unknown>) {
    const jobMode = job.data["mode"];
    const jobUser = job.data["user"];

    const statusUser = jobUser.status;
    let newStatusUser = this.statusOff;
    if ((jobMode === "up") || (jobMode === "in")) {
      newStatusUser = this.statusOn;
    } else if (jobMode === "out") {
      newStatusUser = this.statusOff;
    }

    if (statusUser === newStatusUser) {
      throw this.logger.warn(
        `The status of the user ${ jobUser.name } has not changed`
      );
    }

    await this.prisma.user.update({
      where: {
        email: job.data["user"].email
      },
      data: {
        updatedAt: new Date(),
        status: newStatusUser
      }
    });
    this.logger.warn(
      `The status of the user ${ jobUser.name } has changed to ${ newStatusUser }`
    );
  }
}
