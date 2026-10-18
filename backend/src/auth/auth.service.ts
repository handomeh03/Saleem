import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { DatabaseService } from 'src/database/database.service';
import { CryptSecuirtyService } from 'src/security/Crypt-security.service';
import { tokenService } from 'src/security/tokens.service';
import { CreateDoctorDto } from './dto/CreateDoctor.Dto';


@Injectable()
export class AuthService {
  constructor(private readonly database: DatabaseService, private readonly CryptSecuirty: CryptSecuirtyService, private readonly jwt: tokenService) { }
  async login(dto: LoginDto) {
  const { email, password } = dto;
  
  try {
    const user = await this.database.user.findUnique({ 
      where: { email }, 
      include: { role: true } 
    });
    

    if (!user) {
      throw new UnauthorizedException("Email or password not correct");
    }

    
    if (!user.isActive) {
      throw new UnauthorizedException("Your account has been deactivated by the admin");
    }

    
    const isMatch = await this.CryptSecuirty.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Email or password not correct");
    }

    
    const payload = { userId: user.id, RoleName: user.role.roleName };
    const token = await this.jwt.generateAccessToken(payload);

    return { 
      accessToken: token, 
      role: user.role.roleName,
      message:"Login successfully"
    };

  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new InternalServerErrorException("An unexpected error occurred Please try again later");
  }
   }

   async createDoctor(dto: CreateDoctorDto) {
  try {

    const existingUser = await this.database.user.findFirst({
      where: {
        OR: [
          { email: dto.email },
          { phone: dto.phone }
        ]
      }
    });
    

    if (existingUser) {
      throw new BadRequestException("Email or phone number already exists");
    }

    
    // find doctor role id
    const doctorRole = await this.database.role.findUnique({
      where: { roleName: 'doctor' }
    });

    if (!doctorRole) {
      throw new NotFoundException("Doctor role not found in the system");
    }

    
    const hashedPassword = await this.CryptSecuirty.hash(dto.password);

    // to confirm that user and doc create successfull
    const newDoctor = await this.database.$transaction(async (prisma) => {
  
      const user = await prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
          password: hashedPassword,
          isActive: true,
          roleId: doctorRole.id, 
        }
      });

     
      const doctorProfile = await prisma.doctor.create({
        data: {
          userId: user.id,
          specialization: dto.specialization,
          bio: dto.bio || "No bio provided yet",
        }
      });

      return { user, doctorProfile };
    });

    return {
      message: "Doctor account created successfully",
    };

  } catch (error:any) {
    if (error instanceof HttpException) {
      throw error;
    }
    
    throw new InternalServerErrorException("An unexpected error occurred while creating the doctor account");
  }
}
async getMe(userId: number, RoleName: string) {
  try {
    let user;

    if (RoleName === "admin") {
      user = await this.database.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          image: true,
          role: {
            select: { roleName: true }
          }
        }
      });
    } else  {
      user = await this.database.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          image: true,
          role: {
            select: { roleName: true }
          },
          doctor: {
            select: {
              specialization: true,
              bio: true
            }
          }
        }
      });
    } 
    
    if (!user) {
      throw new Error("User not found");
    }

    return user;

  } catch (error) {
    
      if(error instanceof HttpException){
        throw error;
      }
      throw new InternalServerErrorException("An unexpected error occurred Please try again later")
  }
}

}
