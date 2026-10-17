import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from 'src/auth/dto/CreateDoctor.Dto';


export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
