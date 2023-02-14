import { InternalServerErrorException } from '@nestjs/common';
import { Body, Post, Logger } from '@nestjs/common';
import { Controller } from '@nestjs/common';

import { GenerateComponentDto } from './dto';
import { ExecResult } from '../dto';
import { GeneratorsService } from '../generators.service';

@Controller('generate/component')
export class ComponentController {
  private readonly logger = new Logger(ComponentController.name);

  constructor(private readonly generatorsService: GeneratorsService) {}

  @Post()
  generateComponent(@Body() generateComponentDto: GenerateComponentDto): ExecResult {
    try {
      return this.generatorsService.execSync(this.argsFromDto(generateComponentDto));
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  private argsFromDto(dto: GenerateComponentDto): string[] {
    const args: string[] = ['component', dto.name];
    if (dto.dryRun || dto.dryRun === undefined) {
      args.push('--dry-run');
    }

    return args;
  }
}
