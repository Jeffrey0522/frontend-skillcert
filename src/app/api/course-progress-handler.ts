import { NextResponse } from "next/server";
import { createProgress, updateProgress, getProgress, getUserCourses, deleteProgress } from "@/database/course_progress";

export async function POST(request: Request) {
  const { user_id, course_id } = await request.json();
  const progress = await createProgress(user_id, course_id);
  return NextResponse.json(progress);
}

export async function PATCH(request: Request) {
  const { user_id, course_id, progress } = await request.json();
  const updated = await updateProgress(user_id, course_id, progress);
  return NextResponse.json(updated);
}

export async function GET(request: Request) {
  const { user_id, course_id } = await request.json();
  const progress = await getProgress(user_id, course_id);
  return NextResponse.json(progress);
}

export async function DELETE(request: Request) {
  const { user_id, course_id } = await request.json();
  await deleteProgress(user_id, course_id);
  return NextResponse.json({ message: "Progress deleted" });
}
