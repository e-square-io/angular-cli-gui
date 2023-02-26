import { IsString } from 'class-validator';

export class GenerateEnvironmentsDto {
  @IsString({ message: 'project is mandatory' })
  project!: string;
}
