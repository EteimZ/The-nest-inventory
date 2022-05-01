import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interface/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user.dto';
import { LoginUserDto } from 'src/users/dto/user-login.dto';
import { LoginStatus } from './interface/login-status.interface';
import { CreateUserDto } from 'src/users/dto/user-create.dto';
import { RegistrationStatus } from './interface/registration-status.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user created',
    };

    try {
      await this.usersService.create(userDto);
    } catch (error) {
      status = {
        success: false,
        message: error.message,
      };
    }

    return status;
  }

  async login(LoginUserDto: LoginUserDto): Promise<LoginStatus> {
    const user = await this.usersService.findByLogin(LoginUserDto);

    const token = this._createToken(user);

    return {
      username: user.username,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  private _createToken({ username }: UserDto): any {
    const expiresIn = '120s';

    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
