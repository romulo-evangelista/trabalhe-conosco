import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FarmerService } from 'src/farmer/farmer.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, FarmerService, PrismaService],
})
export class DashboardModule {}
