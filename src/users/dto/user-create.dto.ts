import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({description: 'Username of the owner inventory'})
  @IsNotEmpty()
  username: string;

  @ApiProperty({description: 'Password of the owner inventory'})
  @IsNotEmpty()
  password: string;

  @ApiProperty({description: 'Email of the owner inventory'})
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
