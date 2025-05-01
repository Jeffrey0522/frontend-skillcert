import { NextRequest, NextResponse } from 'next/server';
import {
  createProgress,
  updateProgress,
  getProgress,
  getUserCourses,
  deleteProgress,
} from './courseProgress.service';

export class CourseProgressController {
  async create(request: NextRequest): Promise<NextResponse> {
    try {
      const { userId, courseId } = await request.json();
      const progress = await createProgress(userId, courseId);
      return NextResponse.json(progress, { status: 201 });
    } catch (error: any) {
      console.error('Error creating course progress:', error);
      return NextResponse.json({ error: 'Failed to create course progress', message: error.message }, { status: 500 });
    }
  }

  async update(request: NextRequest): Promise<NextResponse> {
    try {
      const { userId, courseId, progress } = await request.json();
      const updatedProgress = await updateProgress(userId, courseId, progress);
      return NextResponse.json(updatedProgress);
    } catch (error: any) {
      console.error('Error updating course progress:', error);
      return NextResponse.json({ error: 'Failed to update course progress', message: error.message }, { status: 500 });
    }
  }

  async get(request: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(request.url);
      const userId = Number(searchParams.get('userId'));
      const courseId = Number(searchParams.get('courseId'));

      if (!userId || !courseId) {
        return NextResponse.json({ error: 'Missing userId or courseId' }, { status: 400 });
      }

      const progress = await getProgress(userId, courseId);
      if (!progress) {
        return NextResponse.json({ error: 'Course progress not found' }, { status: 404 });
      }

      return NextResponse.json(progress);
    } catch (error: any) {
      console.error('Error fetching course progress:', error);
      return NextResponse.json({ error: 'Failed to fetch course progress', message: error.message }, { status: 500 });
    }
  }

  async getUserCourses(request: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(request.url);
      const userId = Number(searchParams.get('userId'));

      if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
      }

      const courses = await getUserCourses(userId);
      return NextResponse.json(courses);
    } catch (error: any) {
      console.error('Error fetching user courses:', error);
      return NextResponse.json({ error: 'Failed to fetch user courses', message: error.message }, { status: 500 });
    }
  }

  async delete(request: NextRequest): Promise<NextResponse> {
    try {
      const { userId, courseId } = await request.json();
      const deleted = await deleteProgress(userId, courseId);
      return NextResponse.json({ message: 'Course progress deleted', deleted });
    } catch (error: any) {
      console.error('Error deleting course progress:', error);
      return NextResponse.json({ error: 'Failed to delete course progress', message: error.message }, { status: 500 });
    }
  }
}

export const courseProgressController = new CourseProgressController();
