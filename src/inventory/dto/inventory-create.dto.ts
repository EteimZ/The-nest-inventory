import { IsNotEmpty, MaxLength, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entity/user.entity';
import { UserDto } from 'src/users/dto/user.dto';

export class InventoryDto {
  @ApiProperty({description: 'Name of the inventory'})
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({description: 'Description of the inventory'})
  @MaxLength(500)
  description?: string;

  @ApiProperty({description: 'Inventory category'})
  @IsNotEmpty()
  category: string;

  @ApiProperty({description: 'Price per unit of the inventory.'})
  @IsNotEmpty()
  unit_price: number

  @ApiProperty({description: 'Quantity of the inventory.'})
  @IsNotEmpty()
  quantity: number

  @ApiProperty({description: 'Owner\'s id of the inventory.'})
  @IsNotEmpty()
  owner: string

}
