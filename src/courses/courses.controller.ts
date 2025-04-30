import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './schemas/courses.schema';

@Controller({ path: 'courses', version: '1' })
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @Version('1')
  getCourses() {
    return this.coursesService.getCourses();
  }

  @Get(':id')
  getCourseById(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  @Post()
  createCourse(@Body() course_data: Partial<Course>) {
    return this.coursesService.createCourse(course_data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() course_data: Partial<Course>) {
    return this.coursesService.updateCourse(id, course_data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coursesService.deleteCourse(id);
  }
}
