import { Module } from '@nestjs/common';
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
/*       type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'inventory', */
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      // url: 'postgres://postgres:postgres@localhost:5432/inventory',
      entities: [InventoryEntity, UserEntity],
      synchronize: true,
    }),  UsersModule, InventoryModule, AuthModule
  ]
})
export class AppModule {}
