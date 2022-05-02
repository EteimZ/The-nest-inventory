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
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/user-create.dto';
import { LoginUserDto } from 'src/users/dto/user-login.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interface/login-status.interface';
import { JwtPayload } from './interface/payload.interface';
import { RegistrationStatus } from './interface/registration-status.interface';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register user.' })
  @Post('register')
  @ApiCreatedResponse({description: 'User successfully created.'})
  @ApiBadRequestResponse({description: 'Bad request.'})
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
  @ApiOperation({ summary: 'Login user.' })
  @ApiCreatedResponse({description: 'User login successfully.'})
  @ApiUnauthorizedResponse({description: 'Unauthorized Request.'})
  public async login(
    @Body() LoginUserDto: CreateUserDto,
  ): Promise<LoginStatus> {
    return await this.authService.login(LoginUserDto);
  }

  @ApiOperation({ summary: 'Test user.' })
  @ApiBearerAuth()
  @ApiOkResponse({description: 'Successful response.'})
  @ApiUnauthorizedResponse({description: 'Unauthorized Request.'})
  @Get('me')
  @UseGuards(AuthGuard())
  public async me(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
