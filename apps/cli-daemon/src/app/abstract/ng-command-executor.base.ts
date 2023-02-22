import { spawnSync, SpawnSyncOptionsWithBufferEncoding } from 'child_process';
import { resolve as pathResolve } from 'path';

import { ExecResult } from '../generators/dto';
import { SessionService } from '../session/session.service';

export abstract class NgCommandExecutorBase {
  abstract ng: string;

  protected constructor(protected sessionService: SessionService) {}

  execSync(args?: string[]): ExecResult {
    const options: SpawnSyncOptionsWithBufferEncoding = {
      cwd: pathResolve(this.sessionService.cwd),
      env: process.env,
      shell: true,
    };
    const command = [this.ng].concat(args || []).join(' ');
    const res = spawnSync(command, options);
    return new ExecResult(res);
  }
}
