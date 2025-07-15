import { Injectable, NotFoundException } from '@nestjs/common';
import { data, ReportType } from './dummy.data';
import { v4 as uuid } from 'uuid';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from './dtos/report.dto';

@Injectable()
export class AppService {
  getAllReports(): ReportResponseDto[] {
    return data.report;
  }

  getReportById(id: string): ReportResponseDto {
    const report = data.report.find((res) => res.id == id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return new ReportResponseDto(report);
  }

  createReport({ amount, source, type }: CreateReportDto) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      type,
      created_at: new Date(),
      updated_at: new Date(),
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReport(id: string, body: UpdateReportDto) {
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

  deleteReport(id: string) {
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
