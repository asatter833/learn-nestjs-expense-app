import { ReportType } from 'src/dummy.data';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsEnum(ReportType)
  type: ReportType;
}
