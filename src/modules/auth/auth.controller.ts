import {
  Controller,
  HttpStatus,
  UseGuards,
  HttpCode,
  Request,
  Post,
} from '@nestjs/common';
import { AuthenticatedRequest } from '../../types/authenticated-request';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user.userId);
  }
}
