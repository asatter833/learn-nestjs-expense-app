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
import { data, ReportType } from './dummy.data';
import { v4 as uuid } from 'uuid';
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

  // This decorator makes this handler respond to HTTP PUT requests with a dynamic :id parameter
  @Put(':id')
  updateReport(
    // Extracts the "id" parameter from the route URL (e.g., /report/123)
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
    const reportToUpdate = data.report.find((r) => id === r.id);

    // If no report was found, return not found error
    if (!reportToUpdate) {
      throw new NotFoundException(
        'Report not found. It may have been deleted or does not exist.',
      );
    }

    // Get the index of the found report in the array
    const returnIndex = data.report.findIndex(
      (r) => r.id === reportToUpdate.id,
    );

    // Update the report by creating a new object that merges:
    // - all the existing properties of the report
    // - all the new properties from the request body (overwriting any conflicts)
    data.report[returnIndex] = {
      ...data.report[returnIndex],
      ...body,
    };

    // Return the updated report object
    return data.report[returnIndex];
  }

  @Delete(':id')
  @HttpCode(204)
  deleteReport(@Param('id') id: string) {
    const reportIndexToDelete = data.report.findIndex((r) => r.id === id);
    if (reportIndexToDelete === -1) {
      throw new NotFoundException(
        'Report not found. It may have been deleted or does not exist.',
      );
    }
    data.report.splice(reportIndexToDelete, 1);
    return {
      statusCode: 204,
      message: 'Report deleted successfully.',
    };
  }
}
