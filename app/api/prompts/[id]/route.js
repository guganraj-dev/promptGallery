import PromptController from '@/controllers/PromptController';
import { auth } from "@/auth";

export async function GET(request, { params }) {
  const { id } = await params;
  return await PromptController.getPromptById(id);
}

export async function PUT(request, { params }) {
  const session = await auth();
  if (session?.user?.role !== 'admin') {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  return await PromptController.updatePrompt(id, request);
}

export async function DELETE(request, { params }) {
  const session = await auth();
  if (session?.user?.role !== 'admin') {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  return await PromptController.deletePrompt(id);
}
