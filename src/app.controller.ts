import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  HttpCode,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReportType } from './dummy.data';
import { AppService } from './app.service';
import { CreateReportDto, UpdateReportDto } from './dtos/report.dto';

@Controller('report')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAllReports() {
    return this.appService.getAllReports();
  }

  @Get(':id')
  getReportById(@Param('id', ParseUUIDPipe) id: string) {
    console.log('id', typeof id);
    return this.appService.getReportById(id);
  }

  @Post()
  createReport(
    @Body()
    { amount, source, type }: CreateReportDto,
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
    @Param('id', ParseUUIDPipe) id: string,

    // Extracts the request body with expected shape: amount, source, type
    @Body()
    body: UpdateReportDto,
  ) {
    // Find the report object with matching id from data.report array
    return this.appService.updateReport(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteReport(id);
  }
}
