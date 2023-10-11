import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getHello(): string {
    return this.appService.getHello();
  }
}

// @Controller() && @Get() // route => "/"
// @Controller() && @Get('test') // route => "/test"
// @Controller('prefix') && @Get('test') // route => "/prefix/test"
