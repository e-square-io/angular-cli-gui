import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class WorkspaceCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly path!: string;

  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @IsOptional()
  @IsArray()
  options!: NgNewOption[];
}

/**
 * All the different options of ng new command: https://angular.io/cli/new#options
 *
 * Examples:
 * {"name": "--routing"}
 * {"name": "--style", "value": "scss"}
 */
interface NgNewOption {
  name: string;
  value?: unknown;
}
