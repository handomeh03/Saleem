import { IsInt, IsNotEmpty, IsString, Matches, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty({ message: 'Doctor ID is required' })
  @IsInt({ message: 'Doctor ID must be an integer' })
  doctorId!: number;

  @IsNotEmpty({ message: 'Start time is required' })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'from_time must be in valid HH:MM format (24-hour)',
  })
  from_time!: string;

  @IsNotEmpty({ message: 'End time is required' })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'to time must be in valid HH:MM format (24-hour)',
  })
  to_time!: string;

  @IsOptional()
  @IsString()
  description?: string;
}