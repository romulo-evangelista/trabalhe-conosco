import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('farmer')
@Controller('farmer')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Post()
  @ApiOperation({ summary: 'Create farmer' })
  @ApiResponse({
    status: 200,
    description: 'The created farmer',
  })
  create(@Body() createFarmerDto: CreateFarmerDto) {
    return this.farmerService.create(createFarmerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all farmers' })
  @ApiResponse({
    status: 200,
    description: 'All farmers list',
  })
  findAll() {
    return this.farmerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a farmer by id' })
  @ApiResponse({
    status: 200,
    description: 'A farmer',
  })
  findOne(@Param('id') id: string) {
    return this.farmerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a farmer' })
  @ApiResponse({
    status: 200,
    description: 'The updated farmer',
  })
  update(@Param('id') id: string, @Body() updateFarmerDto: UpdateFarmerDto) {
    return this.farmerService.update(+id, updateFarmerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a farmer' })
  @ApiResponse({
    status: 200,
    description: 'The removed farmer',
  })
  remove(@Param('id') id: string) {
    return this.farmerService.remove(+id);
  }
}
