'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="icon-btn" 
      style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}
      title="Copy Prompt"
    >
      {copied ? <Check size={18} color="var(--success)" /> : <Copy size={18} />}
    </button>
  );
}
