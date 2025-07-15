import { ReportType } from 'src/dummy.data';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';

import { Exclude, Expose } from 'class-transformer';
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

export class ReportResponseDto {
  id: string;
  amount: number;
  source: string;
  type: ReportType;
  created_at: Date;

  @Expose({ name: 'updatedAt' })
  updated_at: Date;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}
