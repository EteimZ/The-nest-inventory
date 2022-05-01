import { BadRequestException, Injectable } from '@nestjs/common';

import { InventoryInterface } from './interface/inventory.interface';
import { InventoryEntity } from './entity/inventory.entity';
import { InventoryDto } from './dto/inventory-create.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { toInventoryInterface } from 'src/helpers/utils';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepo: Repository<InventoryEntity>,
    private readonly userService: UsersService,
  ) {}

  async getAllInventory({username}: UserDto): Promise<InventoryInterface[]> {
    const inventories = await this.inventoryRepo.find({
      where: {
        owner: {
          username,
        },
      },
      relations: ['owner'],
    });
    return inventories.map((inventory) => toInventoryInterface(inventory));
  }

  async getOneInventory(id: string, {username}: UserDto): Promise<InventoryInterface> {
    const inventory = await this.inventoryRepo.findOne({
      where: { id, owner: { username } },
      relations: ['owner'],
    });
    if (!inventory) {
      throw new BadRequestException("Inventory doesn't exit");
    }
    return toInventoryInterface(inventory);
  }

  async createInventory(
    {username}: UserDto,
    createInventory: InventoryDto,
  ): Promise<InventoryInterface> {
    const owner = await this.userService.findOne({ where: { username } });
    const inventory: InventoryEntity = await this.inventoryRepo.create({
      owner,
      ...createInventory,
    });

    await this.inventoryRepo.save(inventory);

    return toInventoryInterface(inventory);
  }

  async updateInventory(
    {username}: UserDto,
    id: string,
    inventoryDto: InventoryDto,
  ): Promise<InventoryInterface> {
    let inventory: InventoryEntity = await this.inventoryRepo.findOne({
      where: { id, owner: { username } },
    });

    if (!inventory) {
      throw new BadRequestException("Inventory doesn't exist.");
    }

    await this.inventoryRepo.update({ id }, inventoryDto);

    inventory = await this.inventoryRepo.findOne({
      where: { id },
      relations: ['owner'],
    });

    return toInventoryInterface(inventory);
  }

  async deleteInventory(id: string, {username}: UserDto): Promise<InventoryInterface> {
    const inventory: InventoryEntity = await this.inventoryRepo.findOne({
      where: { id, owner: {username}},
      relations: ['owner'],
    });

    if (!inventory) {
      throw new BadRequestException("Inventory doesn't exist");
    }

    await this.inventoryRepo.delete({ id });

    return toInventoryInterface(inventory);
  }
}
