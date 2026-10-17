import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class EditDailyAvailabilityDto {
  @IsOptional()
  @IsString()
  start_time?: string; 

  @IsOptional()
  @IsString()
  end_time?: string; 

  @IsOptional()
  @IsBoolean()
  status?: boolean; 
}