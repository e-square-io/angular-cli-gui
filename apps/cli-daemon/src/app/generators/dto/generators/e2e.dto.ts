import { IsOptional, IsString } from 'class-validator';

export class GenerateE2eDto {
  @IsString()
  @IsOptional()
  rootSelector!: string;

  @IsString({ message: 'relatedAppName is mandatory' })
  relatedAppName!: string;
}
