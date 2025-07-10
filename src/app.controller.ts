import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
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

    // If no report was found, return undefined (effectively a 200 with no body—could improve this to throw NotFoundException)
    if (!reportToUpdate) return;

    // Get the index of the found report in the array
    const returnIndex = data.report.findIndex(
      (r) => r.id === reportToUpdate.id,
    );

    // Update the report by creating a new object that merges:
    // - all the existing properties of the report
    // - all the new properties from the request body (overwriting any conflicts)
    console.log(
      (data.report[returnIndex] = {
        ...data.report[returnIndex],
        ...body,
      }),
    );

    // Return the updated report object
    return data.report[returnIndex];
  }
}
