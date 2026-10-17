import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { AppointmentStrategyContext } from 'src/Pattern/GetVisits/AppointmentStrategyContext';
import { DoctorAppointmentStrategy } from 'src/Pattern/GetVisits/DoctorVisitStrategy';
import { AdminAppointmentStrategy } from 'src/Pattern/GetVisits/AdminAppointmentStrategy';

@Module({
  controllers: [DoctorController],
  providers: [
    DoctorService,
    AppointmentStrategyContext,
    DoctorAppointmentStrategy,    
    AdminAppointmentStrategy,     
  ]
})
export class DoctorModule {}
