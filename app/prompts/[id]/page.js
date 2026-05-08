import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import CopyButton from '@/components/CopyButton';

// Note: In Next.js 15, params is a Promise
export default async function PromptDetail({ params }) {
  const { id } = await params;

  let prompt = null;
  try {
    const PromptService = (await import('@/services/PromptService')).default;
    prompt = await PromptService.getPromptById(id);
  } catch (error) {
    console.error('Error fetching prompt:', error);
  }

  if (!prompt) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '10rem' }}>
        <h2>Prompt not found</h2>
        <Link href="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Gallery</Link>
      </div>
    );
  }

  return (
    <main className="container">
      <Link href="/" className="btn btn-outline" style={{ marginBottom: '2rem', padding: '0.75rem', borderRadius: '50%', width: '45px', height: '45px', justifyContent: 'center' }}>
        <ArrowLeft size={20} />
      </Link>

      {/* 1. Heading */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {prompt.heading}
        </h1>
      </div>

      {/* 2. Images (Side by Side) with 4:5 Aspect Ratio */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        <div className="image-card">
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Original Image
          </h3>
          <div style={{
            width: '100%',
            aspectRatio: '4 / 5',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background: '#f1f5f9'
          }}>
            <img
              src={prompt.originalImage}
              alt="Original"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        <div className="image-card">
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#818cf8' }}>
            <Sparkles size={20} /> AI Result
          </h3>
          <div style={{
            width: '100%',
            aspectRatio: '4 / 5',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid var(--primary)',
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.15)',
            background: '#f1f5f9'
          }}>
            <img
              src={prompt.afterImage}
              alt="After"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* 3. Prompt */}
      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>The AI Prompt</h3>
        <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', position: 'relative' }}>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.1rem',
            fontStyle: 'italic',
            paddingRight: '3rem',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            lineHeight: '1.6'
          }}>
            "{prompt.prompt}"
          </p>
          <CopyButton text={prompt.prompt} />
        </div>
      </div>
    </main>
  );
}
