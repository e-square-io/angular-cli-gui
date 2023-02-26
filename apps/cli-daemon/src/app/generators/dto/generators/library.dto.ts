import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GenerateLibraryDto {
  @IsString({ message: 'name is mandatory' })
  name!: string;

  @IsString()
  @IsOptional()
  entryFile!: string;

  @IsString()
  @IsOptional()
  prefix!: string;

  @IsBoolean()
  @IsOptional()
  skipPackageJson!: boolean;

  @IsBoolean()
  @IsOptional()
  skipInstall!: boolean;

  @IsBoolean()
  @IsOptional()
  skipTsConfig!: boolean;

  @IsString()
  @IsOptional()
  projectRoot!: string;
}
