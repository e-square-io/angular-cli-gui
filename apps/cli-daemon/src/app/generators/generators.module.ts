import { Module } from '@nestjs/common';

import { ComponentController } from './component/component.controller';
import { GeneratorsService } from './generators.service';

@Module({
  controllers: [ComponentController],
  providers: [GeneratorsService],
  exports: [GeneratorsService],
})
export class GeneratorsModule {}
