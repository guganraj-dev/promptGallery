'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, User } from 'lucide-react';
import { useState } from 'react';

export default function UserButton() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading") {
    return <div className="skeleton skeleton-button" style={{ width: '42px', borderRadius: '50%' }}></div>;
  }

  if (status === "unauthenticated") {
    return (
      <button
        onClick={() => signIn('google')}
        className="btn btn-primary login-btn"
      >
        <LogIn size={18} />
        <span>Login with Google</span>
      </button>
    );
  }

  return (
    <div className="user-menu-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="user-profile-btn"
      >
        {session.user.image ? (
          <img src={session.user.image} alt={session.user.name} className="user-avatar" />
        ) : (
          <div className="user-avatar-placeholder">
            <User size={20} />
          </div>
        )}
      </button>

      {isOpen && (
        <>
          <div className="menu-overlay" onClick={() => setIsOpen(false)}></div>
          <div className="user-dropdown">
            <div className="user-info">
              <p className="user-name">
                {session.user.name}
                {session.user.role === 'admin' && <span className="admin-badge">Admin</span>}
              </p>
              <p className="user-email">{session.user.email}</p>
            </div>
            <div className="menu-divider"></div>
            <button
              onClick={() => signOut()}
              className="menu-item logout"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </>
      )}

    </div>
  );
}
