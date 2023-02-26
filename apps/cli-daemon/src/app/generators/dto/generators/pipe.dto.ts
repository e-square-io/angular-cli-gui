import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GeneratePipeDto {
  @IsString({ message: 'name is mandatory' })
  name!: string;

  @IsString()
  @IsOptional()
  path!: string;

  @IsString({ message: 'project is mandatory' })
  project!: string;

  @IsBoolean()
  @IsOptional()
  flat!: boolean;

  @IsBoolean()
  @IsOptional()
  skipTests!: boolean;

  @IsBoolean()
  @IsOptional()
  skipImport!: boolean;

  @IsBoolean()
  @IsOptional()
  standalone!: boolean;

  @IsString()
  @IsOptional()
  module!: string;

  @IsBoolean()
  @IsOptional()
  export!: boolean;
}
