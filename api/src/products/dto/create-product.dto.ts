import {
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  IsOptional,
  Min,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number; // Price per night

  @IsNumber()
  @Min(1)
  maxOccupancy: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenities?: string[];

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}