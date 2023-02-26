import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GenerateWebWorkerDto {
  @IsString()
  @IsOptional()
  path!: string;

  @IsString({ message: 'project is mandatory' })
  project!: string;

  @IsString({ message: 'name is mandatory' })
  name!: string;

  @IsBoolean()
  @IsOptional()
  snippet!: boolean;
}
