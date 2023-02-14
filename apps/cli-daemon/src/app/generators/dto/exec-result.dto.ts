import { IExecResult } from '@angular-cli-gui/shared/data';
import { SpawnSyncReturns } from 'child_process';

import { stringToArray } from '../../utils';

export class ExecResult implements IExecResult {
  stdout: string[];
  stderr: string[];
  status: number;

  constructor(res: SpawnSyncReturns<Buffer>) {
    this.stdout = stringToArray(res.stdout?.toString('utf8'));
    this.stderr = stringToArray(res.stderr?.toString('utf8'));
    this.status = res.status || 0;
  }
}
