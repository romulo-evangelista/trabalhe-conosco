import { Crop } from '@prisma/client';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFarmerDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  documentNumber: string;

  @IsString()
  name: string;

  @IsString()
  farmName: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsNumber()
  totalArea: number;

  @IsNumber()
  arableTotalArea: number;

  @IsNumber()
  vegetationArea: number;

  @IsEnum(Crop, { each: true })
  crops?: Crop[];
}
