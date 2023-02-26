import { IGenerateComponentArgs } from '@angular-cli-gui/shared/data';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GenerateComponentDto implements IGenerateComponentArgs {
  @IsString({ message: 'Name is mandatory' })
  name!: string;

  @IsOptional()
  @IsBoolean()
  dryRun!: boolean;
}
