import { Controller, Get, Body, Patch, Param, Delete, Query, ParseIntPipe, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { PatientService } from './patient.service';
import { IsPublic } from 'src/auth/Decorators/Public.decorator';
import { BrowseDoctorsDto } from './dto/BrowseDoctors.dto';
import { CreateAppointmentDto } from './dto/CreateAppointment.dto';
import { GetPatientRecordsDto } from './dto/GetPatientRecourds.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Throttle({ Search: { limit: 30, ttl: 60000 } })
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
  @HttpCode(HttpStatus.OK)
  @Throttle({ Search: { limit: 30, ttl: 60000 } })
  @Get("patient-recourds/:patientCode")
  async GetPatientRecourds(@Param("patientCode") patientCode: string,@Query() dto:GetPatientRecordsDto){
    return await this.patientService.getPatientRecords(patientCode,dto);
  }


  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @Post("create-appointment")
  async createAppointment(@Body() dto:CreateAppointmentDto){
    
    return await this.patientService.createAppointment(dto);
  
  }
}
