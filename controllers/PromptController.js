import PromptService from '@/services/PromptService';
import { NextResponse } from 'next/server';

class PromptController {
  async getAllPrompts() {
    try {
      const prompts = await PromptService.getAllPrompts();
      return NextResponse.json({ success: true, data: prompts });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }

  async createPrompt(request) {
    try {
      const body = await request.json();
      const prompt = await PromptService.createPrompt(body);
      return NextResponse.json({ success: true, data: prompt }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }

  async getPromptById(id) {
    try {
      const prompt = await PromptService.getPromptById(id);
      return NextResponse.json({ success: true, data: prompt });
    } catch (error) {
      const status = error.message === 'Prompt not found' ? 404 : 400;
      return NextResponse.json({ success: false, error: error.message }, { status });
    }
  }

  async updatePrompt(id, request) {
    try {
      const body = await request.json();
      const prompt = await PromptService.updatePrompt(id, body);
      return NextResponse.json({ success: true, data: prompt });
    } catch (error) {
      const status = error.message === 'Prompt not found' ? 404 : 400;
      return NextResponse.json({ success: false, error: error.message }, { status });
    }
  }

  async deletePrompt(id) {
    try {
      await PromptService.deletePrompt(id);
      return NextResponse.json({ success: true, data: {} });
    } catch (error) {
      const status = error.message === 'Prompt not found' ? 404 : 400;
      return NextResponse.json({ success: false, error: error.message }, { status });
    }
  }
}

export default new PromptController();
