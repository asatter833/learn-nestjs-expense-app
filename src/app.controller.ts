import { Controller, Get, Post, Param } from '@nestjs/common';
import { data, ReportType } from './dummy.data';

@Controller('report')
export class AppController {
  @Get()
  getAllReports() {
    return data.report;
  }
  @Get(':type')
  getAllIncomeReport(@Param('type') type: ReportType) {
    console.log(type);
    return data.report.filter((report) => type == report.type);
  }

  @Get('all/:id')
  getReportById(@Param('id') id: string) {
    return data.report.filter((res) => res.id == id);
  }
  @Post()
  createReport() {
    return 'item is created';
  }
}
