import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UserDto } from './dto/user.dto';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}



  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.create(createUserDto);
    return user
  }

  @Get()
  async find(@Body() userDto: UserDto): Promise<UserDto> {
    return await this.userService.findByPayload(userDto);
  }


}
