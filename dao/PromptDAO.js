import Prompt from '@/models/Prompt';
import connectDB from '@/lib/mongodb';

class PromptDAO {
  async findAll() {
    await connectDB();
    return await Prompt.find({}).sort({ createdAt: -1 });
  }

  async findById(id) {
    await connectDB();
    return await Prompt.findById(id);
  }

  async create(data) {
    await connectDB();
    const prompt = new Prompt(data);
    return await prompt.save();
  }

  async update(id, data) {
    await connectDB();
    return await Prompt.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    await connectDB();
    return await Prompt.deleteOne({ _id: id });
  }
}

export default new PromptDAO();
