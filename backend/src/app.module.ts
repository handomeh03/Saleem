import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/Guards/AuthGuard';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [DatabaseModule, AuthModule, SecurityModule, ConfigModule.forRoot({
    isGlobal: true,
  }), DoctorModule, PatientModule, ThrottlerModule.forRoot([
    {
      name: 'global',
      ttl: 60000, // one minute 
      limit: 300,
    },
    {
      name: 'login',
      ttl: 60000,
      limit: 200,
    },
    {
      name: 'Search',
      ttl: 60000,
      limit: 200,
    },
  ]),],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
