import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { InventoryController } from './inventory/inventory.controller';
import { InventoryService } from './inventory/inventory.service';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { InventoryModule } from './inventory/inventory.module';
import { InventoryEntity } from './inventory/entity/inventory.entity';
import { UserEntity } from './users/entity/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'inventory',
      entities: [InventoryEntity, UserEntity],
      synchronize: true,
    }),  UsersModule, InventoryModule, AuthModule
  ]
})
export class AppModule {}
