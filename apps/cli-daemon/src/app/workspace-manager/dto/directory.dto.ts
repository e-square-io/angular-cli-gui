import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class DirectoryDto {
  @IsString()
  name: string;

  @IsBoolean()
  isNG: boolean;

  @IsOptional()
  isFavorite: boolean;

  constructor(name: string, isNG = false, isFavorite = false) {
    this.name = name;
    this.isNG = isNG;
    this.isFavorite = isFavorite;
  }
}
