import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getIncomeReport() {
    return { message: 'this is just report' };
  }

  @Get(':id')
  getIncomeReportById() {
    return { id: 'this is an id' };
  }
  @Post()
  createReport() {
    return 'item is created';
  }
}
