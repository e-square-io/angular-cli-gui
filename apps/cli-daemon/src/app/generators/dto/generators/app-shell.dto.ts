import { IsOptional, IsString } from 'class-validator';

export class GenerateAppShellDto {
  @IsString({ message: 'project is mandatory' })
  project!: string;

  @IsString()
  @IsOptional()
  route!: string;

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
}
