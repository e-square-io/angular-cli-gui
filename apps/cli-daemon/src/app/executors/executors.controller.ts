import {
  Command,
  KillDto,
  RunTaskResponse,
  Task,
  TaskStatus,
} from '@angular-cli-gui/shared/data';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
} from '@nestjs/common';

import { ExecutorsService } from './executors.service';

@Controller('executors')
export class ExecutorsController {
  constructor(private readonly executorsService: ExecutorsService) {}

  @Post()
  async run(@Body() commandDto: Command): Promise<RunTaskResponse> {
    const command: string = commandDto.command;
    const args = this.readArgsFromDto(commandDto);
    const pid = await this.executorsService.execAsync([command].concat(args));

    return { pid };
  }

  @Get('status')
  getTaskStatus(@Query('pid') pid: number): TaskStatus {
    if (!pid) {
      throw new BadRequestException('PID was not provided');
    }

    return this.executorsService.readTaskStatus(pid);
  }

  @Delete()
  killTask(@Body() killDto: KillDto): void {
    this.executorsService.killTask(killDto.pid);
  }

  private readArgsFromDto(commandDto: Command): string[] {
    const args: string[] = [];

    for (const key in commandDto) {
      if (key === 'command') {
        continue;
      }

      args.push(`--${key}`, commandDto[key]?.toString());
    }

    return args;
  }

  @Get()
  readAllTasks(): Task[] {
    return this.executorsService.readAllTasks();
  }
}
