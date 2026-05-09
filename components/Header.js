'use client';
import Link from 'next/link';
import UserButton from './UserButton';
import { Sparkles } from 'lucide-react';

export default function Header({ children }) {
  return (
    <header className="main-header">
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div className="logo">
          <div className="logo-icon">
            <Sparkles size={20} />
          </div>
          <div className="logo-text">
            <h1>AI Prompt Gallery</h1>
            <p className="subtitle">Transformations and creations</p>
          </div>
        </div>
      </Link>
      <div className="header-actions">
        {children}
        <UserButton />
      </div>

      <style jsx>{`
        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          margin-bottom: 2rem;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo-icon {
          background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }
        .logo h1 {
          margin: 0;
          font-size: 1.25rem;
          background: linear-gradient(to right, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }
        .subtitle {
          margin: 0;
          font-size: 0.8rem;
          color: #666;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .subtitle {
            display: none;
          }
          .logo-text {
            display: block;
          }
          .logo-icon {
            display: flex;
          }
          .main-header {
            padding: 1rem 0;
            margin-bottom: 1rem;
          }
          .header-actions :global(.btn span) {
            display: none;
          }
          .header-actions :global(.btn) {
            padding: 0;
            border-radius: 50%;
            width: 42px;
            height: 42px;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
}
