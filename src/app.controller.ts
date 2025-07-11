import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  NotFoundException,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ReportType } from './dummy.data';
import { AppService } from './app.service';

@Controller('report')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAllReports() {
    return this.appService.getAllReports();
  }

  @Get(':id')
  getReportById(@Param('id') id: string) {
    return this.appService.getReportById(id);
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
    return this.appService.createReport({
      amount,
      source,
      type,
    });
  }

  // This decorator makes this handler respond to HTTP PUT requests with a dynamic :id parameter
  @Put(':id')
  updateReport(
    @Param('id') id: string,

    // Extracts the request body with expected shape: amount, source, type
    @Body()
    body: {
      amount: number;
      source: string;
      type: ReportType;
    },
  ) {
    // Find the report object with matching id from data.report array
    return this.appService.updateReport(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  deleteReport(@Param('id') id: string) {
    return this.deleteReport(id);
  }
}
