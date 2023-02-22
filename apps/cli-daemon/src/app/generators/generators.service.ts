import { Injectable } from '@nestjs/common';

import { NgCommandExecutorBase } from '../abstract/ng-command-executor.base';
import { SessionService } from '../session/session.service';

export const NG = 'npx ng g';

@Injectable()
export class GeneratorsService extends NgCommandExecutorBase {
  readonly ng = NG;

  constructor(sessionService: SessionService) {
    super(sessionService);
  }
}
