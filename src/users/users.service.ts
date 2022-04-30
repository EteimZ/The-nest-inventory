import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/user-create.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { toUserDto, comparePasswords } from 'src/helpers/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepo.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { username: username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return toUserDto(user);
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({ where: { username } });
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email } = userDto;

    // check if the user already exists
    const userInDB = await this.userRepo.findOne({
      where: { username: username },
    });
    if (userInDB) {
      throw new BadRequestException('User already exists');
    }

    const user: UserEntity = await this.userRepo.create(userDto);
    await this.userRepo.save(user);

    return toUserDto(user);
  }
  
}
