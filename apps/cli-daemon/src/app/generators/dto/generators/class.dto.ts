import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GenerateClassDto {
  @IsString({ message: 'name is mandatory' })
  name!: string;

  @IsString()
  @IsOptional()
  path!: string;

  @IsString({ message: 'project is mandatory' })
  project!: string;

  @IsBoolean()
  @IsOptional()
  skipTests!: boolean;

  @IsString()
  @IsOptional()
  type!: string;
}
