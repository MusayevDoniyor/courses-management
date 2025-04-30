import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './schemas/courses.schema';
import { Model } from 'mongoose';

export interface ICourseListResponse {
  message: string;
  count: number;
  courses: Course[];
}

export interface ICourseSingleResponse {
  message: string;
  course: Course;
}

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async getCourses(): Promise<ICourseListResponse> {
    const courses = await this.courseModel.find({}, { isActive: 0 }).exec();

    if (!courses.length) {
      throw new NotFoundException('There are currently no courses available.');
    }

    return {
      message: 'Courses fetched successfully',
      count: courses.length,
      courses,
    };
  }

  async getCourseById(course_id: string): Promise<ICourseSingleResponse> {
    const course = await this.courseModel.findById(course_id).exec();

    if (!course) throw new NotFoundException('Course not found');

    return { message: 'Course fetched successfully', course };
  }

  async createCourse(
    course_data: Partial<Course>,
  ): Promise<ICourseSingleResponse> {
    const course = await this.courseModel.create(course_data);

    return { message: 'Course created successfully', course };
  }

  async updateCourse(
    id: string,
    data: Partial<Course>,
  ): Promise<ICourseSingleResponse> {
    const updated = await this.courseModel
      .findByIdAndUpdate(id, data, {
        new: true,
      })
      .select('-isActive')
      .exec();

    if (!updated) throw new NotFoundException('Course not found');

    return { message: 'Course updated successfully', course: updated };
  }

  async deleteCourse(id: string): Promise<ICourseSingleResponse> {
    const deleted = await this.courseModel.findByIdAndDelete(id);

    if (!deleted) throw new NotFoundException('Course not found');

    return { message: 'Course deleted successfully', course: deleted };
  }

  async searchCourses(
    teacher?: string,
    price?: number,
  ): Promise<ICourseListResponse> {
    const filters: any = {};

    if (teacher) filters.teacherName = { $regex: teacher, $options: 'i' };
    if (price) filters.price = price;

    const courses = await this.courseModel.find(filters).exec();

    if (!courses.length) {
      throw new NotFoundException('No courses found with given filters');
    }

    return {
      message: 'Filtered courses fetched',
      count: courses.length,
      courses,
    };
  }
}
