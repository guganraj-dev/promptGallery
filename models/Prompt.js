import mongoose from 'mongoose';

const PromptSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, 'Please provide a heading.'],
  },
  prompt: {
    type: String,
    required: [true, 'Please provide a prompt.'],
  },
  originalImage: {
    type: String,
    required: [true, 'Please provide the original image.'],
  },
  afterImage: {
    type: String,
    required: [true, 'Please provide the after image.'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);
