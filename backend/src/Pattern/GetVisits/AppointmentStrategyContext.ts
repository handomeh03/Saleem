import { Injectable, ForbiddenException } from '@nestjs/common';
import { DoctorAppointmentStrategy } from './DoctorVisitStrategy';
import { AdminAppointmentStrategy } from './AdminAppointmentStrategy';
import { IVisitFetchStratgy } from './IVisitFetchStratgy';


@Injectable( )
export class AppointmentStrategyContext {
  constructor(
    private readonly doctorStrategy: DoctorAppointmentStrategy,
    private readonly adminStrategy: AdminAppointmentStrategy,
  ) {}

  async execute(
    userId: number,
    userRole: string,
    search?: string,
    year?: number,
    month?: number,
    page?: number,
    limit?: number,
  ) {
    let strategy: IVisitFetchStratgy;

    if (userRole === 'doctor') {
      strategy = this.doctorStrategy;
    } else if (userRole === 'admin') {
      strategy = this.adminStrategy;
    } else {
      throw new ForbiddenException('Access denied for this role');
    }

    return await strategy.fetchVisits(userId, userRole, search, year, month, page, limit);
  }
}