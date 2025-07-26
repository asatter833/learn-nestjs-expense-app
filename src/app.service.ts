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
    return data.report.map((report) => new ReportResponseDto(report));
  }

  getReportById(id: string): ReportResponseDto {
    const report = data.report.find((res) => res.id === id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return new ReportResponseDto(report); //update the data according to respose DTO
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
    return new ReportResponseDto(newReport);
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
    // - remove undefined properties to avoid overwriting with undefined values
    function removeUndefinedFromObject(obj) {
      const newObj = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined) {
          newObj[key] = value;
        }
      }
      return newObj;
    }
    data.report[returnIndex] = {
      ...data.report[returnIndex],
      ...removeUndefinedFromObject(body),
    };

    // Return the updated report object
    return new ReportResponseDto(data.report[returnIndex]);
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
