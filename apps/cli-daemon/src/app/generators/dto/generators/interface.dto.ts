import { IsOptional, IsString } from 'class-validator';

export class GenerateInterfaceDto {
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

  @IsString()
  @IsOptional()
  type!: string;
}
