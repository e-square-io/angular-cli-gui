import {
  ChildProcessWithoutNullStreams,
  execSync,
  spawn,
} from 'node:child_process';
import { resolve as pathResolve } from 'node:path';
import process from 'node:process';

import { Task, TaskStatus } from '@angular-cli-gui/shared/data';
import {
  Global,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { SessionService } from '../session/session.service';

import { ChildProcesses } from './child-processes';
import { spawnedProcessCommandLine } from './utils';

const NG = 'npx ng';

@Global()
@Injectable()
export class ExecutorsService {
  private readonly logger = new Logger(ExecutorsService.name);
  private childProcesses = new ChildProcesses();

  constructor(private readonly sessionService: SessionService) {
    process.on('SIGINT', () => this.destroy());
    process.on('SIGTERM', () => this.destroy());
  }

  async execAsync(args: string[]): Promise<number> {
    try {
      const childProcess = await this.childProcessSpawn(args);
      this.childProcesses.add(childProcess);

      return childProcess.pid as number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      this.logger.error(err.message);
      throw new InternalServerErrorException(err.message);
    }
  }

  readTaskStatus(pid: number): TaskStatus {
    const childProcess = this.childProcesses.get(pid);

    if (!childProcess) {
      throw new NotFoundException(`Process with pid: ${pid} was not found`);
    }

    return childProcess.status;
  }

  killTask(pid: number): void {
    const childProcess = this.childProcesses.get(pid);

    if (!childProcess) {
      throw new NotFoundException(`Process with pid: ${pid} was not found`);
    }

    this.kill(pid);
  }

  readAllTasks(): Task[] {
    const tasks: Task[] = [];

    for (const [pid, childProcess] of this.childProcesses.entries()) {
      const { isRunning, exitCode } = childProcess.status;
      const commandLine = spawnedProcessCommandLine(
        childProcess.spawnedProcess
      );
      tasks.push({ pid, isRunning, exitCode, commandLine });
    }

    return tasks;
  }

  private destroy(): void {
    this.logger.log('Application destroy hook');
  }

  private childProcessSpawn(
    args: string[]
  ): Promise<ChildProcessWithoutNullStreams> {
    return new Promise((resolve, reject) => {
      const childProcess = spawn(NG, args, {
        cwd: pathResolve(this.sessionService.cwd),
        env: process.env,
        shell: true,
      });

      childProcess.on('error', (err) => reject(err));

      if (childProcess.pid) {
        resolve(childProcess);
      }
    });
  }

  private kill(pid: number): void {
    switch (process.platform) {
      case 'win32':
        execSync(`taskkill /pid ${pid} /T /F`);
        break;
      case 'darwin':
        throw new Error('Not yet implemented');
        break;
      default:
        throw new Error('Not yet implemented');
    }
  }
}
