import { NextRequest, NextResponse } from "next/server";
import { AnswerOptionService } from "./answerOption.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questionId, text, correct } = body;
    
    const answerOption = await AnswerOptionService.createAnswerOption({
      questionId,
      text,
      correct,
    });
    
    return NextResponse.json(answerOption, { status: 201 });
  } catch (error: any) {
    console.error("Error creating answer option:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const questionId = searchParams.get("questionId");
    const id = searchParams.get("id");
    
    if (id) {
      const answerOption = await AnswerOptionService.getAnswerOptionById(Number(id));
      return NextResponse.json(answerOption);
    } else if (questionId) {
      const answerOptions = await AnswerOptionService.getAnswerOptionsByQuestion(Number(questionId));
      return NextResponse.json(answerOptions);
    } else {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Error fetching answer option(s):", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    
    const updatedAnswerOption = await AnswerOptionService.updateAnswerOption(Number(id), data);
    return NextResponse.json(updatedAnswerOption);
  } catch (error: any) {
    console.error("Error updating answer option:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    
    await AnswerOptionService.deleteAnswerOption(Number(id));
    return NextResponse.json({ message: "Answer option deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting answer option:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}