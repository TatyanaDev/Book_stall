import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  registerUser(@Body() dto: RegisterUserDto) {
    return this.userService.registerUser(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
