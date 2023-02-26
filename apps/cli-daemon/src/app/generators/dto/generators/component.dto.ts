import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GenerateComponentDto {
  @IsString()
  @IsOptional()
  path!: string;

  @IsString({ message: 'project is mandatory' })
  project!: string;

  @IsString({ message: 'name is mandatory' })
  name!: string;

  @IsBoolean()
  @IsOptional()
  displayBlock!: boolean;

  @IsBoolean()
  @IsOptional()
  inlineStyle!: boolean;

  @IsBoolean()
  @IsOptional()
  inlineTemplate!: boolean;

  @IsBoolean()
  @IsOptional()
  standalone!: boolean;

  @IsString()
  @IsOptional()
  viewEncapsulation!: string;

  @IsString()
  @IsOptional()
  changeDetection!: string;

  @IsString()
  @IsOptional()
  prefix!: string;

  @IsString()
  @IsOptional()
  style!: string;

  @IsString()
  @IsOptional()
  type!: string;

  @IsBoolean()
  @IsOptional()
  skipTests!: boolean;

  @IsBoolean()
  @IsOptional()
  flat!: boolean;

  @IsBoolean()
  @IsOptional()
  skipImport!: boolean;

  @IsString()
  @IsOptional()
  selector!: string;

  @IsBoolean()
  @IsOptional()
  skipSelector!: boolean;

  @IsString()
  @IsOptional()
  module!: string;

  @IsBoolean()
  @IsOptional()
  export!: boolean;
}
