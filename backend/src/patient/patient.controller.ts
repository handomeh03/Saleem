import { Controller, Get, Body, Patch, Param, Delete, Query, ParseIntPipe, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { PatientService } from './patient.service';
import { IsPublic } from 'src/auth/Decorators/Public.decorator';
import { BrowseDoctorsDto } from './dto/BrowseDoctors.dto';
import { CreateAppointmentDto } from './dto/CreateAppointment.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get("browse-doctors")
  async browseDoctors(@Query() dto:BrowseDoctorsDto){
      return await this.patientService.browseDoctors(dto);
  }

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get("doctor-detail/:id")
  async getDoctorDetails(@Param("id",ParseIntPipe) id:number){
    return await this.patientService.getDoctorDetails(id);
  }


  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @Post("create-appointment")
  async createAppointment(@Body() dto:CreateAppointmentDto){
    
    return await this.patientService.createAppointment(dto);
  
  }
}
