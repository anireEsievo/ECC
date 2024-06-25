import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from './auth.guard';
import { ProtectedRequest } from './interfaces/request.interface';
import { UserService } from './user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.register(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const result = await this.authService.signIn(
      signInDto.userName,
      signInDto.password,
    );
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh/:token')
  async refresh(@Param('token') token: string) {
    return this.authService.refresh(token);
  }

  @UseGuards(AuthGuard)
  @Get('/users')
  async getAllUsers() {
    return this.userService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }
  @UseGuards(AuthGuard)
  @Get('logout')
  async signOut(@Req() request: ProtectedRequest) {
    const { sub } = request.user;
    return this.authService.logOut(sub);
  }
}
