import { ReportType } from 'src/dummy.data';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsEnum(ReportType, { message: 'Bad type request' })
  type: ReportType;
}

export class UpdateReportDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source: string;

  @IsEnum(ReportType, { message: 'Bad type request' })
  @IsOptional()
  type: ReportType;
}
