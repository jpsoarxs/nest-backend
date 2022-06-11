import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getProfile(@Request() req) {
    return req.user;
  }
}
