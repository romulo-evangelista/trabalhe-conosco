import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crop } from '@prisma/client';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('total-farms')
  @ApiOperation({ summary: 'Total of farms' })
  @ApiResponse({
    status: 200,
    example: 5,
  })
  totalFarms() {
    return this.dashboardService.totalFarms();
  }

  @Get('total-farms-hec')
  @ApiOperation({ summary: 'Total hectares of farms' })
  @ApiResponse({
    status: 200,
    example: 1000,
  })
  totalFarmsHec() {
    return this.dashboardService.totalFarmsHec();
  }

  @Get('pizza-graph-by-state')
  @ApiOperation({ summary: 'Data to show pizza graph by state' })
  @ApiResponse({
    status: 200,
    example: {
      Ceara: 200,
      'São Paulo': 200,
    },
  })
  pizzaGraphByState() {
    return this.dashboardService.pizzaGraphByState();
  }

  @Get('pizza-graph-by-crop')
  @ApiOperation({ summary: 'Data to show pizza graph by crop' })
  @ApiResponse({
    status: 200,
    example: {
      [Crop.SOY]: 200,
      [Crop.CORN]: 200,
    },
  })
  pizzaGraphByCrop() {
    return this.dashboardService.pizzaGraphByCrop();
  }

  @Get('pizza-graph-by-use')
  @ApiOperation({ summary: 'Data to show pizza graph by used area' })
  @ApiResponse({
    status: 200,
    example: {
      '43.595.450/0001-87': 200,
    },
  })
  pizzaGraphByUse() {
    return this.dashboardService.pizzaGraphByUse();
  }
}
