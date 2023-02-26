import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GenerateDirectiveDto {
  @IsString({ message: 'name is mandatory' })
  name!: string;

  @IsString()
  @IsOptional()
  path!: string;

  @IsString({ message: 'project is mandatory' })
  project!: string;

  @IsString()
  @IsOptional()
  prefix!: string;

  @IsBoolean()
  @IsOptional()
  skipTests!: boolean;

  @IsBoolean()
  @IsOptional()
  skipImport!: boolean;

  @IsString()
  @IsOptional()
  selector!: string;

  @IsBoolean()
  @IsOptional()
  standalone!: boolean;

  @IsBoolean()
  @IsOptional()
  flat!: boolean;

  @IsString()
  @IsOptional()
  module!: string;

  @IsBoolean()
  @IsOptional()
  export!: boolean;
}
