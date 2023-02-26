import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GenerateServiceDto {
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
}
