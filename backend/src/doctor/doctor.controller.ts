import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Roles } from 'src/auth/Decorators/Role.decorator';
import { RolesGuard } from 'src/auth/Guards/RolesGuard';
import { GetDoctorsDto } from './dto/GetDoctors.dto';
import type { Request } from 'express';
import { GetVisitsDto } from './dto/GetVisits.dto';
import { AppointmentStrategyContext } from 'src/Pattern/GetVisits/AppointmentStrategyContext';
import { CreateDoctorScheduleDto } from './dto/CreateDoctorSchedule.dto';
import { EditDailyAvailabilityDto } from './dto/EditDailyAvability.dto';
import { Throttle } from '@nestjs/throttler';
import { GetAllScheduleDto } from './dto/GetAllSchedule.dto';



@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService,private readonly appointmentStrategyContext:AppointmentStrategyContext) {}


 @Roles("doctor")
 @UseGuards(RolesGuard)
 @Throttle({ Search: { limit: 300, ttl: 60000 } })
 @Get("GetAllSchedule")
 @HttpCode(HttpStatus.OK)
 async GetAllSchedule(@Query() dto:GetAllScheduleDto,@Req() req: Request){
    const user = req['user'];
    return await this.doctorService.GetAllSchedule(user.sub,dto);
 }

  // get all doctors for admin
 @Roles("admin")
 @UseGuards(RolesGuard)
 @Throttle({ Search: { limit: 300, ttl: 60000 } })
 @Get("Get-Doctors")
 @HttpCode(HttpStatus.OK)
 async GetAllDoctors(@Query() dto:GetDoctorsDto){
  return await this.doctorService.GetDoctors(dto)
 }

 // get all visistors for doctor and admin 
 @Roles("admin","doctor")
 @UseGuards(RolesGuard)
 @Throttle({ Search: { limit: 300, ttl: 60000 } })
 @Get("Doctor-recourds")
 @HttpCode(HttpStatus.OK)
 async GetVisits(@Query() dto:GetVisitsDto,@Req() req: Request){
    const user = req['user'];
 return await this.appointmentStrategyContext.execute(user.sub,user.role,dto.search,dto.year,dto.month,dto.page,Number(dto.limit));
 }

 // make schedule for doctor and defult Daily avaibilty
 @Roles("admin")
 @UseGuards(RolesGuard)
 @HttpCode(HttpStatus.CREATED)
 @Post("Create-Schedule/:id")
 async CreateDoctorSchedule(@Param("id",ParseIntPipe)id:number,@Body() dto:CreateDoctorScheduleDto){
    return await this.doctorService.CreateDoctorSchedule(id,dto);
 }

 // edit daily avaibilty (per one recourd)
 @Roles("doctor")
 @UseGuards(RolesGuard)
 @Patch("Schedule/edit-dailyAvaibilty/:id")
 async editDailyAvaiblity(@Param("id",ParseIntPipe) id:number,@Body() dto:EditDailyAvailabilityDto){
    return await this.doctorService.editDailyAvailability(id,dto);
 }

 // soft delete 
  @Patch("Delete-doctor/:id")
  @Roles("admin")
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  async deleteDoctor(@Param('id', ParseIntPipe) id: number) {
  return await this.doctorService.deleteDoctor(id);
}
}
