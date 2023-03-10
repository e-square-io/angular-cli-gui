import { Global, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExecutorsModule } from './executors/executors.module';
import { GeneratorsModule } from './generators/generators.module';
import { SessionService } from './session/session.service';
import { WorkspaceModule } from './workspace/workspace.module';
import { WorkspaceManagerModule } from './workspace-manager/workspace-manager.module';

@Global()
@Module({
  imports: [
    WorkspaceModule,
    GeneratorsModule,
    WorkspaceManagerModule,
    ExecutorsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SessionService],
  exports: [SessionService],
})
export class AppModule {}
