import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { GetDoctorsDto } from './dto/GetDoctors.dto';
import { Prisma } from '@prisma/client';
import { CreateDoctorScheduleDto } from './dto/CreateDoctorSchedule.dto';
import { EditDailyAvailabilityDto } from './dto/EditDailyAvability.dto';



@Injectable()
export class DoctorService {

  constructor(private readonly database:DatabaseService){}

 async GetDoctors(dto: GetDoctorsDto) {
  const { search, page = 1, limit = 5 } = dto;
  const skip = (page - 1) * limit;

  try {
    const where: Prisma.UserWhereInput = {
      role: {
        roleName: 'doctor',
      },
    };

    if (search && search.trim() !== '') {
      const cleanSearch = search.trim();

      where.OR = [
        { name: { contains: cleanSearch, mode: 'insensitive' } },
        { email: { contains: cleanSearch, mode: 'insensitive' } },
        { phone: { contains: cleanSearch, mode: 'insensitive' } },
        {doctor: {
            specialization: { contains: cleanSearch, mode: 'insensitive' },
          },}
        
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
          doctor:{
            select:{
              specialization:true
            }
          }
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
    throw new InternalServerErrorException('An error occurred while fetching doctors');
  }
}
 async deleteDoctor(id: number) {
  try {
    
    const doctor = await this.database.user.findUnique({ where: { id } });
    
    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }

    
    // new value
    const newStatus = !doctor.isActive;

    
    await this.database.user.update({
      where: { id },
      data: { isActive: newStatus },
    });

    return {
      message: `Doctor status has been updated successfully to ${newStatus ? 'Active' : 'Inactive'}`,
    };

  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new InternalServerErrorException("An error occurred while updating doctor status");
  }
}


 async CreateDoctorSchedule(doctorId: number, dto: CreateDoctorScheduleDto) {
    try {
      const startDate = new Date(dto.start_date);
      const endDate = new Date(dto.end_date);

      //  Validate that start date is before end date
      if (startDate >= endDate) {
        throw new BadRequestException('Start date must be before end date');
      }

      //  Check if the doctor exists in the system
      const doctorExists = await this.database.doctor.findUnique({
        where: { userId: doctorId },
      });

      if (!doctorExists) {
        throw new BadRequestException('Doctor not found in the system');
      }

      //  Check for overlapping schedules for the same doctor
      const overlappingSchedule = await this.database.doctorSchedule.findFirst({
        where: {
          doctorId: doctorId,
          AND: [
            { start_date: { lte: endDate } },
            { end_date: { gte: startDate } },
          ],
        },
      });

      if (overlappingSchedule) {
        throw new BadRequestException('This doctor already has a schedule overlapping with this time period');
      }

      //  Create the main schedule successfully
      const newSchedule = await this.database.doctorSchedule.create({
        data: {
          doctorId: doctorId,
          start_date: startDate,
          end_date: endDate,
        },
      });

      //  Automatically generate daily availabilities for the entire period (default status: true)
      const defaultAvailabilities: any[] = [];
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        defaultAvailabilities.push({
          scheduleId: newSchedule.id,
          date: currentDate.toISOString().split('T')[0], 
          start_time: '09:00',
          end_time: '17:00',
          status: true,
        });

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Bulk insert daily availabilities
      if (defaultAvailabilities.length > 0) {
        await this.database.dailyAvailability.createMany({
          data: defaultAvailabilities,
          skipDuplicates: true,
        });
      }

      return { message: 'Doctor schedule and default daily availabilities created successfully'};

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      
      throw new InternalServerErrorException('An error occurred while creating the doctor schedule');
    }
  }

  async editDailyAvailability(DailyId: number, dto: EditDailyAvailabilityDto) {
    try {
     
      const availabilityExists = await this.database.dailyAvailability.findUnique({
        where: { id: DailyId },
      });

      if (!availabilityExists) {
        throw new BadRequestException('Daily availability record not found');
      }

      
      const updatedAvailability = await this.database.dailyAvailability.update({
        where: { id: DailyId },
        data: {
          ...(dto.start_time && { start_time: dto.start_time }),
          ...(dto.end_time && { end_time: dto.end_time }),
          ...(dto.status !== undefined && { status: dto.status }),
        },
      });

      return {
        message: 'Daily availability updated successfully',
        data: updatedAvailability,
      };

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
console.log(error)
      throw new InternalServerErrorException('An error occurred while updating daily availability');
    }
  }

  
  

 
}
