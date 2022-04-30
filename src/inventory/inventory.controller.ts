import { Controller, Get, Post, Param, Put, Body, Delete} from '@nestjs/common';
import { InventoryDto } from './dto/inventory-create.dto';
import { InventoryService } from './inventory.service';
import { InventoryInterface } from './interface/inventory.interface';


@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}
  
  @Get(':id')
  async findAll(@Param('id') id: string): Promise<InventoryInterface[]> {
    return await this.inventoryService.getAllInventory(id)  
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<InventoryInterface> {
    return await this.inventoryService.getOneInventory(id);
  }

  // remove params later and get user from request object
  @Post(':user')
  async create(
    @Body() inventoryDto: InventoryDto,
    @Param('user') user: string
  ): Promise<InventoryInterface> {
    return await this.inventoryService.createInventory(user, inventoryDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() inventoryDto: InventoryDto,
  ): Promise<InventoryInterface> {
    console.log("Hello world!");
    return await this.inventoryService.updateInventory(id, inventoryDto)
  }

  @Delete(':id')
  async delete( @Param('id') id: string): Promise<InventoryInterface> {
    return await this.inventoryService.deleteInventory(id);
  } 
}
