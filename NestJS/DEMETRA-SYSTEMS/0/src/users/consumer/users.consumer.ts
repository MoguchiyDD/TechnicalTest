import { Logger } from "@nestjs/common";
import { Process, Processor } from "@nestjs/bull";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEmployee } from "src/entity/users.entity";
import { Repository } from "typeorm";
import { BULL_NAME_PROCESS, BULL_NAME_REGISTER } from "./users.env";
import { Job } from 'bull';

@Processor(BULL_NAME_REGISTER)
export class UsersQueue {
  constructor(@InjectRepository(UsersEmployee) private usersDB: Repository<UsersEmployee>) {}

  private readonly logger = new Logger(UsersQueue.name);
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

    await this.usersDB.update(
      job.data["user"].id,
      {
        status: newStatusUser
      }
    );
    this.logger.warn(
      `The status of the user ${ jobUser.name } has changed to ${ newStatusUser }`
    );
  }
}
