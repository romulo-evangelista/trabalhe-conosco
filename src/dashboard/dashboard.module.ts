import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaService } from '../prisma/prisma.service';
import { FarmerService } from '../farmer/farmer.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, FarmerService, PrismaService],
})
export class DashboardModule {}
