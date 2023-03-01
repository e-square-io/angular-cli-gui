import { IUpdateProjectDto } from '@angular-cli-gui/shared/data';
import { JsonValue } from '@angular-devkit/core';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto implements IUpdateProjectDto {
  @IsString()
  @IsOptional()
  root?: string;

  @IsString()
  @IsOptional()
  prefix?: string;

  @IsString()
  @IsOptional()
  sourceRoot?: string;

  extensions?: Record<string, JsonValue | undefined>;
}
