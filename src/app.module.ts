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
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      entities: [InventoryEntity, UserEntity],
      synchronize: true,
    }),
    UsersModule,
    InventoryModule,
    AuthModule,
  ],
})
export class AppModule {}
