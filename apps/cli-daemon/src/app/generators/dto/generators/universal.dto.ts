import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GenerateUniversalDto {
  @IsString({ message: 'project is mandatory' })
  project!: string;

  @IsString()
  @IsOptional()
  appId!: string;

  @IsString()
  @IsOptional()
  main!: string;

  @IsString()
  @IsOptional()
  rootModuleFileName!: string;

  @IsString()
  @IsOptional()
  rootModuleClassName!: string;

  @IsBoolean()
  @IsOptional()
  skipInstall!: boolean;
}
