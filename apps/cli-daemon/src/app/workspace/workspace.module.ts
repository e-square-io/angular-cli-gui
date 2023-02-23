import { Module } from '@nestjs/common';

import { GeneratorsModule } from '../generators/generators.module';

import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [GeneratorsModule],
  providers: [WorkspaceService],
  controllers: [WorkspaceController],
})
export class WorkspaceModule {}
