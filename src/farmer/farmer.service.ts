import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FarmerService {
  constructor(private prisma: PrismaService) {}

  async create(createFarmerDto: CreateFarmerDto) {
    if (
      createFarmerDto.arableTotalArea + createFarmerDto.vegetationArea >
      createFarmerDto.totalArea
    ) {
      throw new BadRequestException(
        "The sum of arable area and vegetation area can't be greater than total area",
      );
    }

    return await this.prisma.farmer.create({ data: createFarmerDto });
  }

  async findAll() {
    return await this.prisma.farmer.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.farmer.findUnique({ where: { id } });
  }

  async update(id: number, updateFarmerDto: UpdateFarmerDto) {
    return await this.prisma.farmer.update({
      data: updateFarmerDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.farmer.delete({ where: { id } });
  }
}
