import { NextRequest, NextResponse } from "next/server";
import { QuestionService } from "./question.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lessonId, text, type, position } = body;

    const question = await QuestionService.createQuestion({ lessonId, text, type, position });
    return NextResponse.json(question, { status: 201 });
  } catch (error: any) {
    console.error("Error creating question:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const lessonId = searchParams.get("lessonId");
    const questionId = searchParams.get("id");

    if (questionId) {
      const question = await QuestionService.getQuestionById(Number(questionId));
      return NextResponse.json(question);
    } else if (lessonId) {
      const questions = await QuestionService.getQuestionsByLesson(Number(lessonId));
      return NextResponse.json(questions);
    } else {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Error fetching question(s):", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    const updatedQuestion = await QuestionService.updateQuestion(Number(id), data);
    return NextResponse.json(updatedQuestion);
  } catch (error: any) {
    console.error("Error updating question:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    await QuestionService.deleteQuestion(Number(id));
    return NextResponse.json({ message: "Question deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting question:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}