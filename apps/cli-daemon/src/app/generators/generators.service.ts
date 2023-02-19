import { spawnSync, SpawnSyncOptionsWithBufferEncoding } from 'child_process';
import { resolve as pathResolve } from 'path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ExecResult } from './dto';

export const NG = 'npx ng g';

@Injectable()
export class GeneratorsService {
  constructor(private readonly configService: ConfigService) {}

  execSync(args?: string[]): ExecResult {
    const options: SpawnSyncOptionsWithBufferEncoding = {
      cwd: pathResolve(this.configService.get<string>('WORKSPACE_ROOT') || '.'),
      env: process.env,
      shell: true,
    };
    const command = [NG].concat(args || []).join(' ');
    const res = spawnSync(command, options);

    return new ExecResult(res);
  }
}
