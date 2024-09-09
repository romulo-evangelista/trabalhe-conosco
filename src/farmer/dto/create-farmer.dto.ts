import { Crop } from '@prisma/client';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsValidDocument } from './validations/is-valid-document.validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmerDto {
  @ApiProperty({ description: 'Id of the farmer', example: 1 })
  @IsInt()
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: 'Document number of the farmer',
    example: '43.595.450/0001-87',
  })
  @IsString()
  @IsValidDocument({ message: 'Invalid Document' })
  documentNumber: string;

  @ApiProperty({
    description: 'Name of the farmer',
    example: 'José Silva',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Name of the farm',
    example: 'Fazenda Silva',
  })
  @IsString()
  farmName: string;

  @ApiProperty({
    description: 'Name of the city',
    example: 'Cascavel',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Name of the state',
    example: 'Ceará',
  })
  @IsString()
  state: string;

  @ApiProperty({
    description: 'Total area of the farm',
    example: 100,
  })
  @IsNumber()
  totalArea: number;

  @ApiProperty({
    description: 'Arable area of the farm',
    example: 50,
  })
  @IsNumber()
  arableTotalArea: number;

  @ApiProperty({
    description: 'Vegetation area of the farm',
    example: 50,
  })
  @IsNumber()
  vegetationArea: number;

  @ApiProperty({
    description: 'Crops of the farmers',
    example: [Crop.SOY, Crop.CORN],
  })
  @IsEnum(Crop, { each: true })
  crops?: Crop[];
}
