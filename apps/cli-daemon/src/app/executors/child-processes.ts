import { ChildProcessWithoutNullStreams } from 'node:child_process';

import { ChildProcess } from './child-process';

export class ChildProcesses extends Map<number, ChildProcess> {
  add(spawnedProcess: ChildProcessWithoutNullStreams): void {
    if (!spawnedProcess.pid) {
      return;
    }

    this.set(spawnedProcess.pid, new ChildProcess(spawnedProcess));
  }
}
