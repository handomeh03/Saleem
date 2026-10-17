import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateDoctorDto } from './dto/CreateDoctor.Dto';
import { IsPublic } from './Decorators/Public.decorator';
import { Roles } from './Decorators/Role.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post("login")
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
}
