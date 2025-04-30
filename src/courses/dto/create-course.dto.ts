import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'NestJS for Beginners' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A comprehensive course on NestJS' })
  @IsString()
  description: string;

  @ApiProperty({ example: 150000 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'Ali Valiyev' })
  @IsString()
  teacherName: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
