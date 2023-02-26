import { IsString } from 'class-validator';

export class GenerateConfigDto {
  @IsString({ message: 'project is mandatory' })
  project!: string;

  @IsString({ message: 'type is mandatory' })
  type!: string;
}
