import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FarmerService {
  constructor(private prisma: PrismaService) {}

  private async areaValidation(
    dto: CreateFarmerDto | UpdateFarmerDto,
    id?: number,
  ) {
    if (dto?.arableTotalArea + dto?.vegetationArea > dto?.totalArea) {
      throw new BadRequestException(
        "The sum of arable area and vegetation area can't be greater than total area",
      );
    }

    if (id) {
      const farmer = await this.prisma.farmer.findFirstOrThrow({
        where: { id },
      });

      const arableTotalArea = dto.arableTotalArea ?? farmer.arableTotalArea;
      const vegetationArea = dto.vegetationArea ?? farmer.vegetationArea;
      const totalArea = dto.totalArea ?? farmer.totalArea;

      if (arableTotalArea + vegetationArea > totalArea) {
        throw new BadRequestException(
          "The sum of arable area and vegetation area can't be greater than total area",
        );
      }
    }
  }

  async create(createFarmerDto: CreateFarmerDto) {
    await this.areaValidation(createFarmerDto);
    return await this.prisma.farmer.create({ data: createFarmerDto });
  }

  async findAll() {
    return await this.prisma.farmer.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.farmer.findUnique({ where: { id } });
  }

  async update(id: number, updateFarmerDto: UpdateFarmerDto) {
    await this.areaValidation(updateFarmerDto, id);
    return await this.prisma.farmer.update({
      data: updateFarmerDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.farmer.delete({ where: { id } });
  }
}
