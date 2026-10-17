import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BrowseDoctorsDto } from './dto/BrowseDoctors.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { CreateAppointmentDto } from './dto/CreateAppointment.dto';


@Injectable()
export class PatientService {
  constructor(private readonly database: DatabaseService) { }
  async browseDoctors(dto: BrowseDoctorsDto) {
    const { search, page = 1, limit = 10 } = dto;
    const skip = (page - 1) * limit;


    const todayDate = new Date().toISOString().split('T')[0];

    try {

      const where: Prisma.UserWhereInput = {
        isActive: true,
        role: {
          roleName: 'doctor',
        },

        doctor: {
          doctor_schedules: {
            some: {
              daily_availability: {
                some: {
                  date: todayDate,
                  status: true,
                },
              },
            },
          },
        },
      };


      if (search && search.trim() !== '') {
        const cleanSearch = search.trim();

        where.AND = [

          {
            doctor: {
              doctor_schedules: {
                some: {
                  daily_availability: {
                    some: {
                      date: todayDate,
                      status: true,
                    },
                  },
                },
              },
            },
          },

          {
            OR: [
              { name: { contains: cleanSearch, mode: 'insensitive' } },
              { email: { contains: cleanSearch, mode: 'insensitive' } },
              { phone: { contains: cleanSearch, mode: 'insensitive' } },
              {
                doctor: {
                  specialization: { contains: cleanSearch, mode: 'insensitive' },
                },
              },
            ],
          },
        ];
      }

      const [doctors, totalCount] = await Promise.all([
        this.database.user.findMany({
          where,
          skip,
          take: limit,
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            isActive: true,
            createdAt: true,
            role: {
              select: {
                roleName: true,
              },
            },
            doctor: {
              select: {
                specialization: true,

                doctor_schedules: {
                  include: {
                  daily_availability: {
                      where: { date: todayDate, status: true },
                    },
                  },
                },
              },
            },
          },
        }),
        this.database.user.count({ where }),
      ]);

      const totalPages = Math.ceil(totalCount / limit);

      return {
        data: doctors,
        totalCount,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      };

    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching available doctors');
    }
  }
