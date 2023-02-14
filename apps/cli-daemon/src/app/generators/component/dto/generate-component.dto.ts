import { IGenerateComponentArgs } from '@angular-cli-gui/shared/data';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class GenerateComponentDto implements IGenerateComponentArgs {
  @IsString({ message: 'Name is mandatory' })
  name!: string;

  @IsBoolean()
  @IsOptional()
  dryRun!: boolean;
}
