import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GenerateWorkspaceDto {
  @IsString({ message: 'name is mandatory' })
  name!: string;

  @IsString()
  @IsOptional()
  newProjectRoot!: string;

  @IsString({ message: 'version is mandatory' })
  version!: string;

  @IsBoolean()
  @IsOptional()
  minimal!: boolean;

  @IsBoolean()
  @IsOptional()
  strict!: boolean;

  @IsString()
  @IsOptional()
  packageManager!: string;
}
