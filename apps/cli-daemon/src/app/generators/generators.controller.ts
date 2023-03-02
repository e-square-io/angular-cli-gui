import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
} from '@nestjs/common';

import { GENERATE_COMMAND } from '../ng-commands';

import { ExecResult } from './dto';
import { GeneratorDefinition, Schema } from './generators.interface';
import { GeneratorsService } from './generators.service';

@Controller('generators')
export class GeneratorsController {
  private readonly logger = new Logger(GeneratorsController.name);

  constructor(private readonly generatorsService: GeneratorsService) {}

  @Get()
  getAllGenerators(): GeneratorDefinition[] {
    try {
      return this.generatorsService.getAllGenerators();
    } catch (e: any) {
      this.logger.error(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  @Get('generatorSchema/:schemaName')
  getGeneratorSchema(@Param('schemaName') schemaName: string): Schema {
    try {
      return this.generatorsService.getSchema(schemaName);
    } catch (e: any) {
      this.logger.error(e);
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post('generate/:generatorName')
  executeGenerateCommand(
    @Param('generatorName') generatorName: string,
    @Body() params: Record<string, any>
  ): ExecResult {
    try {
      const command = `${GENERATE_COMMAND} ${generatorName}`;
      return this.generatorsService.execSync(params, command);
    } catch (e: any) {
      this.logger.error(e);
      throw new InternalServerErrorException(e.message);
    }
  }
}
