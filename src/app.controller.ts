import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { data, ReportType } from './dummy.data';
import { v4 as uuid } from 'uuid';

@Controller('report')
export class AppController {
  @Get()
  getAllReports() {
    return data.report;
  }
  @Get(':type')
  getAllIncomeReport(@Param('type') type: ReportType) {
    return data.report.filter((report) => type == report.type);
  }

  @Get('all/:id')
  getReportById(@Param('id') id: string) {
    return data.report.filter((res) => res.id == id);
  }
  @Post()
  createReport(
    @Body()
    {
      amount,
      source,
      type,
    }: {
      amount: number;
      source: string;
      type: ReportType;
    },
  ) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return newReport;
  }
}
