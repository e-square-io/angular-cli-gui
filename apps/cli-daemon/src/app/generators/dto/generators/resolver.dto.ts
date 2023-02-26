import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GenerateResolverDto {
  @IsString({ message: 'name is mandatory' })
  name!: string;

  @IsBoolean()
  @IsOptional()
  skipTests!: boolean;

  @IsBoolean()
  @IsOptional()
  flat!: boolean;

  @IsBoolean()
  @IsOptional()
  functional!: boolean;

  @IsString()
  @IsOptional()
  path!: string;

  @IsString({ message: 'project is mandatory' })
  project!: string;
}
