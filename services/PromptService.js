import PromptDAO from '@/dao/PromptDAO';

class PromptService {
  async getAllPrompts() {
    return await PromptDAO.findAll();
  }

  async getPromptById(id) {
    const prompt = await PromptDAO.findById(id);
    if (!prompt) {
      throw new Error('Prompt not found');
    }
    return prompt;
  }

  async createPrompt(data) {
    return await PromptDAO.create(data);
  }

  async updatePrompt(id, data) {
    const prompt = await PromptDAO.update(id, data);
    if (!prompt) {
      throw new Error('Prompt not found');
    }
    return prompt;
  }

  async deletePrompt(id) {
    const result = await PromptDAO.delete(id);
    if (result.deletedCount === 0) {
      throw new Error('Prompt not found');
    }
    return result;
  }
}

export default new PromptService();
