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
            <p className="subtitle">Transformations And Creations</p>
          </div>
        </div>
      </Link>
      <div className="header-actions">
        {children}
        <UserButton />
      </div>

    </header>
  );
}
