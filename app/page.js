import PromptService from '@/services/PromptService';
import GalleryClient from '@/components/GalleryClient';

// Enable ISR: Revalidate the gallery every 60 seconds
export const revalidate = 60;

export default async function Home() {
  let initialPrompts = [];

  try {
    const promptsData = await PromptService.getAllPrompts();
    // Convert Mongoose documents to plain JS objects for client component serialization
    initialPrompts = JSON.parse(JSON.stringify(promptsData));
  } catch (error) {
    console.error('Error fetching prompts on server:', error);
  }

  return <GalleryClient initialPrompts={initialPrompts} />;
}
