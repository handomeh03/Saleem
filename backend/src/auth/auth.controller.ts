import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateDoctorDto } from './dto/CreateDoctor.Dto';
import { IsPublic } from './Decorators/Public.decorator';
import { Roles } from './Decorators/Role.decorator';
import { Throttle } from '@nestjs/throttler';

import type { Request } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post("login")
  @Throttle({ login: { limit: 3, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  async  login(@Body() LoginDto:LoginDto) {
     return await this.authService.login(LoginDto);
  }
  
  
  @Post("create-doctor")
  @Roles("admin")
  @HttpCode(HttpStatus.CREATED)
  async createDoctor(@Body() createDoctorDto:CreateDoctorDto){
    return await this.authService.createDoctor(createDoctorDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get("me")
  async GetMe(@Req() req: Request){
    const user = req['user'];
    return await this.authService.getMe(user.sub,user.role);
    
  }
}