async getDoctorDetails(doctorId: number) {
    try {
      const todayDate = new Date().toISOString().split('T')[0];

      
      const doctor = await this.database.user.findFirst({
        where: {
          id: doctorId,
          isActive: true,
          role: { roleName: 'doctor' },
        },
        include: {
          doctor: {
            include: {
              doctor_schedules: {
                include: {
                  daily_availability: {
                    where: {
                      date: todayDate,
                      status: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!doctor || !doctor.doctor) {
        throw new NotFoundException('Doctor not found or inactive');
      }

      
     
      const schedules = (doctor.doctor?.doctor_schedules || []) as any[];
      
      const dailyAvailability = schedules
        .flatMap((schedule) => schedule.daily_availability || []) 
        .find((avail) => avail && avail.date === todayDate);

      if (!dailyAvailability) {
        return {
          message: 'Doctor details fetched successfully',
          targetDate: todayDate,
          data: {
            id: doctor.id,
            name: doctor.name,
            email: doctor.email,
            phone: doctor.phone,
            specialization: doctor.doctor.specialization,
            bio: doctor.doctor.bio,
            availableSlots: [],
          },
        };
      }

      
      const bookedAppointments = await this.database.appointment.findMany({
        where: {
          doctorId: doctorId,
          date: todayDate,
          status: { not: 'CANCELLED' },
        },
        select: {
          from_time: true,
          to_time: true, 
        },
      });

      
      const formattedBookings = bookedAppointments.map((app) => ({
        from_time: app.from_time,
        end_time: app.to_time,
      }));

      const slotDurationMinutes = 30;
      const availableSlots = this.generateTimeSlots(
        dailyAvailability.start_time,
        dailyAvailability.end_time,
        slotDurationMinutes,
        formattedBookings
      );

      return {
        targetDate: todayDate,
        data: {
          id: doctor.id,
          name: doctor.name,
          email: doctor.email,
          phone: doctor.phone,
          specialization: doctor.doctor.specialization,
          bio: doctor.doctor.bio,
          availableSlots,
        },
      };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error)
      throw new InternalServerErrorException('An error occurred while fetching doctor details');
    }
  }
async createAppointment(dto: CreateAppointmentDto) {
    try {
      const todayDate = new Date().toISOString().split('T')[0];  
      const patientCode = `PAT-${Math.floor(1000 + Math.random() * 9000)}`;

      
      // check if doctor exist
      const doctorUser = await this.database.user.findFirst({
        where: {
          id: dto.doctorId,
          isActive: true,
          role: { roleName: 'doctor' },
        },
        include: {
          doctor: {
            include: {
              doctor_schedules: {
                include: {
                  daily_availability: {
                    where: {
                      date: todayDate,
                      status: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!doctorUser || !doctorUser.doctor) {
        throw new NotFoundException('Doctor not found or inactive');
      }

      
      const schedules = (doctorUser.doctor.doctor_schedules || []) as any[];
      const dailyAvailability = schedules
        .flatMap((schedule) => schedule.daily_availability || [])
        .find((avail) => avail && avail.date === todayDate);

      if (!dailyAvailability) {
        throw new BadRequestException('The doctor has no active availability or working hours for today');
      }

      

      // check if the time in dalilavabilty for dotor
      if (dto.from_time < dailyAvailability.start_time || dto.to_time > dailyAvailability.end_time) {
        throw new BadRequestException(
          `Appointment time must be within doctor's working hours (${dailyAvailability.start_time} - ${dailyAvailability.end_time})`
        );
      }

      // check if slot is reservation before
      const existingAppointment = await this.database.appointment.findFirst({
        where: {
          doctorId: dto.doctorId,
          date: todayDate,
          status: { not: 'CANCELLED' },
          OR: [
            {
              from_time: { lte: dto.from_time },
              to_time: { gt: dto.from_time },
            },
            {
              from_time: { lt: dto.to_time },
              to_time: { gte: dto.to_time },
            },
            {
              from_time: { gte: dto.from_time },
              to_time: { lte: dto.to_time },
            },
          ],
        },
      });

      if (existingAppointment) {
        throw new ConflictException('This time slot is already booked or overlaps with an existing appointment');
      }

      
      const newAppointment = await this.database.appointment.create({
        data: {
          doctorId: dto.doctorId,
          patient_code: patientCode,
          date: todayDate,
          from_time: dto.from_time,
          to_time: dto.to_time,
          description: dto.description,
          status: 'PENDING',
        },
      });

      return {
        message: 'Appointment created successfully',
        data: newAppointment,
      };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
  
      throw new InternalServerErrorException('An error occurred while creating the appointment');
    }
  }

  private generateTimeSlots(
    startTime: string,
    endTime: string,
    durationMinutes: number,
    bookedAppointments: { from_time: string; end_time: string }[],
  ) {
    const slots: { from_time: string; end_time: string }[] = [];

    let currentMinutes = this.timeToMinutes(startTime);
    const endMinutes = this.timeToMinutes(endTime);

    while (currentMinutes + durationMinutes <= endMinutes) {
      const slotStart = this.minutesToTime(currentMinutes);
      const slotEnd = this.minutesToTime(currentMinutes + durationMinutes);

      const isBooked = bookedAppointments.some((app) => {
        return (
          (slotStart >= app.from_time && slotStart < app.end_time) ||
          (slotEnd > app.from_time && slotEnd <= app.end_time) ||
          (slotStart <= app.from_time && slotEnd >= app.end_time)
        );
      });

      if (!isBooked) {
        slots.push({
          from_time: slotStart,
          end_time: slotEnd,
        });
      }

      currentMinutes += durationMinutes;
    }

    return slots;
  }

  private timeToMinutes(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private minutesToTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}
