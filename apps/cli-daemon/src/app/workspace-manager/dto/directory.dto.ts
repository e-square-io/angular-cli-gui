import { IsNotEmpty, IsOptional } from 'class-validator';

export class DirectoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  isNG: boolean;

  @IsOptional()
  isFavorite: boolean;

  constructor(name: string, isNG = false, isFavorite = false) {
    this.name = name;
    this.isNG = isNG;
    this.isFavorite = isFavorite;
  }
}
