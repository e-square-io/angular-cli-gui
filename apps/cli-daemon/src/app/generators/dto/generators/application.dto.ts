import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GenerateApplicationDto {
  @IsString()
  @IsOptional()
  projectRoot!: string;

  @IsString({ message: 'name is mandatory' })
  name!: string;

  @IsBoolean()
  @IsOptional()
  inlineStyle!: boolean;

  @IsBoolean()
  @IsOptional()
  inlineTemplate!: boolean;

  @IsString()
  @IsOptional()
  viewEncapsulation!: string;

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
  skipPackageJson!: boolean;

  @IsBoolean()
  @IsOptional()
  minimal!: boolean;

  @IsBoolean()
  @IsOptional()
  skipInstall!: boolean;

  @IsBoolean()
  @IsOptional()
  strict!: boolean;
}
