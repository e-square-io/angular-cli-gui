import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GenerateModuleDto {
  @IsString({ message: 'name is mandatory' })
  name!: string;

  @IsString()
  @IsOptional()
  path!: string;

  @IsString({ message: 'project is mandatory' })
  project!: string;

  @IsBoolean()
  @IsOptional()
  routing!: boolean;

  @IsString()
  @IsOptional()
  routingScope!: string;

  @IsString()
  @IsOptional()
  route!: string;

  @IsBoolean()
  @IsOptional()
  flat!: boolean;

  @IsBoolean()
  @IsOptional()
  commonModule!: boolean;

  @IsString()
  @IsOptional()
  module!: string;
}
