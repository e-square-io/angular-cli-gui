import { spawnSync, SpawnSyncOptionsWithBufferEncoding } from 'child_process';
import { resolve as pathResolve } from 'path';

import { Injectable } from '@nestjs/common';

import { SessionService } from '../session/session.service';

import { ExecResult } from './dto';

export const NG = 'npx ng g';

@Injectable()
export class GeneratorsService {
  constructor(private readonly sessionService: SessionService) {}

  execSync(args?: string[]): ExecResult {
    const options: SpawnSyncOptionsWithBufferEncoding = {
      cwd: pathResolve(this.sessionService.cwd),
      env: process.env,
      shell: true,
    };
    const command = [NG].concat(args || []).join(' ');
    const res = spawnSync(command, options);

    return new ExecResult(res);
  }
}
