import { Module } from '@nestjs/common';

import { ComponentController } from './component/component.controller';
import { GeneratorsService } from './generators.service';

@Module({
  controllers: [ComponentController],
  providers: [GeneratorsService],
})
export class GeneratorsModule {}
