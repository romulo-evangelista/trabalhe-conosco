import { Injectable } from '@nestjs/common';
import { Farmer } from '@prisma/client';
import { FarmerService } from 'src/farmer/farmer.service';

@Injectable()
export class DashboardService {
  constructor(private farmerService: FarmerService) {}

  private getUniqueFarmers(
    farmers: Farmer[],
    keys: string[],
  ): Map<string, Farmer> {
    const uniqueFarms = new Map<string, Farmer>();

    farmers.forEach((farmer: Farmer) =>
      uniqueFarms.set(`${keys.map((key) => farmer[key]).join('-')}`, farmer),
    );

    return uniqueFarms;
  }

  async totalFarms(): Promise<number> {
    const allFarmers: Farmer[] = await this.farmerService.findAll();
    return this.getUniqueFarmers(allFarmers, ['documentNumber', 'farmName'])
      .size;
  }

  async totalFarmsHec(): Promise<number> {
    const allFarmers: Farmer[] = await this.farmerService.findAll();
    let total = 0;

    this.getUniqueFarmers(allFarmers, ['documentNumber', 'farmName']).forEach(
      (farmer: Farmer) => (total += farmer.totalArea),
    );

    return total;
  }

  private getTotalAreaPizzaGraphByKey(farmers: Farmer[], field: string) {
    const pizzaGraphByKey: { [key: string]: number } = {};

    farmers.forEach((farmer) => {
      const byKey = farmer[field];
      if (!pizzaGraphByKey[byKey]) {
        pizzaGraphByKey[byKey] = 0;
      }

      pizzaGraphByKey[byKey] += farmer.totalArea;
    });

    return pizzaGraphByKey;
  }

  private getUsedAreaPizzaGraph(farmers: Farmer[]) {
    const pizzaGraph: { [key: string]: number } = {};

    farmers.forEach((farmer) => {
      const byKey = farmer.documentNumber;
      if (!pizzaGraph[byKey]) {
        pizzaGraph[byKey] = 0;
      }

      pizzaGraph[byKey] += farmer.arableTotalArea + farmer.vegetationArea;
    });

    return pizzaGraph;
  }

  async pizzaGraphByState() {
    const allFarmers: Farmer[] = await this.farmerService.findAll();
    return this.getTotalAreaPizzaGraphByKey(allFarmers, 'state');
  }

  async pizzaGraphByCrop() {
    const allFarmers: Farmer[] = await this.farmerService.findAll();
    return this.getTotalAreaPizzaGraphByKey(allFarmers, 'crops');
  }

  async pizzaGraphByUse() {
    const allFarmers: Farmer[] = await this.farmerService.findAll();
    return this.getUsedAreaPizzaGraph(allFarmers);
  }
}
