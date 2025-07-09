import { Controller, Get, Post, Param } from '@nestjs/common';
import { data } from './dummy.data';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllIncomeReport(@Param('type') type: string) {
    return { message: `this returns the type: ${type}` };
  }

  @Get(':id')
  getIncomeReportById(@Param('id') id: string) {
    return { id: `this is an ${id}` };
  }
  @Post()
  createReport() {
    return 'item is created';
  }
}
