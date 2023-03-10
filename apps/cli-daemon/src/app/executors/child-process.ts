import { ChildProcessWithoutNullStreams } from 'node:child_process';

import { TaskStatus } from '@angular-cli-gui/shared/data';
import { Logger } from '@nestjs/common';

import { StringBuffer } from './string-buffer';
import { spawnedProcessCommandLine } from './utils';

const STD_OUT_BUFFER_SIZE = 100;
const STD_ERR_BUFFER_SIZE = 20;

export class ChildProcess {
  private readonly logger = new Logger(
    `Child process "${spawnedProcessCommandLine(this.spawnedProcess)}"`
  );
  private readonly stdOutBuffer = new StringBuffer(STD_OUT_BUFFER_SIZE);
  private readonly stdErrBuffer = new StringBuffer(STD_ERR_BUFFER_SIZE);
  private exitCode?: number | null;

  get status(): TaskStatus {
    return {
      stdOut: this.stdOutBuffer.data,
      stdErr: this.stdErrBuffer.data,
      isRunning: this.exitCode === undefined,
      exitCode: this.exitCode,
    };
  }

  constructor(readonly spawnedProcess: ChildProcessWithoutNullStreams) {
    this.logger.verbose(`Spawned with PID: ${spawnedProcess.pid}`);
    spawnedProcess.stdout.on('data', (data: Buffer) =>
      this.stdOutBuffer.add(data)
    );
    spawnedProcess.stderr.on('data', (data: Buffer) =>
      this.stdErrBuffer.add(data)
    );
    spawnedProcess.on('close', (code) => {
      this.exitCode = code;
      this.logger.verbose(`Terminated with code ${code}`);
    });
  }
}
