import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsOptional } from 'class-validator';

export class CreateDoctorDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    name!: string;

    @IsString({ message: 'Email must be a string' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email!: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    })
    password!: string;


    @IsString({ message: 'Phone must be a string' })
    @IsNotEmpty({ message: 'Phone is required' })
    @Matches(/^\+?[1-9]\d{1,14}$/, {
        message: 'Invalid phone number format. It should be a valid international phone number.',
    })
    phone!: string;

    @IsString({ message: 'Specialization must be a string' })
    @IsNotEmpty({ message: 'Specialization is required' })
    specialization!: string;

    @IsString({ message: 'Bio must be a string' })
    @IsOptional()
    bio?: string;
}