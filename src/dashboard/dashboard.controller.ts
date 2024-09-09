import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('total-farms')
  totalFarms() {
    return this.dashboardService.totalFarms();
  }

  @Get('total-farms-hec')
  totalFarmsHec() {
    return this.dashboardService.totalFarmsHec();
  }

  @Get('pizza-graph-by-state')
  pizzaGraphByState() {
    return this.dashboardService.pizzaGraphByState();
  }

  @Get('pizza-graph-by-crop')
  pizzaGraphByCrop() {
    return this.dashboardService.pizzaGraphByCrop();
  }

  @Get('pizza-graph-by-use')
  pizzaGraphByUse() {
    return this.dashboardService.pizzaGraphByUse();
  }
}
