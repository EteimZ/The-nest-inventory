import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/user-create.dto';
import { LoginUserDto } from 'src/users/dto/user-login.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interface/login-status.interface';
import { JwtPayload } from './interface/payload.interface';
import { RegistrationStatus } from './interface/registration-status.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() CreateUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      CreateUserDto,
    );

    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    return result;
  }

  @Post('login')
  public async login(
    @Body() LoginUserDto: CreateUserDto,
  ): Promise<LoginStatus> {
    return await this.authService.login(LoginUserDto);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  public async me(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
