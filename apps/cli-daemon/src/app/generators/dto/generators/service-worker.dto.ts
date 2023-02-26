import { IsOptional, IsString } from 'class-validator';

export class GenerateServiceWorkerDto {
  @IsString({ message: 'project is mandatory' })
  project!: string;

  @IsString()
  @IsOptional()
  target!: string;
}
