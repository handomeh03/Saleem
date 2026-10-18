import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Response } from 'express';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    
    response.status(429).json({
      success: false,
      statusCode: 429,
      message: 'Too many requests. Please wait a moment before trying again',
      error_code: 'TOO_MANY_REQUESTS',
    });
  }
}