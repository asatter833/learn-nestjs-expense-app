import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from './dtos/report.dto';

@Controller('report')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAllReports(): ReportResponseDto[] {
    return this.appService.getAllReports();
  }

  @Get(':id')
  getReportById(@Param('id', ParseUUIDPipe) id: string): ReportResponseDto {
    return this.appService.getReportById(id);
  }

  @Post()
  createReport(
    @Body()
    { amount, source, type }: CreateReportDto,
  ): ReportResponseDto {
    return this.appService.createReport({
      amount,
      source,
      type,
    });
  }

  // This decorator makes this handler respond to HTTP PUT requests with a dynamic :id parameter
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true })) // you can use ValidationPipe to validate the incoming request body instead of global validation pipe
  updateReport(
    @Param('id', ParseUUIDPipe) id: string,
    // Extracts the request body with expected shape: amount, source, type
    @Body()
    body: UpdateReportDto,
  ): ReportResponseDto {
    // Find the report object with matching id from data.report array
    return this.appService.updateReport(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteReport(id);
  }
}
