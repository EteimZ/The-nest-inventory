import { Controller, Get, Post, Param, Put, Body, Delete, Req, UseGuards} from '@nestjs/common';
import { InventoryDto } from './dto/inventory-create.dto';
import { InventoryService } from './inventory.service';
import { InventoryInterface } from './interface/inventory.interface';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}
  
  @Get()
  @UseGuards(AuthGuard())
  async findAll(@Req() req: any): Promise<InventoryInterface[]> {
    const user = req.user as UserDto;
    return await this.inventoryService.getAllInventory(user);  
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string, @Req() req: any): Promise<InventoryInterface> {
    const user = req.user as UserDto;
    return await this.inventoryService.getOneInventory(id, user);
  }

  // remove params later and get user from request object
  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() inventoryDto: InventoryDto,
    @Req() req: any
  ): Promise<InventoryInterface> {
    const user = req.user as UserDto;
    return await this.inventoryService.createInventory(user, inventoryDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() inventoryDto: InventoryDto,
    @Req() req: any
  ): Promise<InventoryInterface> {
    const user = req.user as UserDto;
    return await this.inventoryService.updateInventory(user, id, inventoryDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async delete( @Param('id') id: string, @Req() req: any): Promise<InventoryInterface> {
    const user = req.user as UserDto;
    return await this.inventoryService.deleteInventory(id, user);
  } 
}
