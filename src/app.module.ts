import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FarmerModule } from './farmer/farmer.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [FarmerModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
