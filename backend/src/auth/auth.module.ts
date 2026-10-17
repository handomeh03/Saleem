import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseService } from 'src/database/database.service';
import { tokenService } from 'src/security/tokens.service';
import { CryptSecuirtyService } from 'src/security/Crypt-security.service';
import { SecurityModule } from 'src/security/security.module';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
 imports:[SecurityModule]
  
})
export class AuthModule {}