import { Module } from '@nestjs/common';

import { WorkspaceController } from './workspace-settings.controller';
import { WorkspaceSettingsService } from './workspace-settings.service';

@Module({
  providers: [WorkspaceSettingsService],
  controllers: [WorkspaceController],
})
export class WorkspaceSettingsModule {}
