import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneratorsModule } from './generators/generators.module';
import { WorkspaceSettingsModule } from './workspace-settings/workspace-settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/cli-daemon/.dev.env',
    }),
    WorkspaceSettingsModule,
    GeneratorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
