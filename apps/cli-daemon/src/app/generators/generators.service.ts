import { spawnSync, SpawnSyncOptionsWithBufferEncoding } from 'child_process';
import { resolve as pathResolve } from 'path';

import { Injectable } from '@nestjs/common';

import { GENERATE_COMMAND } from '../ng-commands';
import { SessionService } from '../session/session.service';

import { ExecResult } from './dto';

@Injectable()
export class GeneratorsService {
  constructor(private readonly sessionService: SessionService) {}

  execSync(args: string[] = [], ng = GENERATE_COMMAND): ExecResult {
    const options: SpawnSyncOptionsWithBufferEncoding = {
      cwd: pathResolve(this.sessionService.cwd),
      env: process.env,
      shell: true,
    };
    const command = [ng].concat(args || []).join(' ');
    const res = spawnSync(command, options);

    return new ExecResult(res);
  }
}
