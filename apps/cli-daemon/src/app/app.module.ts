import { Global, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneratorsModule } from './generators/generators.module';
import { SessionService } from './session/session.service';
import { WorkspaceModule } from './workspace/workspace.module';

@Global()
@Module({
  imports: [WorkspaceModule, GeneratorsModule],
  controllers: [AppController],
  providers: [AppService, SessionService],
  exports: [SessionService],
})
export class AppModule {}
