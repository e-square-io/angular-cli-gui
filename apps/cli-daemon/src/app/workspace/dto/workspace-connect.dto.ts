import { IsString } from 'class-validator';

export class WorkspaceConnectDto {
  @IsString()
  path!: string;
}
