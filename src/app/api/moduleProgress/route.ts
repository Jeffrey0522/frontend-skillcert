import { NextRequest, NextResponse } from "next/server";
import { ModuleProgressModule } from "./module-progress.module";

const controller = ModuleProgressModule.getController();

export async function POST(request: NextRequest) {
  return controller.create(request);
}

export async function PATCH(request: NextRequest) {
  return controller.update(request);
}

export async function GET(request: NextRequest) {
  return controller.getOne(request);
}

export async function DELETE(request: NextRequest) {
  return controller.delete(request);
}