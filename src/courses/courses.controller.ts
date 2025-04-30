import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Version,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags, ApiResponse, ApiQuery, ApiOperation } from '@nestjs/swagger';

@ApiTags('Courses')
@Controller({ path: 'courses', version: '1' })
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'All courses fetched successfully' })
  getCourses() {
    return this.coursesService.getCourses();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search courses by teacher and/or price' })
  @ApiQuery({ name: 'teacher', required: false })
  @ApiQuery({ name: 'price', required: false })
  @ApiResponse({ status: 200, description: 'Filtered courses list' })
  searchCourses(
    @Query('teacher') teacher?: string,
    @Query('price') price?: number,
  ) {
    return this.coursesService.searchCourses(teacher, price);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID' })
  @ApiResponse({ status: 200, description: 'Course fetched successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  getCourseById(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new course' })
  @ApiResponse({ status: 201, description: 'Course created successfully' })
  createCourse(@Body() course_data: CreateCourseDto) {
    return this.coursesService.createCourse(course_data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update course by ID' })
  @ApiResponse({ status: 200, description: 'Course updated successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  updateCourse(@Param('id') id: string, @Body() course_data: UpdateCourseDto) {
    return this.coursesService.updateCourse(id, course_data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete course by ID' })
  @ApiResponse({ status: 200, description: 'Course deleted successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  deleteCourse(@Param('id') id: string) {
    return this.coursesService.deleteCourse(id);
  }
}
