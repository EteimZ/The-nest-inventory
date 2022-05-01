import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryEntity } from './entity/inventory.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [UsersModule, AuthModule, TypeOrmModule.forFeature([InventoryEntity])],
    controllers: [InventoryController],
    providers: [InventoryService],
    exports: [InventoryService]
})
export class InventoryModule {}
