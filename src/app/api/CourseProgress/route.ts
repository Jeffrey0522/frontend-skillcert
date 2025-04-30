import { NextRequest, NextResponse } from 'next/server';
import { courseProgressController } from './courseProgress.controller';

export async function GET(request: NextRequest) {
  return courseProgressController.get(request);
}

export async function POST(request: NextRequest) {
  return courseProgressController.create(request);
}

export async function PUT(request: NextRequest) {
  return courseProgressController.update(request);
}

export async function DELETE(request: NextRequest) {
  return courseProgressController.delete(request);
}
