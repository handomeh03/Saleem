import { Injectable } from '@nestjs/common';
import { IVisitFetchStratgy } from './IVisitFetchStratgy';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AdminAppointmentStrategy implements IVisitFetchStratgy {
  constructor(private readonly databaase: DatabaseService) {}

  async fetchVisits(
    userId: number,
    userRole: string,
    search?: string,
    year?: number,
    month?: number,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    const where: any = {}; 

    if (year && month) {
      const startDate = new Date(year, month - 1, 1, 0, 0, 0, 0);
      const endDate = new Date(year, month, 0, 23, 59, 59, 999);
      where.created_at = { gte: startDate, lte: endDate };
    }

  
    if (search && search.trim() !== '') {
      const cleanSearch = search.trim();
      where.OR = [
        { patient_code: { contains: cleanSearch, mode: 'insensitive' } },
        { description: { contains: cleanSearch, mode: 'insensitive' } },
       
        {
          doctor: {
            user: {
              name: { contains: cleanSearch, mode: 'insensitive' },
            },
          },
        },
      ];
    }

    const [appointments, totalCount] = await Promise.all([
      this.databaase.appointment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        include: {
          doctor: {
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      this.databaase.appointment.count({ where }),
    ]);

    

    return {
      data: appointments,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      hasNextPage: page < Math.ceil(totalCount / limit),
      hasPreviousPage: page > 1,
    };
  }
}