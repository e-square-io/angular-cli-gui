import { Module } from '@nestjs/common';

import { WorkspaceManagerController } from './workspace-manager.controller';
import { WorkspaceManagerService } from './workspace-manager.service';

@Module({
  controllers: [WorkspaceManagerController],
  providers: [WorkspaceManagerService],
})
export class WorkspaceManagerModule {}
