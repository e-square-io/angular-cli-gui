import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GenerateNgNewDto {
  @IsString()
  @IsOptional()
  directory!: string;

  @IsString({ message: 'name is mandatory' })
  name!: string;

  @IsBoolean()
  @IsOptional()
  skipInstall!: boolean;

  @IsBoolean()
  @IsOptional()
  linkCli!: boolean;

  @IsBoolean()
  @IsOptional()
  skipGit!: boolean;

  @undefined()
  @IsOptional()
  commit!: undefined;

  @IsString()
  @IsOptional()
  newProjectRoot!: string;

  @IsBoolean()
  @IsOptional()
  inlineStyle!: boolean;

  @IsBoolean()
  @IsOptional()
  inlineTemplate!: boolean;

  @IsString()
  @IsOptional()
  viewEncapsulation!: string;

  @IsString({ message: 'version is mandatory' })
  version!: string;

  @IsBoolean()
  @IsOptional()
  routing!: boolean;

  @IsString()
  @IsOptional()
  prefix!: string;

  @IsString()
  @IsOptional()
  style!: string;

  @IsBoolean()
  @IsOptional()
  skipTests!: boolean;

  @IsBoolean()
  @IsOptional()
  createApplication!: boolean;

  @IsBoolean()
  @IsOptional()
  minimal!: boolean;

  @IsBoolean()
  @IsOptional()
  strict!: boolean;

  @IsString()
  @IsOptional()
  packageManager!: string;
}
