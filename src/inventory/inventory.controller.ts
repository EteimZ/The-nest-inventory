import { Controller, Get, Post, Param, Put, Body, Delete, Req, UseGuards} from '@nestjs/common';
import { InventoryDto } from './dto/inventory-create.dto';
import { InventoryService } from './inventory.service';
import { InventoryInterface } from './interface/inventory.interface';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiGoneResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('inventory')
@ApiBearerAuth()
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}
  
  @ApiOperation({ summary: 'List all inventories of user.' })
  @ApiOkResponse({description: 'Successful returned all inventories.'})
  @ApiUnauthorizedResponse({description: 'Unauthorized Request.'})
  @Get()
  @UseGuards(AuthGuard())
  async findAll(@Req() req: any): Promise<InventoryInterface[]> {
    const user = req.user as UserDto;
    return await this.inventoryService.getAllInventory(user);  
  }

  @ApiOperation({ summary: 'List one inventory of user.' })
  @ApiOkResponse({description: 'Successful returned inventory.'})
  @ApiBadRequestResponse({description: 'Inventory doesn\'t exit'})
  @ApiUnauthorizedResponse({description: 'Unauthorized Request.'})
  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string, @Req() req: any): Promise<InventoryInterface> {
    const user = req.user as UserDto;
    return await this.inventoryService.getOneInventory(id, user);
  }

  
  @ApiOperation({ summary: 'Create inventory.' })
  @ApiCreatedResponse({description: "Successful created inventory."})
  @ApiUnauthorizedResponse({description: 'Unauthorized Request.'})
  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() inventoryDto: InventoryDto,
    @Req() req: any
  ): Promise<InventoryInterface> {
    const user = req.user as UserDto;
    return await this.inventoryService.createInventory(user, inventoryDto);
  }

  @ApiOperation({ summary: 'Update inventory.' })
  @ApiCreatedResponse({description: "Successful updated inventory."})
  @ApiUnauthorizedResponse({description: 'Unauthorized Request.'})
  @ApiBadRequestResponse({description: 'Inventory doesn\'t exit'})
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

  @ApiOperation({ summary: 'Delete Inventory.' })
  @ApiGoneResponse({description:"Sucessfully deleted inventory."})
  @ApiUnauthorizedResponse({description: 'Unauthorized Request.'})
  @ApiBadRequestResponse({description: 'Inventory doesn\'t exit'})
  @Delete(':id')
  @UseGuards(AuthGuard())
  async delete( @Param('id') id: string, @Req() req: any): Promise<InventoryInterface> {
    const user = req.user as UserDto;
    return await this.inventoryService.deleteInventory(id, user);
  } 
}
