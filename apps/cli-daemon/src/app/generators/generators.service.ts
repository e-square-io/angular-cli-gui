import { spawnSync, SpawnSyncOptionsWithBufferEncoding } from 'child_process';
import { resolve as pathResolve } from 'path';

import { Injectable, Logger } from '@nestjs/common';

import { GENERATE_COMMAND } from '../ng-commands';
import { SessionService } from '../session/session.service';

import { ExecResult } from './dto';
import { GeneratorDefinition, Schema } from './generators.interface';
import {
  convertKeyToArgument,
  formatJsonToJs,
  getGeneratorsDefinition,
} from './utils';

@Injectable()
export class GeneratorsService {
  private readonly logger = new Logger(GeneratorsService.name);

  constructor(private readonly sessionService: SessionService) {}

  execSync(params: Record<string, any>, ng = GENERATE_COMMAND): ExecResult {
    const args = this.getArgsFromParams(params);
    const options: SpawnSyncOptionsWithBufferEncoding = {
      cwd: pathResolve(this.sessionService.cwd),
      env: process.env,
      shell: true,
    };
    const command = [ng].concat(args || []).join(' ');
    this.logger.log(`Running ${command} for ${options.cwd}`);
    const res = spawnSync(command, options);

    return new ExecResult(res);
  }

  getAllGenerators(): GeneratorDefinition[] {
    return getGeneratorsDefinition(
      pathResolve(
        this.sessionService.cwd,
        'node_modules/@schematics/angular/collection.json'
      )
    );
  }

  getSchema(schemaName: string): Schema {
    const schemaPath = pathResolve(
      this.sessionService.cwd,
      `node_modules/@schematics/angular/${schemaName}/schema.json`
    );
    return formatJsonToJs<Schema>(schemaPath);
  }

  private getArgsFromParams(params: Record<string, any>): string[] {
    return Object.entries(params).map(([key, value]) => {
      const convertedKey = convertKeyToArgument(key);
      return `${convertedKey}=${value}`;
    });
  }
}
