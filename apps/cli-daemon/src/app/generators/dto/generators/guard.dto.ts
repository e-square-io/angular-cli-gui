import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GenerateGuardDto {
  @IsString({ message: 'name is mandatory' })
  name!: string;

  @IsBoolean()
  @IsOptional()
  skipTests!: boolean;

  @IsBoolean()
  @IsOptional()
  flat!: boolean;

  @IsString()
  @IsOptional()
  path!: string;

  @IsString({ message: 'project is mandatory' })
  project!: string;

  @IsBoolean()
  @IsOptional()
  functional!: boolean;

  @undefined()
  @IsOptional()
  implements!: array;
}
