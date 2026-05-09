'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Image as ImageIcon, Sparkles } from 'lucide-react';
import PromptForm from '@/components/PromptForm';
import Link from 'next/link';
import Header from '@/components/Header';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function GalleryClient({ initialPrompts }) {
  const [prompts, setPrompts] = useState(initialPrompts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === 'admin';
  const router = useRouter();

  const fetchPrompts = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch('/api/prompts');
      const data = await res.json();
      if (data.success) {
        setPrompts(data.data);
      }
    } catch (error) {
      console.error('Error fetching prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this prompt?')) {
      try {
        const res = await fetch(`/api/prompts/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          fetchPrompts();
        }
      } catch (error) {
        console.error('Error deleting prompt:', error);
      }
    }
  };

  const handleEdit = (e, prompt) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingPrompt(null);
    setIsModalOpen(true);
  };

  // Limit to 12 prompts for non-logged in users
  const displayedPrompts = session ? prompts : prompts.slice(0, 12);

  return (
    <main className="container">
      <Header>
        {status === 'loading' ? (
          <div></div>
        ) : isAdmin && (
          <button onClick={handleAdd} className="btn btn-primary">
            <Plus size={20} /> New Prompt
          </button>
        )}
      </Header>

      {loading ? (
        <div className="grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skeleton-image" style={{ width: '100%', aspectRatio: '4 / 5', marginBottom: '1rem' }}></div>
              <div className="skeleton" style={{ height: '1.2rem', width: '80%', marginBottom: '1rem' }}></div>
              <div className="card-footer" style={{ marginTop: 'auto' }}>
                <div className="skeleton" style={{ height: '0.8rem', width: '40%' }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : displayedPrompts.length > 0 ? (
        <>
          <div className="grid">
            {displayedPrompts.map((prompt) => (
              <Link
                key={prompt._id}
                href={`/prompts/${prompt._id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="card">
                  <div style={{ width: '100%', aspectRatio: '4 / 5', marginBottom: '1rem', overflow: 'hidden', borderRadius: '16px', position: 'relative' }}>
                    <img
                      src={prompt.afterImage}
                      alt={prompt.heading}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{prompt.heading}</h3>
                  <div className="card-footer">
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>View Details →</span>
                    {isAdmin && (
                      <div className="actions">
                        <button onClick={(e) => handleEdit(e, prompt)} className="icon-btn" title="Edit">
                          <Pencil size={16} />
                        </button>
                        <button onClick={(e) => handleDelete(e, prompt._id)} className="icon-btn delete" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {!session && prompts.length > 12 && (
            <div style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '24px', border: '1px dashed var(--primary)' }}>
              <Sparkles size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Want to see more?</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Log in to unlock the full gallery of premium creations.</p>
              <button onClick={() => signIn('google')} className="btn btn-primary">
                Login to Unlock All
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <ImageIcon size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No creations yet</h3>
          <p>Start your AI journey by adding your first transformation.</p>
          {isAdmin && (
            <button onClick={handleAdd} className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
              <Plus size={18} /> Create Your First
            </button>
          )}
        </div>
      )}

      {isModalOpen && (
        <PromptForm
          key={editingPrompt?._id || 'new'}
          promptData={editingPrompt}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            fetchPrompts(false);
            router.refresh();
          }}
        />
      )}
    </main>
  );
}
