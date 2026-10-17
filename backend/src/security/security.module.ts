import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { tokenService } from './tokens.service';
import { CryptSecuirtyService } from './Crypt-security.service';

@Module({
  
  providers: [tokenService,CryptSecuirtyService],
  imports: [
    JwtModule.register({
      global: true
    }),
  ],
  exports:[tokenService,CryptSecuirtyService]
})
export class SecurityModule {}
