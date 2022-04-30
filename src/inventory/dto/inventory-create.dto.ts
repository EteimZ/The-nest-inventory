import { IsNotEmpty, MaxLength, IsOptional, IsNumber } from 'class-validator';
import { UserEntity } from 'src/users/entity/user.entity';
import { UserDto } from 'src/users/dto/user.dto';

export class InventoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  unit_price: number

  @IsNotEmpty()
  quantity: number

  @IsNotEmpty()
  owner: string

}
