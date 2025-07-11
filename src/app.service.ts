import { Injectable } from '@nestjs/common';
import { data } from './dummy.data';

@Injectable()
export class AppService {
  getAllReports() {
    return data.report;
  }

  getReportById(id: string) {
    return data.report.filter((res) => res.id == id);
  }
}
