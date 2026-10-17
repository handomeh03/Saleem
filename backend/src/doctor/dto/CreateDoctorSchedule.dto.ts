import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';


export class CreateDoctorScheduleDto {
  @IsNotEmpty()
  @IsDateString()
  start_date!: string;

  @IsNotEmpty()
  @IsDateString()
  end_date!: string;
}