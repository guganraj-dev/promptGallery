import PromptController from '@/controllers/PromptController';
import { auth } from "@/auth";

export async function GET() {
  return await PromptController.getAllPrompts();
}

export async function POST(request) {
  const session = await auth();
  
  if (session?.user?.role !== 'admin') {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  return await PromptController.createPrompt(request);
}
